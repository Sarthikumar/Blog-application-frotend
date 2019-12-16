import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { BlogHttpService } from '../blog-http.service';
import {ActivatedRoute,Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr'

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

  constructor(public blogHttpService:BlogHttpService,public _router:ActivatedRoute,public router:Router,public toatsr:ToastsManager,vcr:ViewContainerRef) {
    this.toatsr.setRootViewContainerRef(vcr);
  }
  public blogTitle:string;
  public blogBodyHtml:string;
  public blogDescription:string;
  public blogcategory:string;
  public possibleCategories=["Commedy","drama","action","technology"];


  ngOnInit() {
  }
  public createBlog():any {
    let blogData={
      title:this.blogTitle,
      description:this.blogDescription,
      blogBody:this.blogBodyHtml,
      category:this.blogcategory
    }
    console.log(blogData);
    this.blogHttpService.createBlog(blogData).subscribe(
      data=>{
        console.log("blog created");
        console.log(data);
        this.toatsr.success("Blog Created succesfully",'Success');
        setTimeout(()=>{
          this.router.navigate(['/blog',data.data.blogId]);
        },1000)
      },
      error =>{
        this.toatsr.error("somme error",'Error');
        console.log(error.errorMessage);
      }
    )
  }
}
