import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    public dialog : MatDialog,
    @Inject(MAT_DIALOG_DATA) public message : string
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(true);
  }

  closeno() {
    this.dialogRef.close(false);
  }

  alerta(mensaje: string) {
    const dialogref = this.dialog.open(DialogBodyComponent, {
      width:'350px',
      data: mensaje
    });
    dialogref.afterClosed().subscribe(res => {
      //console.log("Debug", res);
    });
  
  }
  
}
