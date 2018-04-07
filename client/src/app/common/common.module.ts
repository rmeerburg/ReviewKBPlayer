import { NgModule } from '@angular/core';
import * as ngcommon from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { SimpleDialogComponent } from './dialogs/simple/simple-dialog.component';
import { SimpleDialogService } from '../services/simple-dialog.service';
import { MatToolbarModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    ngcommon.CommonModule,
    MatToolbarModule,
    MatDialogModule,
  ],
  declarations: [
    LoaderComponent,
    SimpleDialogComponent,
  ],
  exports: [
    LoaderComponent,
    SimpleDialogComponent,
  ],
  providers: [
    SimpleDialogService,
  ]
})
export class CommonModule { }
