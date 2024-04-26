import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { IPermission } from './permission';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private permissionSubject = new Subject<IPermission>();
  private permissionCheckSubject = new Subject<IPermission | null>();
  private permissionBranchSubject = new Subject<IPermission>();

  constructor() {}

  // Menu->Core
  nextPermission(p: IPermission) {
    this.permissionSubject.next(p);
  }

  isPermissionIn(): Observable<IPermission> | null {
    if (this.permissionSubject) {
      return this.permissionSubject.asObservable();
    }
    return null;
  }

  // Core->Menu
  nextPermissionCheck(p: IPermission | null) {
    this.permissionCheckSubject.next(p);
  }

  isPermissionCheckIn(): Observable<IPermission | null> | null {
    if (this.permissionCheckSubject) {
      return this.permissionCheckSubject.asObservable();
    }
    return null;
  }

  // Branch->Core
  nextPermissionBranch(p: IPermission) {
    this.permissionBranchSubject.next(p);
  }

  isPermissionBranchIn(): Observable<IPermission> | null {
    if (this.permissionBranchSubject) {
      return this.permissionBranchSubject.asObservable();
    }
    return null;
  }
}
