import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAPIResponseModel, IProperty, site } from '../../model/master';
import { MasterService } from '../../service/master.service';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [AsyncPipe,FormsModule,ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  sites$: Observable<site[]> = new Observable<site[]>;  //Here direct fetch the data api and store here 

  masterServices = inject(MasterService);

  siteId:number=0; //When changes happen it is update here

  propertyList: IProperty[] = [];
  booking: any[] = [];
  bookingForm: FormGroup = new FormGroup({});
  currentPropertyId: number =0;

  constructor(){
    this.initializeForm();
    this.sites$ = this.masterServices.getAllSite().pipe(   //we no need to subscribe here Asyncronise pipe help directlly use in html
      map((res:IAPIResponseModel)=>{
        return res.data;
      })
    )
  }

  getProperties(event:Event){
    this.getBookingBySiteId();
    this.masterServices.getAllPropertyBySiteId(this.siteId).subscribe((res:IAPIResponseModel)=>{
        this.propertyList = res.data;
    })
  }

  openModal(data:IProperty){   //Normal way to open and close the modal
    this.currentPropertyId = data.propertyId;
    this.initializeForm();

    const modal = document.getElementById('myModal')
    if(modal){
      modal.style.display='block'
    }
  }
  closeModal(){
    const modal = document.getElementById('myModal')
    if(modal){
      modal.style.display='none'
    }
  }

  initializeForm(){
    this.bookingForm = new FormGroup({
    bookingId: new FormControl(0),
    propertyId: new FormControl(this.currentPropertyId),
    bookindDate: new FormControl(' '),
    bookingRate: new FormControl(0),
    totalAmont: new FormControl(0),
    custId: new FormControl(0),
    name: new FormControl(' '),
    mobile: new FormControl(' '),
    emailid: new FormControl(' '),
    address: new FormControl(' ')
    })

  }

  getBookingBySiteId(){
    this.masterServices.getAllPropertyBookingBySiteId(this.siteId).subscribe((res:IAPIResponseModel)=>{
      this.booking = res.data;
  })
  }

  doBooking(){
    this.masterServices.onSaveBooking(this.bookingForm.value).subscribe((res:IAPIResponseModel)=>{
      if(res.result){
        alert("Record Saved");
        this.getBookingBySiteId();
      }else{
        alert(res.message);
      }
    })
  }
  
  checkIfPropertyAvailable(propertyId:number){
    const record = this.booking.find(m=>propertyId == propertyId);
    if(record != undefined){
      return record;
    }else{
      return null;
    }
  }

}
