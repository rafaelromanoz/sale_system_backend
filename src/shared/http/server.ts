import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import routes from '../routes/index';
import '@shared/typeorm';
import uploadConfig from '@config/upload';
import errorMiddleware from '@shared/errors/errorMiddleware';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(errorMiddleware);
app.use(errors());

app.listen(3333, () => {
  console.log(`Server starter on port ${3333}`);
});
