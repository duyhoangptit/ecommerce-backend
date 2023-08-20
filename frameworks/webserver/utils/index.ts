'use strict';

import _ from 'lodash';
import { Types } from 'mongoose';

export const Headers = {
   API_KEY: 'x-api-key',
   AUTHORIZATION: 'authorization',
   CLIENT_ID: 'x-client-id',
   REFRESH_TOKEN: 'x-refresh-token',
};

export const unSelectDataObject = (select = []) => {
   // return Object.fromEntries(select.map((i) => [i, 0]));
   return _.zipObject(select, Array(select.length).fill(0));
};
export const selectDataObject = (select = []) => {
   return Object.fromEntries(select.map((i) => [i, 1]));
};

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

export const removeAttrUndefined = (object) => {
   Object.keys(object).forEach((key) => {
      if (object[key] === undefined || object[key] === null) delete object[key];
   });

   return object;
};

export const updateNestedObjectParser = (obj) => {
   const final = {};
   Object.keys(obj).forEach((i) => {
      if (typeof obj[i] === 'object' && !Array.isArray(obj[i])) {
         const response = updateNestedObjectParser(obj[i]);
         Object.keys(obj[i]).forEach((j) => {
            final[`${i}.${j}`] = response[j];
         });
      } else {
         final[i] = obj[i];
      }
   });

   return final;
};

export const convertToObjectIdMongo = (id) => new Types.ObjectId(id);
