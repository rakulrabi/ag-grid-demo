import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {MatDialog} from '@angular/material/dialog';
import { StatusBarComponent } from '../status-bar/status-bar.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  private gridApi: any;
  private gridColumnApi: any;
  
  frameworkComponents: any;
  columnDefs!: any;
  defaultColDef!: any;
  rowData!: Observable<any>;
  rowLength: number = 10;
  statusBar: any;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
    ) {

    this.columnDefs = [
      { field: '', 
        width: 50,
        checkboxSelection: true, 
        headerCheckboxSelection: true,
        pinned: 'left' },
      {
        headerName: 'Car Details',
        children: [
          { field: 'carMake' },
          { field: 'carModel', columnGroupShow: 'closed'},
          { field: 'carModelYear', columnGroupShow: 'closed'},
          { field: 'carVin', columnGroupShow: 'closed'},
          { field: 'color', columnGroupShow: 'closed'},
          { field: 'price', columnGroupShow: 'closed'}
        ]
      },
      {
        headerName: 'Location',
        children: [
          { field: 'city'},
          { field: 'country', columnGroupShow: 'closed'}
        ]
      }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true,
      editable:true
    };

    this.frameworkComponents = {
      statusBarComponent: StatusBarComponent,
    };

    this.statusBar = {
      statusPanels: [{ statusPanel: 'statusBarComponent' }],
    };
  }

  ngOnInit(): void {
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http.get<any[]>('./assets/MOCK_DATA.json')
      .subscribe((data) => params.api.setRowData(data));
  }

  onPageSizeChanged() {
    console.log(this.rowLength);
    this.gridApi.paginationSetPageSize(this.rowLength);
  }

}
