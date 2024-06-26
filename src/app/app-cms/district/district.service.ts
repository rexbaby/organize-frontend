import { Injectable } from '@angular/core';
import { HttpService } from '../../base-service/http.service';
import { take } from 'rxjs/operators';
import { IDistrict } from '../../base-model/district';

@Injectable()
export class DistrictService {
  constructor(private httpService: HttpService) {}

  getAll() {
    return this.httpService.GET({ url: `/api/district` }).pipe(take(1));
  }

  create(district: IDistrict) {
    return this.httpService
      .POST({ url: `/api/district` }, district)
      .pipe(take(1));
  }

  update(id: number, district: IDistrict) {
    return this.httpService
      .PUT({ url: `/api/district/${id}` }, district)
      .pipe(take(1));
  }

  delete(id: number) {
    return this.httpService
      .DELETE({ url: `/api/district/${id}` })
      .pipe(take(1));
  }
}
