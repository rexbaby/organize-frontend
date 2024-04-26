import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { TabsComponent } from './tabs/tabs.component';
import { IPermission } from '../service/permission/permission';

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
export class CoreComponent implements OnInit {
  tabs: IPermission[] = [];
  tabNowIndex = -1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.contentSwitch();
  }

  contentSwitch() {
    if (!this.tabs.length) {
      this.router.navigate(['/index']);
      return;
    }
    const tabNow = this.tabs[this.tabNowIndex];
    this.router.navigate([
      `/${tabNow.url}${tabNow.suffix ? '/' + tabNow.suffix : ''}`,
    ]);
  }

  tabClick(p: IPermission) {
    const i = this.tabs
      .map((t) => t.title + t.suffix)
      .indexOf(p.title + p.suffix);

    this.tabNowIndex = i;
    this.contentSwitch();
  }

  tabDel(p: IPermission) {
    const i = this.tabs
      .map((t) => t.title + t.suffix)
      .indexOf(p.title + p.suffix);

    if (i === -1) return;
    if (this.tabNowIndex === i) this.tabNowIndex--;
    this.tabs.splice(i, 1);
    this.contentSwitch();
  }
}
