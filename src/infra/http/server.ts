import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cors from 'cors';

import '@infra/typeorm';
import '@container/index';

import AppError from '@errors/AppError';

import routes from './routes';

const app = express();

const port = process.env.PORT || 3333;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('common'));
app.use(routes);

// Global error handling
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  console.error(err);

  return response.status(500).json({
    message: 'Error inesperado dentro do servidor'
  });
});


app.listen(port, () => console.log(`🖌  server started on port ${port}`));