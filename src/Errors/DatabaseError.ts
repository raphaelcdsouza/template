import { ERRORS } from '../Utils/DB/Enums';
import { BaseError } from './BaseError';

export class DatabaseError extends BaseError {
  public readonly code: string;

  public readonly engine: string;

  public readonly engineErrorCode: string | number;

  constructor(message: string, code: string, engine: 'postgres' | 'mysql', engineErrorCode: string | number) {
    super(code === ERRORS.DATABASE.UNKNOWN ? 'Unknown error' : message);
    this.code = code;
    this.engine = engine;
    this.engineErrorCode = engineErrorCode;
  }
}
