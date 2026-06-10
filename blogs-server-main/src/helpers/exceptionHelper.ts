import { Request, Response, NextFunction } from 'express';
import sendResponse from './responseHelper';

// Middleware to handle exceptions
const exceptionHandler = (executable: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Execute the provided function
    const result = await executable(req, res, next);
    return result;
  } catch (error: any) {
    // Log the error
    console.log(error);
    // Determine the error code based on error type
    const errorCode = error.name === 'ValidationError' ? 400 : 500;
    // Send response with error message and appropriate status code
    sendResponse(res, {}, error.message, errorCode);
  }
};

export default exceptionHandler;
