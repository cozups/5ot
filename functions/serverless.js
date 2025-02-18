import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import {
  viewsRouter,
  userRouter,
  productRouter,
  orderRouter,
  categoryRouter,
  reviewRouter,
} from '../src/routers';
import { errorHandler } from '../src/middlewares';

const app = express();

// CORS 에러 방지
app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// html, css, js 라우팅
app.use(viewsRouter);

// API 라우팅
app.use('/api', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/category', categoryRouter);
app.use('/review', reviewRouter);

// 에러 핸들링
app.use(errorHandler);

// 서버리스로 내보내기
module.exports.handler = serverless(app);
