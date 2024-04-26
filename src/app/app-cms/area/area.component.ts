import { Component } from '@angular/core';
import { TableModule } from '../../base-ui/table/table.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss',
})
export class AreaComponent {
  nowSelect: any = null;
  nowAction: '' | 'edit' | 'insert' | 'del' = '';
  datas = [
    {
      id: 12,
      account: 'aa',
    },
    {
      id: 22,
      account: 'bb',
    },
    {
      id: 12,
      account: 'aa',
    },
    {
      id: 22,
      account: 'bb',
    },
    {
      id: 12,
      account: 'aa',
    },
    {
      id: 22,
      account: 'bb',
    },
    {
      id: 12,
      account: 'aa',
    },
    {
      id: 22,
      account: 'bb',
    },
    {
      id: 12,
      account: 'aa',
    },
    {
      id: 22,
      account: 'bb',
    },
    {
      id: 12,
      account: 'aa',
    },
    {
      id: 22,
      account: 'bb',
    },
    {
      id: 12,
      account: 'aa',
    },
    {
      id: 22,
      account: 'bb',
    },
    {
      id: 12,
      account: 'aa',
    },
    {
      id: 22,
      account: 'bb',
    },
    {
      id: 12,
      account: 'aa',
    },
    {
      id: 22,
      account: 'bb',
    },
    {
      id: 12,
      account: 'aa',
    },
    {
      id: 22,
      account: 'bb',
    },
    {
      id: 12,
      account: 'aa',
    },
    {
      id: 22,
      account: 'bb',
    },
    {
      id: 12,
      account: 'aa',
    },
    {
      id: 22,
      account: 'bb',
    },
    {
      id: 12,
      account: 'aa',
    },
    {
      id: 22,
      account: 'bb',
    },
  ];

  setNowSelect(index: number) {
    this.nowSelect = this.datas[index];
  }

  edit(index: number) {
    this.setNowSelect(index);
  }
}
