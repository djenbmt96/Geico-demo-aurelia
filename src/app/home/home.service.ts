import {HttpClient} from 'aurelia-http-client';
import environment from "../../../aurelia_project/environments/prod";

let client = new HttpClient();

export class HomeService{
  apiDomain=environment.apiDomain;
  isRequesting=false;

  SendEmail(param){
    this.isRequesting=true;
    return client.post(this.apiDomain, param).then(res=>{
      this.isRequesting=false;
      return res;
    })
  }

  GetList(){
    this.isRequesting=true;
    return client.get(this.apiDomain).then(res=>{
      this.isRequesting=false;
      return res;
    });
  }

  Edit(param){
    this.isRequesting=true;
    return client.post(this.apiDomain+'edit',param).then(res=>{
      this.isRequesting=false;
      return res;
    });
  }

  Delete(param){
    this.isRequesting=true;
    return client.post(this.apiDomain+'delete',param).then(res=>{
      this.isRequesting=false;
      return res;
    });
  }

  GetCategory(){
    this.isRequesting=true;
    return client.get(this.apiDomain+'get-category').then(res=>{
      this.isRequesting=false;
      return res;
    });
  }
}
