import { Catch, ExceptionFilter, ArgumentsHost, ConflictException, HttpException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DuplicateEmailFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    if (exception.message.includes('Duplicate entry')) {
      throw new HttpException('Email is already taken.',409);
    }
    // Handle other types of errors or rethrow the exception
  }
}