import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TableModule } from '../../base-ui/table/table.module';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IResponse } from '../../base-model/base';
import { IPerson, IStaff } from '../../base-model/person';
import { PersonService } from './person.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule, TableModule, DialogComponent, MatSnackBarModule],
  providers: [PersonService],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
})
export class PersonComponent implements OnInit {
  nowSelect: any = null;
  nowAction: '' | 'edit' | 'insert' | 'del' = '';
  datas: IPerson[] = [];
  districtId = -1;
  deptId = -1;

  constructor(
    private personService: PersonService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.districtId = +this.route.snapshot.params['districtId'] || -1;
    this.deptId = +this.route.snapshot.params['deptId'] || -1;
    this.setDatas();
  }

  setDatas() {
    this.nowSelect = null;
    switch (true) {
      case this.districtId === -1 && this.deptId === -1:
        this.personService.getAll().subscribe((res: IResponse) => {
          this.datas = <IPerson[]>res.data;
        });
        break;
      case this.districtId > -1 && this.deptId === -1:
        this.personService
          .getAllByDistrict(this.districtId)
          .subscribe((res: IResponse) => {
            this.datas = <IPerson[]>res.data;
          });
        break;
      case this.districtId > -1 && this.deptId > -1:
        this.personService
          .getAllByDept(this.deptId)
          .subscribe((res: IResponse) => {
            this.datas = <IPerson[]>res.data;
          });
        break;
    }
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
    let districtId = this.districtId;
    let deptId = this.deptId;
    if (this.nowSelect) {
      districtId = this.nowSelect.dept.district.id;
      deptId = this.nowSelect.dept.id;
    }

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        sel: this.nowSelect,
        districtId: districtId,
        deptId: deptId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      result = Object.assign(result, {
        status: 1,
        createdBy: 1,
        updatedBy: 1,
      });
      if (this.nowSelect) {
        delete result.deptId;
        this.update(this.nowSelect.id, result);
      } else {
        result = Object.assign(result, {
          level: 1,
          deptId: result.deptId === -1 ? this.deptId : result.deptId,
        });
        this.create(result);
      }
    });
  }

  update(id: number, staff: IStaff) {
    this.personService.update(id, staff).subscribe((res: IResponse) => {
      const result = res.affect?.success || false;
      this.snackBar.open(result ? 'Edit Success' : 'Edit Fail');
      if (result) this.setDatas();
    });
  }

  create(staff: IStaff) {
    this.personService.create(staff).subscribe((res: IResponse) => {
      const result = res.affect?.success || false;
      this.snackBar.open(result ? 'Insert Success' : 'Insert Fail');
      if (result) this.setDatas();
    });
  }
}
