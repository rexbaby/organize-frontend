export interface IModel {
  [key: string]: any;
}

export interface IResponse {
  error?: IError;
  datas?: IModel | IModel[];
}

export interface IError {
  code: string; //錯誤碼
  label: string; //前端對外的錯誤訊息
  message?: string; //後端傳回的錯誤訊息
}
