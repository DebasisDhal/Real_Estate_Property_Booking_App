import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import {  IAPIResponseModel, IPropertyType } from '../model/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

  getAllPropertyType():Observable<IAPIResponseModel>{
    return this.http.get<IAPIResponseModel>(environment.API_URL+'GetAllPropertyType');
  }

  savePropertyType(obj:IPropertyType):Observable<IAPIResponseModel>{
    const newObh =[obj]
    return this.http.post<IAPIResponseModel>(environment.API_URL+'AddPropertyType',newObh);
  }

}
