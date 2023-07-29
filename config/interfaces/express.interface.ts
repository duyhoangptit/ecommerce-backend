'use strict';

import { Request, Response } from 'express';

export interface IRequest extends Request {
   apikey: {
      key: string;
      status: boolean;
      permissions: Array<string>;
   };
   keyStore: object;
}
