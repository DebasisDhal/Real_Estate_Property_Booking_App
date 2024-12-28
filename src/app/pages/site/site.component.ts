import { Component, inject, OnInit, signal } from '@angular/core';
import { IAPIResponseModel, IPropertyType, site } from '../../model/master';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { MasterService } from '../../service/master.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [FormsModule,AsyncPipe,CommonModule],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent implements OnInit {
  mService = inject(MasterService);
  formObj = new site();
  isFormView = signal<boolean>(false);
  propertyType$: Observable<IPropertyType[]> = new Observable<IPropertyType[]> //Asyncronise pipe use not requird to store data a variable.

  gridData: site[] = [];

  constructor(){
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

}
