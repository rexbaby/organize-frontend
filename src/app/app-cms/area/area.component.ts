import { Component, OnInit } from '@angular/core';
import { TableModule } from '../../base-ui/table/table.module';
import { CommonModule } from '@angular/common';
import { AreaService } from './area.service';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [CommonModule, TableModule],
  providers: [AreaService],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss',
})
export class AreaComponent implements OnInit {
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

  constructor(private areaService: AreaService) {}

  ngOnInit(): void {
    this.areaService.getAll().subscribe((datas) => {
      console.log(677, datas);
    });
  }

  setNowSelect(index: number) {
    this.nowSelect = this.datas[index];
  }

  edit(index: number) {
    this.setNowSelect(index);
  }
}
