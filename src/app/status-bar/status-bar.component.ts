import { Component } from '@angular/core';
import { IStatusPanelParams } from 'ag-grid-community';
// import {IStatusPanelParams} from "@ag-grid-community/all-modules";

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent {

  rowLength = 10;

  private params!: IStatusPanelParams;

   agInit(params: IStatusPanelParams): void {
       this.params = params;
   }

   onPageSizeChanged() {
    console.log(this.rowLength);
    this.params.api.paginationSetPageSize(this.rowLength);
  }

}
