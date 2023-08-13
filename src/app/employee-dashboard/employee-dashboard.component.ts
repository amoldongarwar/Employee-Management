import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  formValue !: FormGroup;
  employeeData !:any;
  showAdd !:boolean;
  showUpdate !:boolean;
  employeeModelObj : EmployeeModel = new EmployeeModel();

  constructor(private formbuilder : FormBuilder, private api:ApiService){}


  ngOnInit():void{
  this.formValue = this.formbuilder.group({
    firstName:[''],
    lastName:[''],
    emailId:[''],
    phoneNumber:[''],
    salary:[''],
  }); 
  this.getAllEmployee();
  }
  
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeModel(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.emailId = this.formValue.value.emailId;
    this.employeeModelObj.phoneNumber = this.formValue.value.phoneNumber;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      setTimeout(() => {
        alert("employee added successfully");
      }, 2000);
      
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();

      this.getAllEmployee();
    },
    err=>{
      alert("something went wrong");
    })
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
        this.employeeData = res;
    })
  }

  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("employee deleted successfully");
      this.getAllEmployee();
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['emailId'].setValue(row.emailId);
    this.formValue.controls['phoneNumber'].setValue(row.phoneNumber);
    this.formValue.controls['salary'].setValue(row.salary);
  }
    

  updateEmployee(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.emailId = this.formValue.value.emailId;
    this.employeeModelObj.phoneNumber = this.formValue.value.phoneNumber;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.employeeModelObj.firstName = this.formValue.value.firstName;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("updated successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();

      this.getAllEmployee();
    })

  }

    
  

}
