import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {

  lineas = [""];

  constructor(
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    public dialog : MatDialog,
    @Inject(MAT_DIALOG_DATA) public message : string
  ) { 
    this.lineas = this.message.split("\n");
   
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(true);
  }

  closeno() {
    this.dialogRef.close(false);
  }

  
}
