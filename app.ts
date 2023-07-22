'use strict';

import express from 'express';
import mongoose from 'mongoose';

import expressConfig from './frameworks/webserver/express';
import serverConfig from './frameworks/webserver/server';
import routes from './frameworks/webserver/routes';

const app = express();
const server = require('http').createServer(app);

// express.js configuration (middlewares,...)
expressConfig(app);

// server configuration and start (using Terminus for health check)
serverConfig(app, mongoose, server).startServer();

// Init routes
routes(app, express);

export default app;
