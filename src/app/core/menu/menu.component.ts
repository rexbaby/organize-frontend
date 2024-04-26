import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IPermission } from '../../service/permission/permission';
import { PermissionService } from '../../service/permission/permission.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  menus: IPermission[] = [
    { url: '/area', title: 'Area', suffix: '' },
    { url: '/person', title: 'Person', suffix: '' },
  ];
  menuNowIndex = -1;

  constructor(private permissionService: PermissionService) {}

  menuClick(i: number) {
    if (i === this.menuNowIndex) return;
    this.menuNowIndex = i;
    this.permissionService.nextPermission(this.menus[i]);
  }
}
