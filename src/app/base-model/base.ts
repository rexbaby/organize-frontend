export interface IModel {
  [key: string]: any;
}

export interface IResponse {
  error?: IError;
  data?: any;
  limit?: ILimit;
  affect?: IResAffected;
}

export interface ILimit {
  length: number;
  pageIndex: number;
  pageSize: number;
}

export interface IResAffected {
  success: boolean;
  id?: number;
}

export interface IError {
  code: number;
  message: string;
  timestamp: string;
}
