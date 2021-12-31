import 'reflect-metadata';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import routes from '../routes/index';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import appError from '@shared/errors/AppError';
const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.use(appError);

app.listen(3333, () => {
  console.log(`Server starter on port ${3333}`);
});
