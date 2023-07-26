'use strict';

import _ from 'lodash';

export const filterData = ({
   data,
   fields,
}: {
   data: string;
   fields: Array<string>;
}): object => {
   const filteredData = _.pick(data, fields);
   return filteredData;
};
