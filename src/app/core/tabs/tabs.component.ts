import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPermission } from '../../service/permission/permission';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  @Input() tabs: IPermission[] = [];
  @Input() tabNowIndex = -1;
  @Output() tabClickEvent = new EventEmitter<IPermission>();
  @Output() tabDelEvent = new EventEmitter<IPermission>();

  tabClick(p: IPermission) {
    this.tabClickEvent.emit(p);
  }
  tabDel(p: IPermission) {
    this.tabDelEvent.emit(p);
  }
}
