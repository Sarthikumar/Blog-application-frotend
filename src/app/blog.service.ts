import { Injectable } from '@angular/core';

@Injectable()
export class BlogService {
  public name:string ='Ramu';
 
  constructor() {
    console.log("Service called");
   }
   public getdata(): any{
     console.log("Inside service")
     return this.name;
   }
}
