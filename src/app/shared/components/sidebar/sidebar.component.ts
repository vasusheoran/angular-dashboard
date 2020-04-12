import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { Listing } from '../../models/listing';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../widgets/dialog/dialog.component';
import { ConfigService } from '../../services/config.service';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  currentUrl:string;
  toggleDashBoardTools:boolean;
  toggleHistoricDataTools:boolean;
  listing:Listing;
  snackBarRef:any;

  dialogData;
  
  constructor(private _router : Router,
    private _shared  : SharedService,
    public dialog: MatDialog,
    private _config : ConfigService,
    private _snack : MatSnackBar  ) {
    this.toggleDashBoardTools = true;
    this.toggleHistoricDataTools = false;
    this.dialogData = {};
    
  }

  ngOnInit(): void {
    this._router.events.subscribe((val:NavigationStart) => {
      // see also 
        let currentUrl = this._router.url;  
        if(currentUrl == '/'){
         this.toggleDashBoardTools = true;
         this.toggleHistoricDataTools = false; 
        }else if(currentUrl == '/historica-data'){
          this.toggleHistoricDataTools = true;
          this.toggleDashBoardTools = false;
        }
    });  
    
    this._shared.sharedListing.subscribe((resp) =>{
      if(typeof resp != 'function')
        this.listing = resp;
    });
  }

  updateFreezeTime(result){
    this._config.freezeBI(result).subscribe((res) => {
      this.snackBarRef = this._snack.open('Freeze buy successfully.','Close',{
        duration:4000
      });
    },(err) =>{
      this.snackBarRef = this._snack.open('Error in Freezing Buy.','Close',{
        duration:4000
      });
    });
  }

  addRow(result){
    this._config.addNewRow(result).subscribe((res) => {
      this._router.navigate['/'];
      this.snackBarRef = this._snack.open('Row Added successfully.','Close',{
        duration:4000
      });
    },(err) =>{
      this.snackBarRef = this._snack.open('Error in adding row.','Close',{
        duration:4000
      });
    });
  }

  deleteRow(){
    this._config.deleteRow().subscribe((res) => {
      this._router.navigate['/'];
      this.snackBarRef = this._snack.open('Row Deleter successfully.','Close');
    },(err) =>{
      this.snackBarRef = this._snack.open('Error in deleteing row.','Close');
    });
  }

  openDailog(task, isFreeze): void {

    if(this.listing ==null || this.listing.SASSymbol == null){
      this.snackBarRef = this._snack.open('Please set the Stock Listing to continue.','Close',{
        duration:4000
      });
    }else{
      this.dialogData['task'] = task;
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: this.dialogData
      });

      
      dialogRef.afterClosed().subscribe(result => {
          delete result['tempDate'];
          if(result['CP'] == undefined || result['HP'] == undefined || result['LP'] == undefined){
            this.snackBarRef = this._snack.open('Error. Please set CP/HP/LP.','Close',{
              duration:4000
            });
            return;
          }
          result['index'] = this.listing.SASSymbol;

          if(isFreeze)
            this.updateFreezeTime(result);
          else
            this.addRow(result);
      });
    }
  }
}