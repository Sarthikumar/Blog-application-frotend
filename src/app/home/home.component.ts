import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '../blog.service';
import { BlogHttpService } from '../blog-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy{

 
  
  public allBlogs=[];
  public messages;
  constructor(public blogHttpService:BlogHttpService,public blogService:BlogService) { 
    console.log("Constructor home");
  }
  

  /* It will fetch all the blog detail from blog.service.ts*/
  ngOnInit() {
    let servicename=this.blogService.getdata();// Service not required by application
    console.log(servicename);
    console.log("OnInit Home");
    this.blogHttpService.getAllBlogs().subscribe(
     data =>{
       console.log(data);
       if(data["status"]===200)
       {
       this.allBlogs= data["data"];
       }
       this.messages=data["message"];
       this.messages={};
       console.log(this.messages);
     },
     error =>{
       console.log("some error");
       console.log(error.errorMeassage);
     }
       
   )
     

   }
  
  ngOnDestroy(){
    console.log("home dist")
  }
  
}
