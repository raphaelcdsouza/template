import { POSTGRES_ERROR_CODES, MYSQL_ERROR_CODES } from '../Enums';

export const postgresErrorMapper = (code: string, itemName?: string, err?: any): string => {
  switch (code) {
    case POSTGRES_ERROR_CODES.TABLE_NOT_FOUND:
      return itemName !== undefined ? `Table "${itemName}" not found` : 'Table not found';
    case POSTGRES_ERROR_CODES.COLUMN_NOT_FOUND:
      return err !== undefined ? err.message : 'Column not found';
    default:
      return 'Unknown error';
  }
};

export const mysqlErrorMapper = (code: number, itemName?: string, err?: any): string => {
  switch (code) {
    case MYSQL_ERROR_CODES.COLUMN_NOT_FOUND:
      return err !== undefined ? err.message : 'Column not found';
    default:
      return 'Unknown error';
  }
};
