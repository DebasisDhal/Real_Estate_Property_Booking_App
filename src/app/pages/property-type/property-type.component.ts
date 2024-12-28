import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { IAPIResponseModel, IPropertyType } from '../../model/master';


@Component({
  selector: 'app-property-type',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.css'
})
export class PropertyTypeComponent implements OnInit {

  mservice =inject(MasterService)
  gridData:IPropertyType [] =[]
  

  form: FormGroup = new FormGroup({

  })

  constructor(){
    this.initializeForm();

  }
  ngOnInit(): void {
    this.getGridData();
  }


  initializeForm(item?:IPropertyType){
    this.form = new FormGroup({
      propertyTypeId: new FormControl<number>(item ? item.propertTypeId:0),
      propertyType: new FormControl<string>(item ? item.propertyType:'',[Validators.required,Validators.minLength(3)])
    })
  }

  OnEdit(item:IPropertyType){
   this.initializeForm(item);
  }
  

  onSubmit(){
    this.mservice.savePropertyType(this.form.value).subscribe((res:IAPIResponseModel)=>{
      
      console.log(res.data);
      
      if(res.result){
        alert("ReCord Saved");
        this.getGridData();
      }else{
        alert(res.message)
      }
    })

  }
  onUpdate(){
    this.mservice.updatePropertyType(this.form.value).subscribe((res:IAPIResponseModel)=>{
      
      console.log(res.data);
      
      if(res.result){
        alert("ReCord Updated");
        this.getGridData();
      }else{
        alert(res.message)
      }
    })

  }

  onDelete(id:number){
    const isDel = confirm("Are you want to Delete");
    if(isDel){
      this.mservice.deletePropertyType(id).subscribe((res:IAPIResponseModel)=>{
        if(res.result){
          alert("Record is Deleted");
        }else{
          alert("res.message")
        }
      })
    }
    
  }

  getGridData(){
    this.mservice.getAllPropertyType().subscribe((res:IAPIResponseModel)=>{
     this.gridData= res.data;
      
    })
  }

}
