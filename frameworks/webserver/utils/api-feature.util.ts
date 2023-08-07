'use strict';

type QueryString = {
   keySearch: string;
   page: string;
   size: string;
   fields: string;
   sort: string;
};

class ApiFeatures {
   public query;
   public queryString: QueryString;

   constructor(query, queryString: QueryString) {
      this.query = query;
      this.queryString = queryString;
   }

   filter() {
      const queryObj = { ...this.queryString };

      const excludedFields = [
         'page',
         'sort',
         'size',
         'fields',
         'limit',
         'keySearch',
      ];
      excludedFields.forEach((el) => delete queryObj[el]);

      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
         /\b(gte|gt|lte|lt)\b/g,
         (match) => `$${match}`
      );
      const newQueryStr: Object = JSON.parse(queryStr);
      console.log(typeof newQueryStr);
      const regexSearch = new RegExp(this.queryString.keySearch);
      this.query.find(
         {
            isPublish: true,
            $text: { $search: regexSearch },
            ...newQueryStr,
         },
         {
            score: { $meta: 'textScore' },
         }
      );

      return this;
   }

   limitFields() {
      if (this.queryString.fields) {
         const fields = this.queryString.fields.split(', ').join(' ');
         this.query = this.query.select(fields);
      } else {
         this.query = this.query.select('-__v');
      }
      return this;
   }

   sort() {
      if (this.queryString.sort) {
         const sortBy = this.queryString.sort.split(', ').join(' ');
         this.query = this.query.sort(sortBy);
      } else {
         this.query = this.query.sort({ score: { $meta: 'textScore' } });
      }
      return this;
   }

   paging() {
      const page = +this.queryString.page || 1;
      const size = +this.queryString.size || 100;
      const offset = (page - 1) * size;

      this.query = this.query.skip(offset).limit(size);

      return this;
   }
}

export default ApiFeatures;
