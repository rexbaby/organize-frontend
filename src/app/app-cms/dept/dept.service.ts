import { Injectable } from '@angular/core';
import { HttpService } from '../../base-service/http.service';
import { take } from 'rxjs/operators';
import { IDept } from '../../base-model/dept';

@Injectable()
export class DeptService {
  constructor(private httpService: HttpService) {}

  getAll(districtId: number) {
    return this.httpService
      .GET({ url: `/api/dept/district/${districtId}` })
      .pipe(take(1));
  }

  create(dept: IDept) {
    return this.httpService.POST({ url: `/api/dept` }, dept).pipe(take(1));
  }

  update(id: number, dept: IDept) {
    return this.httpService.PUT({ url: `/api/dept/${id}` }, dept).pipe(take(1));
  }

  delete(id: number) {
    return this.httpService.DELETE({ url: `/api/dept/${id}` }).pipe(take(1));
  }
}
