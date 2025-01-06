import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { IAPIResponseModel, IProperty, IPropertyType, site } from '../../model/master';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { MasterService } from '../../service/master.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [FormsModule,AsyncPipe,CommonModule,ReactiveFormsModule],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent implements OnInit {

  mService = inject(MasterService);
  formObj = new site();
  isFormView = signal<boolean>(false);
  propertyType$: Observable<IPropertyType[]> = new Observable<IPropertyType[]> //Asyncronise pipe use not requird to store data a variable.
  currentSiteId:any;
  propertyList: IProperty[] = [];

  @ViewChild('propertyModal') modal: ElementRef | undefined; //It is useing for open modal

  gridData: site[] = [];

  propertyForm:FormGroup = new FormGroup({});


  constructor(){
    this.initializeForm()
    this.propertyType$ = this.mService.getAllPropertyType().pipe(
      map((item:IAPIResponseModel)=>{
        return item.data
      })
    );

  }
ngOnInit(): void {
  this.getSite();
}
  toggleView(){
    this.isFormView.set(!this.isFormView());
  }

  onSubmit(){
    this.mService.saveSite(this.formObj).subscribe((res:IAPIResponseModel)=>{
      if(res.result){
        alert("Record is saved")
        this.isFormView.set(!this.isFormView());
        this.getSite();
      }else{
        alert(res.message)
      }
    })

  }
  getSite(){
    this.mService.getAllSite().subscribe((res:IAPIResponseModel)=>{
      this.gridData = res.data;
    })
  }

  onEdit(data:site){
   this.formObj = data;
   this.isFormView.set(!this.isFormView());

  }

  onUpdate(){
    this.mService.updateSite(this.formObj).subscribe((res:IAPIResponseModel)=>{
      if(res.result){
        alert("Record is updated")
        this.isFormView.set(!this.isFormView());
        this.getSite();
      }else{
        alert(res.message)
      }

    })
  }
  onDelete(data:site){
    const isDelete = confirm('Are you sure want to delete');
    if(isDelete){

    
    this.mService.deleteSite(data.siteId).subscribe((res:IAPIResponseModel)=>{
      if(res.result){
        alert("Record is Deleted")
        
        this.getSite();
      }else{
        alert(res.message)
      }

    })
  }

  }

  initializeForm(){
    this.propertyForm = new FormGroup({
      propertyId:new FormControl(0),
      propertyNo: new FormControl(''),
      facing: new FormControl(''),
      totalArea: new FormControl(''),
      rate: new FormControl(''),
      siteId: new FormControl(this.currentSiteId)
    })
  }

  onSave(){
    this.mService.saveProperty(this.propertyForm.value).subscribe((res:IAPIResponseModel)=>{
      if(res.result){
        alert("Record is Saved");
      }else{
        alert(res.message)
      }
    });
  }

  openModal(data:site){
    
    this.currentSiteId = data.siteId;
    this.initializeForm();
    this.getProperties();
    if(this.modal){
      this.modal.nativeElement.style.display='block'
    }
  }
  closeModal(){
    if(this.modal){
      this.modal.nativeElement.style.display='none'
    }
  }

  getProperties(){
    this.mService.GetAllPropertyMaster().subscribe((res:IAPIResponseModel)=>{
      this.propertyList = res.data.filter((m:any)=>m.siteId == this.currentSiteId)
    })
  }


}
