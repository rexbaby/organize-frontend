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
  selector: 'app-district-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  formGroup!: FormGroup;
  action: 'Dialog Insert' | 'Dialog Edit' = 'Dialog Insert';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDistrict | null
  ) {}

  ngOnInit(): void {
    this.action = !!this.data ? 'Dialog Edit' : 'Dialog Insert';
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
    });
    if (this.action === 'Dialog Edit') {
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
