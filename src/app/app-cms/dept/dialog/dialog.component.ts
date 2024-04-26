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

@Component({
  selector: 'app-dept-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  formGroup!: FormGroup;
  action: 'Insert' | 'Edit' = 'Insert';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDept | null
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