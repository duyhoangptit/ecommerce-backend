class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = {...this.queryString}

        const excludedFields = ['page', 'sort', 'size', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        queryStr = JSON.parse(queryStr);
        this.query.find(queryStr)

        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select('-__v')
        }
        return this;
    }

    sort () {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }

    paging() {
        const page = this.queryString.page * 1 || 1;
        const size = this.queryString.size * 1 || 100;
        const offset = (page - 1) * size;

        this.query = this.query.skip(offset).limit(size)

        return this;
    }
}

module.exports = ApiFeatures