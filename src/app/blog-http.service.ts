import { Injectable } from '@angular/core';

import {HttpClient,HttpErrorResponse} from '@angular/common/http'
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
@Injectable()
export class BlogHttpService {
  public allBlogs;
  public currentBlog;
  public baseUrl ='https://blogapp.edwisor.com/api/v1/blogs';
  public myToke='NmRmMzQ2NzNhN2JkZWYwYzkxNTkyODNjYzI2ZjJkYmEwYzQ0NGVjMjk0MTE0YWE1NjU5YmRiNjk5YTMyZGFiY2ZlMGY3NGE3M2RiMGZlYjkwYTk2MDA1OWVmZTliNmI3NzRhZTc5MzE1M2JiMDM2OWVkNWYwMzljZGIxZDgzMTJhZg==';

  constructor(private _http:HttpClient) { 
    console.log("Blog http is called");
  }
  private handleError(err: HttpErrorResponse)
  {
    console.log("handel error");
    console.log(err.message);
    return Observable.throw(err.message);
  }
  /*It will return allBlogs to the componet home,blog */
  public getAllBlogs():any{
    let myResposne =this._http.get(this.baseUrl+'/all?authToken='+this.myToke);
    console.log(myResposne);
    return myResposne;
    
  }
  /*It will return singleblog information */
  public getSingleBlogInformation(currentBlogId): any{
    let myResposne=this._http.get(this.baseUrl + '/view' + '/'+currentBlogId+'?authToken='+ this.myToke);
    return myResposne;
  }
  public createBlog(blogData): any {
    let myResposne=this._http.post(this.baseUrl +'/create' + '?authToken='+this.myToke,blogData);
    return myResposne;
  }
  public deleteBlog(blogId): any{

    let data={};
    
    console.log("Deleted");
    let myResposne=this._http.post(this.baseUrl +'/'+blogId+'/delete'+'?authToken='+this.myToke,data);
    console.log(myResposne)
    console.log(data);
    return myResposne;

  }
  public editBlog(blogId,blogData): any {
    console.log("Enter in edit"+blogData);
    console.log(blogId);
    let myResposne=this._http.put(this.baseUrl+'/'+blogId+'/edit'+'?authToken='+this.myToke,blogData);
    return myResposne;
  }
 
}
