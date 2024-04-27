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
import { IResponse } from '../../../base-model/base';

@Component({
  selector: 'app-dept-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  providers: [DistrictService],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  formGroup!: FormGroup;
  action: '通訊處新增' | '通訊處編輯' = '通訊處新增';
  districts: IDistrict[] = [];
  districtName = '';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sel: any; districtId: number },
    private districtService: DistrictService
  ) {}

  ngOnInit(): void {
    this.action = !!this.data ? '通訊處編輯' : '通訊處新增';
    this.districtService.getAll().subscribe((res: IResponse) => {
      this.districts = <IDistrict[]>res.data;
      this.setDistrictName();
    });
    this.setFormgroup();
  }

  setFormgroup() {
    this.formGroup = this.formBuilder.group({
      name: [this.data?.sel?.name || '', Validators.required],
    });
  }

  setDistrictName() {
    const index = this.districts
      .map((district) => district.id)
      .indexOf(this.data.districtId);
    if (index !== -1) this.districtName = this.districts[index].name;
  }

  enter() {
    this.dialogRef.close(this.formGroup.value);
  }
}
