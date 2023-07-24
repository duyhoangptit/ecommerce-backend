import { Request, Response } from 'express';

export interface IApikeyRequest extends Request {
   apikey: string;
}
