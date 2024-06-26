import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPermission } from '../../base-service/permission/permission';
import { PermissionService } from '../../base-service/permission/permission.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit, OnDestroy {
  subscription: Subscription | null = null;
  menus: IPermission[] = [
    { url: '/district', title: '通訊處區域', suffix: '' },
    { url: '/person', title: '業務人員列表', suffix: '' },
  ];
  menuNowIndex = -1;

  constructor(private permissionService: PermissionService) {}

  ngOnInit(): void {
    const permissionCheck$ = this.permissionService.isPermissionCheckIn();
    if (!permissionCheck$) return;
    this.subscription = permissionCheck$.subscribe((p) => {
      this.menuCheck(p);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  menuCheck(p: IPermission | null) {
    if (!p) {
      this.menuNowIndex = -1;
      return;
    }
    this.menuNowIndex = this.menus.map((m) => m.title).indexOf(p.title);
  }

  menuClick(i: number) {
    if (i === this.menuNowIndex) return;
    this.menuNowIndex = i;
    this.permissionService.nextPermission(this.menus[i]);
  }
}
