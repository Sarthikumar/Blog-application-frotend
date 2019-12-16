import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { BlogHttpService } from '../blog-http.service';
import {ActivatedRoute,Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr'
@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  public currentBlog;
  public possibleCategories=["Commedy","drama","action","technology"];
  constructor(public _route:ActivatedRoute,public router:Router,public blogHttpSevice:BlogHttpService,public toatsr:ToastsManager,vcr:ViewContainerRef) { 
    this.toatsr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    let myBlogId=this._route.snapshot.paramMap.get('blogId');
    console.log(myBlogId);
    this.blogHttpSevice.getSingleBlogInformation(myBlogId).subscribe(
      data=>{
        console.log(data);
        this.currentBlog=data["data"],
        console.log("current blog"+this.currentBlog)
      },
      error =>{
        console.log("Some error");
        console.log(error.errorMessage);

      }
    )
  }
  public editThisBlog(): any{
    this.blogHttpSevice.editBlog(this.currentBlog.blogId,this.currentBlog).subscribe(
      data=>{
        console.log("blog created");
        console.log(data);
        this.toatsr.success("Blog Created succesfully",'Success');
        setTimeout(()=>{
          this.router.navigate(['/blog',this.currentBlog.blogId]);
        },1000)
      },
      error =>{
        this.toatsr.error("somme error",'Error');
        console.log(error.errorMessage);
      }

    )
  }

}
