class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

// const AppError = (message: string, statusCode: number): void => {

// }

export default AppError;
