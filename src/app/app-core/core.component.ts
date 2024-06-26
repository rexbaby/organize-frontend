import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { TabsComponent } from './tabs/tabs.component';
import { IPermission } from '../base-service/permission/permission';
import { PermissionService } from '../base-service/permission/permission.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-core',
  standalone: true,
  imports: [
    MenuComponent,
    TabsComponent,
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
  ],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
})
export class CoreComponent implements OnInit, OnDestroy {
  subscriptionPermission: Subscription | null = null;
  subscriptionBranch: Subscription | null = null;
  tabs: IPermission[] = [];
  tabNowIndex = -1;

  constructor(
    private router: Router,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.contentSwitch();

    const permission$ = this.permissionService.isPermissionIn();
    if (!permission$) return;
    this.subscriptionPermission = permission$.subscribe((p) => {
      this.tabCheck(p);
    });

    const branch$ = this.permissionService.isPermissionBranchIn();
    if (!branch$) return;
    this.subscriptionBranch = branch$.subscribe((p) => {
      this.tabCheck(p);
      this.permissionService.nextPermissionCheck(p);
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptionPermission) {
      this.subscriptionPermission.unsubscribe();
    }
    if (this.subscriptionBranch) {
      this.subscriptionBranch.unsubscribe();
    }
  }

  tabCatchIndex(p: IPermission) {
    return this.tabs.map((t) => t.title + t.suffix).indexOf(p.title + p.suffix);
  }

  tabCheck(p: IPermission) {
    const i = this.tabCatchIndex(p);
    if (i !== -1) {
      this.tabNowIndex = i;
      this.contentSwitch();
      return;
    }
    this.tabs.push(p);
    this.tabNowIndex = this.tabs.length - 1;
    this.contentSwitch();
  }

  tabClick(p: IPermission) {
    const i = this.tabCatchIndex(p);
    this.tabNowIndex = i;
    this.contentSwitch();
    this.permissionService.nextPermissionCheck(p);
  }

  tabDel(p: IPermission) {
    const i = this.tabCatchIndex(p);
    if (i === -1) return;

    if (this.tabNowIndex === i) {
      this.tabs.splice(i, 1);
      this.tabNowIndex = this.tabs.length - 1;
    } else {
      const tabNowPause = this.tabs[this.tabNowIndex];
      this.tabs.splice(i, 1);
      this.tabNowIndex = this.tabCatchIndex(tabNowPause);
    }
    this.contentSwitch();
    const tabNow = this.tabNowIndex === -1 ? null : this.tabs[this.tabNowIndex];
    this.permissionService.nextPermissionCheck(tabNow);
  }

  contentSwitch() {
    console.log(44, this.tabs);
    if (!this.tabs.length) {
      this.router.navigate(['/index']);
      return;
    }
    const tabNow = this.tabs[this.tabNowIndex];
    this.router.navigate([
      `/${tabNow.url}${tabNow.suffix ? '/' + tabNow.suffix : ''}`,
    ]);
  }
}
