import { Component, OnInit } from '@angular/core';
import { TableModule } from '../../base-ui/table/table.module';
import { CommonModule } from '@angular/common';
import { DistrictService } from './district.service';
import { IResponse } from '../../base-model/base';
import { IDistrict } from '../../base-model/district';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PermissionService } from '../../base-service/permission/permission.service';

@Component({
  selector: 'app-district',
  standalone: true,
  imports: [CommonModule, TableModule, DialogComponent, MatSnackBarModule],
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
    private snackBar: MatSnackBar,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.setDatas();
  }

  setDatas() {
    this.nowSelect = null;
    this.districtService.getAll().subscribe((res: IResponse) => {
      this.datas = <IDistrict[]>res.data;
    });
  }

  setNowSelect(index: number) {
    this.nowSelect = this.datas[index];
  }

  viewDepts(index: number) {
    const district = this.datas[index];
    this.permissionService.nextPermissionBranch({
      url: `district/${district.id}/dept`,
      title: `查看區域：${district.name}`,
      suffix: '',
    });
  }

  viewPersons(index: number) {
    const district = this.datas[index];
    this.permissionService.nextPermissionBranch({
      url: `district/${district.id}/person`,
      title: `查看人員(區域)：${district.name}`,
      suffix: '',
    });
  }

  insert() {
    this.nowSelect = null;
    this.openDialog();
  }

  edit(index: number) {
    this.setNowSelect(index);
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: this.nowSelect,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        this.nowSelect = null;
        return;
      }
      result = Object.assign(result, { status: 1 });
      if (this.nowSelect) {
        this.update(this.nowSelect.id, result);
        this.nowSelect = null;
      } else {
        this.create(result);
      }
    });
  }

  update(id: number, district: IDistrict) {
    this.districtService.update(id, district).subscribe((res: IResponse) => {
      const result = res.affect?.success || false;
      this.snackBar.open(result ? '編輯成功' : '編輯失敗', undefined, {
        duration: 3000,
      });
      if (result) this.setDatas();
    });
  }

  create(district: IDistrict) {
    this.districtService.create(district).subscribe((res: IResponse) => {
      const result = res.affect?.success || false;
      this.snackBar.open(result ? '新增成功' : '新增失敗', undefined, {
        duration: 3000,
      });
      if (result) this.setDatas();
    });
  }
}
