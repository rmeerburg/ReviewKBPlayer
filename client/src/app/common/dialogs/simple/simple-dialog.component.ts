import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.scss']
})
export class SimpleDialogComponent {
  style: number;
  title: string;
  message: string;
  information: string;
  button: number;
  allow_outside_click: boolean;
  constructor(
    public dialogRef: MatDialogRef<SimpleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.style = data.style || 0;
    this.title = data.title;
    this.message = data.message;
    this.information = data.information;
    this.button = data.button;
    this.dialogRef.disableClose = !data.allow_outside_click || false;

  }
  onOk() {
    this.dialogRef.close({ result: "ok" });
  }
  onCancel() {
    this.dialogRef.close({ result: "cancel" });
  }
}