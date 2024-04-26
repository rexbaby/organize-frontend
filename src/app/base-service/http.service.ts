import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map } from 'rxjs/operators';
import { IResponse } from '../base-model/base';

interface IOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe: 'response';
  context?: HttpContext;
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

interface IConfig {
  url: string;
  contentType?: TConfigContentType;
  headerObj?: { [key: string]: any };
  responseType?: string;
}

type TConfigContentType = 'json' | 'form-urlencoded' | 'form-data';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getHeaders(contentType?: TConfigContentType, headerObj?: { [key: string]: any }): HttpHeaders {
    let headers: { [key: string]: string } = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    };
    if (!contentType) contentType = 'json';
    switch (contentType) {
      case 'form-urlencoded':
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        break;
    }
    if (headerObj) {
      headers = Object.assign(headers, headerObj);
    }
    return new HttpHeaders(headers);
  }

  getOptions(headers: HttpHeaders, responseType?: string) {
    return <IOptions>{
      observe: 'response',
      responseType: responseType || 'json',
      headers: headers,
    };
  }

  GET = (config: IConfig): Observable<IResponse> => {
    const headers = this.getHeaders(config.contentType, config.headerObj);
    return this.http.get<IResponse>(config.url, this.getOptions(headers, config.responseType)).pipe(
      map((res: HttpResponse<IResponse>) => this.responseHandle(res)),
      catchError((res: HttpErrorResponse) => this.httpStatusHandle(res))
    );
  };

  POST = (config: IConfig, body: any): Observable<IResponse> => {
    const headers = this.getHeaders(config.contentType, config.headerObj);
    return this.http.post<IResponse>(config.url, body, this.getOptions(headers, config.responseType)).pipe(
      map((res: HttpResponse<IResponse>) => this.responseHandle(res)),
      catchError((res: HttpErrorResponse) => this.httpStatusHandle(res))
    );
  };

  PUT = (config: IConfig, body: any): Observable<IResponse> => {
    const headers = this.getHeaders(config.contentType, config.headerObj);
    return this.http.put<IResponse>(config.url, body, this.getOptions(headers, config.responseType)).pipe(
      map((res: HttpResponse<IResponse>) => this.responseHandle(res)),
      catchError((res: HttpErrorResponse) => this.httpStatusHandle(res))
    );
  };

  PATCH = (config: IConfig, body: any): Observable<IResponse> => {
    const headers = this.getHeaders(config.contentType, config.headerObj);
    return this.http.patch<IResponse>(config.url, body, this.getOptions(headers, config.responseType)).pipe(
      map((res: HttpResponse<IResponse>) => this.responseHandle(res)),
      catchError((res: HttpErrorResponse) => this.httpStatusHandle(res))
    );
  };

  DELETE = (config: IConfig): Observable<IResponse> => {
    const headers = this.getHeaders(config.contentType, config.headerObj);
    return this.http.delete<IResponse>(config.url, this.getOptions(headers, config.responseType)).pipe(
      map((res: HttpResponse<IResponse>) => this.responseHandle(res)),
      catchError((res: HttpErrorResponse) => this.httpStatusHandle(res))
    );
  };

  responseHandle = (res: HttpResponse<any>): IResponse => {
    const result: IResponse = {
      datas: res.body || undefined,
    };
    if (res.body.error) {
      result.error = res.body.error;
    }
    return result;
  };

  httpStatusHandle = (res: HttpErrorResponse): Observable<IResponse> => {
    return of(res);
  };
}
