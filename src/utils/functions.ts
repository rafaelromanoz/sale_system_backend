interface Icreate {
  statusCode: number;
  message: string;
}

const createErrorMessage = (statusCode: number, message: string): Icreate => ({
  statusCode,
  message,
});

export default createErrorMessage;
