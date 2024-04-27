import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { IDept } from '../../../base-model/dept';
import { IDistrict } from '../../../base-model/district';
import { DistrictService } from '../../district/district.service';
import { DeptService } from '../../dept/dept.service';
import { IResponse } from '../../../base-model/base';

@Component({
  selector: 'app-person-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  providers: [DistrictService, DeptService],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  formGroup!: FormGroup;
  action: '人員新增' | '人員編輯' = '人員新增';
  districts: IDistrict[] = [];
  depts: IDept[] = [];

  districtName = '';
  deptName = '';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { sel: any; districtId: number; deptId: number },
    private districtService: DistrictService,
    private deptService: DeptService
  ) {}

  ngOnInit(): void {
    this.action = !!this.data.sel ? '人員編輯' : '人員新增';
    this.districtService.getAll().subscribe((res: IResponse) => {
      this.districts = <IDistrict[]>res.data;
    });
    this.setFormgroup();
  }

  setFormgroup() {
    let o = {
      name: [this.data?.sel?.staff.name || '', Validators.required],
    };
    switch (true) {
      case this.data.districtId === -1 && this.data.deptId === -1:
        o = Object.assign(o, {
          districtId: ['', Validators.required],
          deptId: ['', Validators.required],
        });
        break;
      case this.data.districtId > -1 && this.data.deptId === -1:
        o = Object.assign(o, {
          deptId: ['', Validators.required],
        });
        this.setDistrictName();
        break;
      case this.data.districtId > -1 && this.data.deptId > -1:
        this.setDistrictName();
        this.setDepts(this.data.districtId,() => this.setDeptName())
        break;
    }
    this.formGroup = this.formBuilder.group(o);
  }

  setDistrictName() {
    const index = this.districts
      .map((district) => district.id)
      .indexOf(this.data.districtId);
    if (index !== -1) this.districtName = this.districts[index].name;
  }

  setDeptName(){
    const index = this.depts
      .map((dept) => dept.id)
      .indexOf(this.data.deptId);
    if (index !== -1) this.deptName = this.depts[index].name;
  }

  setDepts(districtId:number,callback?:()=>void) {
    this.deptService
      .getAll(districtId)
      .subscribe((res: IResponse) => {
        this.depts = <IDept[]>res.data;
        if(callback) callback();
      });
  }

  enter() {
    const formValue = this.formGroup.value;
    formValue.deptId = Number(formValue.deptId);
    delete formValue.districtId;
    this.dialogRef.close(this.formGroup.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
