'use strict';

import { Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

interface ISuccessResponse {
   send(res: Response, headers: object): Response;
}

class SuccessResponse implements ISuccessResponse {
   private message: string;
   private status: number;
   private metadata: object | any;
   constructor({
      message = ReasonPhrases.OK,
      status = StatusCodes.OK,
      metadata = {},
   }) {
      this.message = message || ReasonPhrases.OK;
      this.status = status;
      this.metadata = metadata;
   }

   send(res: Response, headers: object) {
      return res.status(this.status).set(headers).json(this);
   }
}

class Ok extends SuccessResponse {
   constructor({ message, metadata = {} }) {
      super({ message, metadata });
   }
}

class Create extends SuccessResponse {
   constructor({ message, metadata = {} }) {
      super({ message, status: StatusCodes.CREATED, metadata });
   }
}

const CREATED = ({ res, message, metadata, headers = {} }) => {
   new Create({
      message,
      metadata,
   }).send(res, headers);
};

const OK = ({ res, message, metadata, headers = {} }) => {
   new Ok({
      message,
      metadata,
   }).send(res, headers);
};

export { OK, CREATED };
