'use strict';

import { Request, Response } from 'express';

export interface IApikeyRequest extends Request {
   apikey: {
      key: string;
      status: boolean;
      permissions: Array<string>;
   };
}
