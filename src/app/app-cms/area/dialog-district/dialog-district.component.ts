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
import { IDistrict } from '../../../base-model/district';

@Component({
  selector: 'app-dialog-district',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './dialog-district.component.html',
  styleUrl: './dialog-district.component.scss',
})
export class DialogDistrictComponent implements OnInit {
  formGroup!: FormGroup;
  action: 'Insert' | 'Edit' = 'Insert';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogDistrictComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDistrict | null
  ) {}

  ngOnInit(): void {
    this.action = !!this.data ? 'Edit' : 'Insert';
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
    });
    if (this.action === 'Edit') {
      this.formGroup.patchValue({
        name: this.data?.name || '',
      });
    }
  }

  enter() {
    this.dialogRef.close(this.formGroup.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
