import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { SimpleDialogComponent } from "app/common/dialogs/simple/simple-dialog.component";

@Injectable()
export class SimpleDialogService {
    constructor(private readonly dialog: MatDialog) {

    }
    public show(config: { title: string, message: string }) {
        return this.dialog.open(SimpleDialogComponent, { data: { title: config.title, message: config.message, button: 0, }, panelClass: 'full-width-dialog' }).afterClosed();
    }
}