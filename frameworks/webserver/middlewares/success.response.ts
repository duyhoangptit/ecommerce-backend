'use strict';

import { Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

interface ISuccessResponse {
   send(res: Response, headers: object): Response;
}

class SuccessResponse implements ISuccessResponse {
   private message: string;
   private status: number;
   private data: object | any;
   constructor({
      message = ReasonPhrases.OK,
      status = StatusCodes.OK,
      data = {},
   }) {
      this.message = message || ReasonPhrases.OK;
      this.status = status;
      this.data = data;
   }

   send(res: Response, headers: object) {
      return res.status(this.status).set(headers).json(this);
   }
}

class Ok extends SuccessResponse {
   constructor({ message, data = {} }) {
      super({ message, data });
   }
}

class Create extends SuccessResponse {
   constructor({ message, data = {} }) {
      super({ message, status: StatusCodes.CREATED, data });
   }
}

const CREATED = ({ res, message, data, headers = {} }) => {
   new Create({
      message,
      data,
   }).send(res, headers);
};

const OK = ({ res, message, data, headers = {} }) => {
   new Ok({
      message,
      data,
   }).send(res, headers);
};

export { OK, CREATED };
