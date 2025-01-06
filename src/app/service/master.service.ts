import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {  IAPIResponseModel, IPropertyType, site } from '../model/master';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

  getAllPropertyType():Observable<IAPIResponseModel>{
    return this.http.get<IAPIResponseModel>(environment.API_URL+'GetAllPropertyType');
  }

  savePropertyType(obj:IPropertyType):Observable<IAPIResponseModel>{
    const newObh =[obj] //Array of data show passing here like this type
    return this.http.post<IAPIResponseModel>(environment.API_URL+'AddPropertyType',newObh);
  }

  updatePropertyType(obj:IPropertyType):Observable<IAPIResponseModel>{
    return this.http.put<IAPIResponseModel>(environment.API_URL+'UpdatePropertyType',obj);
  }
  deletePropertyType(id:number):Observable<IAPIResponseModel>{
    return this.http.delete<IAPIResponseModel>(environment.API_URL+'DeletePropertyTypeById'+id)
  }


  saveSite(obj:site):Observable<IAPIResponseModel>{
    return this.http.post<IAPIResponseModel>(environment.API_URL+"AddSites",obj);
  }
  getAllSite():Observable<IAPIResponseModel>{
    return this.http.get<IAPIResponseModel>(environment.API_URL+"GetAllSites")
  }
  updateSite(obj:site):Observable<IAPIResponseModel>{
    return this.http.put<IAPIResponseModel>(environment.API_URL+'UpdateSites',obj);
  }
  deleteSite(id:number):Observable<IAPIResponseModel>{
    return this.http.delete<IAPIResponseModel>(environment.API_URL+'DeleteSitesById?id='+id)
  }

 saveProperty(obj:site):Observable<IAPIResponseModel>{
  return this.http.post<IAPIResponseModel>(environment.API_URL+"AddPropertyMasters",obj);
}

GetAllPropertyMaster():Observable<IAPIResponseModel>{
  return this.http.get<IAPIResponseModel>(environment.API_URL+"GetAllPropertyMasters")
}
getAllPropertyBySiteId(id:number):Observable<IAPIResponseModel>{
  return this.http.get<IAPIResponseModel>(environment.API_URL+'GetAllPropertyBySiteId?siteid='+id)
}

onSaveBooking(obj:site):Observable<IAPIResponseModel>{
  return this.http.post<IAPIResponseModel>(environment.API_URL+'AddPropertyBooking',obj)
}
getAllPropertyBookingBySiteId(id:number):Observable<IAPIResponseModel>{
  return this.http.get<IAPIResponseModel>(environment.API_URL+'GetAllPropertyBookingBySiteId?siteid='+id)
}
}
