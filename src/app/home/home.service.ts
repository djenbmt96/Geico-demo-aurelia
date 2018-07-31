import {HttpClient} from 'aurelia-http-client';
import environment from "../../../aurelia_project/environments/prod";

let client = new HttpClient();

export class HomeService{
  apiDomain=environment.apiDomain;
  isRequesting=false;

  sendEmail(param){
    this.isRequesting=true;
    return client.post(this.apiDomain, param).then(res=>{
      this.isRequesting=false;
      return res;
    })
  }

  getList(){
    this.isRequesting=true;
    return client.get(this.apiDomain).then(res=>{
      this.isRequesting=false;
      return res;
    });
  }

  edit(param){
    this.isRequesting=true;
    return client.post(this.apiDomain+'edit',param).then(res=>{
      this.isRequesting=false;
      return res;
    });
  }

  delete(param){
    this.isRequesting=true;
    return client.post(this.apiDomain+'delete',param).then(res=>{
      this.isRequesting=false;
      return res;
    });
  }

  getCategory(){
    this.isRequesting=true;
    return client.get(this.apiDomain+'get-category').then(res=>{
      this.isRequesting=false;
      return res;
    });
  }

  saveAll(param){
    this.isRequesting=true;
    return client.post(this.apiDomain+'save-all',param).then(res=>{
      this.isRequesting=false;
      return res;
    });
  }
}
