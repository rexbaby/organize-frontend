import { Component, OnInit } from '@angular/core';
import { TableModule } from '../../base-ui/table/table.module';
import { CommonModule } from '@angular/common';
import { DistrictService } from './district.service';
import { IResponse } from '../../base-model/base';
import { IDistrict } from '../../base-model/district';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DialogComponent,
    MatSnackBarModule,
  ],
  providers: [DistrictService],
  templateUrl: './district.component.html',
  styleUrl: './district.component.scss',
})
export class DistrictComponent implements OnInit {
  nowSelect: any = null;
  nowAction: '' | 'edit' | 'insert' | 'del' = '';
  datas: IDistrict[] = [];

  constructor(
    private districtService: DistrictService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setDatas();
  }

  setDatas() {
    this.districtService.getAllByDistrict().subscribe((res: IResponse) => {
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
    const dialogRef = this.dialog.open(DialogComponent, {
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
    this.districtService
      .updateDistrict(id, district)
      .subscribe((res: IResponse) => {
        const result = res.affect?.success || false;
        this.snackBar.open(result ? 'Edit Success' : 'Edit Fail');
        if (result) this.setDatas();
      });
  }

  create(district: IDistrict) {
    this.districtService.createDistrict(district).subscribe((res: IResponse) => {
      const result = res.affect?.success || false;
      this.snackBar.open(result ? 'Insert Success' : 'Insert Fail');
      if (result) this.setDatas();
    });
  }
}
