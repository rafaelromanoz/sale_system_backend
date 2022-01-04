// class AppError {
//   public readonly message: string;
//   public readonly statusCode: number;
//   constructor(message: string, statusCode = 400) {
//     this.message = message;
//     this.statusCode = statusCode;
//   }
// }

// interface IError {
//   error: {
//     errorCode: number;
//     message: string;
//   };
// }

// import { Request, Response } from 'express';

// const appError = (err: IError, req: Request, res: Response) => {
//   if (err) {
//     return res.status(err.error.errorCode).json(err.error.message);
//   }
// };

// export default appError;
