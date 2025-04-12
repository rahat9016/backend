import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import httpStatus from 'http-status';
import path from 'path';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();

app.use(cors());

// * parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Sanitize data
app.use(ExpressMongoSanitize());

// * Serve static files
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// * Application routes

app.use('/api/v1', routes);

// Serve index.html for the base route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Ati Limited' });
  // res.sendFile(path.join(publicPath, 'index.html'));
});
app.get('/ati/api/v1', (req: Request, res: Response) => {
  res.json({ message: 'Base Url' });
  // res.sendFile(path.join(publicPath, 'index.html'));
});

// * Global Error Handler

app.use(globalErrorHandler);

// * handle not found

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
// import cors from 'cors';
// import express, { Application, NextFunction, Request, Response } from 'express';
// import ExpressMongoSanitize from 'express-mongo-sanitize';
// import httpStatus from 'http-status';
// import path from 'path';
// import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import routes from './app/routes';

// const app: Application = express();

// app.use(cors());

// // * parser

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // * Sanitize data
// app.use(ExpressMongoSanitize());

// // * Serve static files
// const publicPath = path.join(__dirname, '../public');
// app.use(express.static(publicPath));

// // * Application routes

// app.use('/ati/api/v1', routes);

// app.get('/', async (req: Request, res: Response) => {
//   res.send('Working Successfully');
// });

// // * Global Error Handler

// app.use(globalErrorHandler);

// // * handle not found

// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     message: 'Not Found',
//     errorMessages: [
//       {
//         path: req.originalUrl,
//         message: 'API Not Found',
//       },
//     ],
//   });
//   next();
// });

// export default app;
