import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import connectDB from './msc/model/db';

import { routerEmployee } from './routes/employee';

export const app = express.default();
connectDB();

app.use(express.json());
app.use(cors.default());
app.use(logger.default('dev'));

app.use('/employees', routerEmployee);