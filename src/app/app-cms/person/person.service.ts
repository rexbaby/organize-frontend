import { Injectable } from '@angular/core';
import { HttpService } from '../../base-service/http.service';
import { take } from 'rxjs/operators';
import { IStaff } from '../../base-model/person';

@Injectable()
export class PersonService {
  constructor(private httpService: HttpService) {}

  getAll() {
    return this.httpService.GET({ url: `/api/rank` }).pipe(take(1));
  }

  getAllByDistrict(districtId: number) {
    return this.httpService
      .POST(
        { url: `/api/rank/district` },
        { districtId: districtId, pageIndex: 0, pageSize: 10 }
      )
      .pipe(take(1));
  }

  getAllByDept(deptId: number) {
    return this.httpService
      .POST(
        { url: `/api/rank/dept` },
        { deptId: deptId, pageIndex: 0, pageSize: 10 }
      )
      .pipe(take(1));
  }

  create(person: IStaff) {
    return this.httpService.POST({ url: `/api/rank` }, person).pipe(take(1));
  }

  update(id: number, person: IStaff) {
    return this.httpService
      .PUT({ url: `/api/rank/${id}` }, person)
      .pipe(take(1));
  }

  delete(id: number) {
    return this.httpService.DELETE({ url: `/api/rank/${id}` }).pipe(take(1));
  }
}
