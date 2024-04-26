import { Component, OnInit } from '@angular/core';
import { TableModule } from '../../base-ui/table/table.module';
import { CommonModule } from '@angular/common';
import { AreaService } from './area.service';
import { IResponse } from '../../base-model/base';
import { IDistrict } from '../../base-model/district';
import { DialogDistrictComponent } from './dialog-district/dialog-district.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DialogDistrictComponent,
    MatSnackBarModule,
  ],
  providers: [AreaService],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss',
})
export class AreaComponent implements OnInit {
  nowSelect: any = null;
  nowAction: '' | 'edit' | 'insert' | 'del' = '';
  datas: IDistrict[] = [];

  constructor(
    private areaService: AreaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setDatas();
  }

  setDatas() {
    this.areaService.getAllByDistrict().subscribe((res: IResponse) => {
      this.datas = <IDistrict[]>res.data;
    });
  }

  setNowSelect(index: number) {
    this.nowSelect = this.datas[index];
  }

  insert() {
    this.nowSelect = null;
    this.openDialogByDistrict();
  }

  edit(index: number) {
    this.setNowSelect(index);
    this.openDialogByDistrict();
  }

  openDialogByDistrict() {
    const dialogRef = this.dialog.open(DialogDistrictComponent, {
      data: this.nowSelect,
    });
    dialogRef.afterClosed().subscribe((result) => {
      result = Object.assign(result, { status: 1 });
      if (this.nowSelect) {
        this.update(this.nowSelect.id, result);
      } else {
        this.create(result);
      }
    });
  }

  update(id: number, district: IDistrict) {
    this.areaService
      .updateDistrict(id, district)
      .subscribe((res: IResponse) => {
        const result = res.affect?.success || false;
        this.snackBar.open(result ? 'Edit Success' : 'Edit Fail');
        if (result) this.setDatas();
      });
  }

  create(district: IDistrict) {
    this.areaService.createDistrict(district).subscribe((res: IResponse) => {
      const result = res.affect?.success || false;
      this.snackBar.open(result ? 'Insert Success' : 'Insert Fail');
      if (result) this.setDatas();
    });
  }
}
