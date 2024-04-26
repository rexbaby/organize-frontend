import { Component, OnInit } from '@angular/core';
import { TableModule } from '../../base-ui/table/table.module';
import { CommonModule } from '@angular/common';
import { DeptService } from './dept.service';
import { IResponse } from '../../base-model/base';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { IDept } from '../../base-model/dept';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dept',
  standalone: true,
  imports: [CommonModule, TableModule, DialogComponent, MatSnackBarModule],
  providers: [DeptService],
  templateUrl: './dept.component.html',
  styleUrl: './dept.component.scss',
})
export class DeptComponent implements OnInit {
  nowSelect: any = null;
  nowAction: '' | 'edit' | 'insert' | 'del' = '';
  datas: IDept[] = [];

  constructor(
    private deptService: DeptService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(3366, id);
    this.setDatas();
  }

  setDatas() {
    this.deptService.getAll().subscribe((res: IResponse) => {
      this.datas = <IDept[]>res.data;
    });
  }

  setNowSelect(index: number) {
    this.nowSelect = this.datas[index];
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
      data: this.nowSelect,
    });
    dialogRef.afterClosed().subscribe((result) => {
      result = Object.assign(result, { status: 1 });
      // if (this.nowSelect) {
      //   this.update(this.nowSelect.id, result);
      // } else {
      //   this.create(result);
      // }
    });
  }

  update(id: number, dept: IDept) {
    this.deptService.update(id, dept).subscribe((res: IResponse) => {
      const result = res.affect?.success || false;
      this.snackBar.open(result ? 'Edit Success' : 'Edit Fail');
      if (result) this.setDatas();
    });
  }

  create(dept: IDept) {
    this.deptService.create(dept).subscribe((res: IResponse) => {
      const result = res.affect?.success || false;
      this.snackBar.open(result ? 'Insert Success' : 'Insert Fail');
      if (result) this.setDatas();
    });
  }
}
