import { Injectable } from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {take} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog) {}

  openDialog(component: any,data:any={},fn?:any): MatDialogRef<any> {
    return this.dialog.open(component, {
      data: data,
      closeOnNavigation:true,

    });

   /* dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      fn(result);
    });*/
  }


}
