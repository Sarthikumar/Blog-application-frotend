import { Component, OnInit, OnDestroy ,ViewContainerRef} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { BlogService } from '../blog.service';
import { BlogHttpService } from '../blog-http.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr'
import {Location} from '@angular/common';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
  providers: [Location]
})
export class BlogViewComponent implements OnInit,OnDestroy {
   public currentBlog;
   public message;
  constructor(private _route:ActivatedRoute,private router:Router,public blogservice:BlogService,public blogHttpService:BlogHttpService,public toatsr:ToastsManager,vcr:ViewContainerRef,public location:Location) { 
    this.toatsr.setRootViewContainerRef(vcr);


  }
  /* This will fetch the detail of single block from routing */
  ngOnInit() {
    console.log("OnInitblog");
    let myBlogId= this._route.snapshot.paramMap.get('blogId');
    
    console.log(myBlogId);
    console.log(this.blogservice.getdata());
    this.blogHttpService.getSingleBlogInformation(myBlogId).subscribe(
        data =>{
          console.log(data["data"]);
          this.currentBlog=data["data"];
          console.log("This the value");
          console.log(this.currentBlog["title"]);
          this.message=data["message"]
          this.toatsr.success(this.message,'Success');
        },
        error =>{
          console.log("somme error in blog");
          console.log(error.errorMessage);
        }
    )
  }
  ngOnDestroy(){
    console.log("blog de");
  }
  public deleteThisBlog(): any{
    this.blogHttpService.deleteBlog(this.currentBlog["blogId"]).subscribe(
      data=>{
        console.log("blog deletd");
        console.log(data);
        this.toatsr.success("Blog deleted succesfully",'Success');
        setTimeout(()=>{
          this.router.navigate(['/about']);
        },2000)
      },
      error =>{
        this.toatsr.error("somme error deleted",'Error');
        console.log(error.errorMessage);
      }
    )
      
  }
  public goBackToPreviousPage(){
    this.location.back();
  }

}
