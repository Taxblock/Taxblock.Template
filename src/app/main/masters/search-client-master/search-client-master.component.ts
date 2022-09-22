import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ResponseCode } from "@core/models/responseObject.model";
import { AlertService } from '@core/services/alertService';
import { DataTableDirective } from 'angular-datatables';
import { ClientDetails } from 'app/shared/Models/Masters/employeeDetails.model';
import { Subject } from 'rxjs';
import { SearchClientMasterService } from './search-client-master.service';
declare const $: any;


@Component({
  selector: 'search-client-master',
  templateUrl: './search-client-master.component.html',
  styleUrls: ['./search-client-master.component.scss']
})
export class SearchClientMasterComponent implements OnInit {
    @ViewChild(DataTableDirective, {static: false})
  private datatableElement: DataTableDirective;
  @ViewChild("dTable", {static: false})
  public dTable: any;


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  

    employeeDetailsList: Array<ClientDetails>;
    employeeDetails: any;
    submitted = false;
    employeeList: Array<ClientDetails>;
  
    shortDate: any;
    formatOptions: any;
    searchEmployeeMasterForm: FormGroup;
    searchEmployeeMaster_Form: any;
    message: string = '';

    someClickHandler(info: any): void {
        this.message = info[0] + ' - ' + info[1];
      }
    data = [
        {
            id: "1",
            firstName: "Pradip",
            lastName: "Pawade",
        },{
            id: "2",
            firstName: "Anjali",
            lastName: "Rahane",
        },{
            id: "3",
            firstName: "Swati",
            lastName: "Wale",
        },{
            id: "4",
            firstName: "Swati",
            lastName: "Satpute",
        },{
            id: "5",
            firstName: "Sumit",
            lastName: "Kakde",
        },{
            id: "6",
            firstName: "Sanket",
            lastName: "Wale",
        },{
            id: "7",
            firstName: "Pravin",
            lastName: "Nehe",
        },{
            id: "8",
            firstName: "Bhushan",
            lastName: "Nehe",
        },{
            id: "9",
            firstName: "Aniket",
            lastName: "Nehe",
        },{
            id: "9",
            firstName: "Aniket",
            lastName: "Nehe",
        },{
            id: "9",
            firstName: "Aniket",
            lastName: "Nehe",
        },
        
    ]
    constructor(private formBuilder: FormBuilder,
      private searchClientMasterService:SearchClientMasterService,        
      private router: Router,
      private alertService: AlertService,
      private renderer: Renderer2,) {
        
    }
    
    ngOnInit(): void {
       
      this.CreateForm();
      this.GetAll();
      this.dtOptions = {
       // responsive: true,
        pagingType: 'full_numbers',
        pageLength: 5,
     // scrollY: "50vh",
      //scrollX:true,

      
        rowCallback: (row: Node, data:any[] | Object, index: number) => {
            const self = this;
            $('td', row).off('click');
            $('.buttonClass', row).on('click', () => {
              self.someClickHandler(data);
            });
            $('.buttonClass-delete', row).on('click', () => {
                this.message = 'Delete'
              });
            return row;
          }

          
          
      };
    }
   

    ngAfterViewInit(): void {
      let data=  $(this.dTable.nativeElement).DataTables()

      
      }

    CreateForm() {
      this.searchEmployeeMasterForm = this.formBuilder.group({
        Fname: [''],
        Lname: [''],
        EmailId: [''],
      });
      this.searchEmployeeMaster_Form = this.searchEmployeeMasterForm.controls;
  
    }
  
   
  
    onSearch_Click() {
      this.GetAll();
    }
  
    GetAll() {
      this.employeeDetailsList = [];
      let Fname = this.searchEmployeeMasterForm.controls['Fname'].value;
      let Lname = this.searchEmployeeMasterForm.controls['Lname'].value;
      let EmailId = this.searchEmployeeMasterForm.controls['EmailId'].value;
      this.searchClientMasterService.GetClientDetails().subscribe(
        (result: any) => {
          this.employeeDetailsList = result.Value;
          //this.data=result.Value;
        },
        (error: any) => {
          this.alertService.ShowError(error, "Failed to load due to unknown error.");
        }
      );
    }
  
    // onEditClick(args: Event): void {
    //   let rowObj: IRow<Column> = this.grdEmployee.getRowObjectFromUID(closest(<Element>args.target, '.e-row').getAttribute('data-uid'));
    //   let employeeDetails: EmployeeDetails = <EmployeeDetails>rowObj.data;
  
    //   if (employeeDetails != null) {
    //     this.router.navigateByUrl('masters/employeemaster?UserId=' + employeeDetails.UserId);
    //     localStorage.setItem('EmpUserId', employeeDetails.UserId.toString());
    //   }
    //   else {
    //     this.alertService.ShowErrorMessage('Failed to load employee data due to application error');
    //   }
    // }
  
  
  
  }

