export interface IPropertyType {
    propertTypeId: number,
    propertyType: ""
}

export interface IAPIResponseModel{
    message:string,
    result:boolean,
    data:any
}

export class site{
        siteId:          number;
        siteTitle:       string;
        location:        string;
        propertyTypeId:  number;
        city:            string;
        pincode:         number;
        state:           string;
        totalProperties: number;
        createdDate:     Date;
        lastUpdatedDate: Date;

        constructor(){
            this.siteId =0;
            this.siteTitle =''
            this.location=''
            this.propertyTypeId=0
            this.city=''
            this.pincode=0
            this.state=''
            this.totalProperties=0
            this.createdDate= new Date;
            this.lastUpdatedDate = new Date;
        }
    
}