import { Injectable } from '@angular/core';
import { HttpService } from '../../base-service/http.service';
import { take } from 'rxjs/operators';

@Injectable()
export class AreaService {
  constructor(private httpService: HttpService) {}

  getAll() {
    return this.httpService
      .GET({ url: `/api/district/` })
      .pipe(take(1));
  }

  edit() {
    return this.httpService
      .POST({ url: `/api/district` }, {})
      .pipe(take(1));
  }
}
