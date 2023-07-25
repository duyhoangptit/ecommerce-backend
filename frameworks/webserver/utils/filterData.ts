'use strict';

import _ from 'lodash';

export default function lodashUtil() {
   const filterData = (data: object, fields: Array<string>): object => {
      const filteredData = _.pick(data, fields);
      return filteredData;
   };

   return {
      filterData,
   };
}
