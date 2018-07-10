import {HttpClient} from 'aurelia-http-client';
import environment from "../../../aurelia_project/environments/prod";

let client = new HttpClient();

export class DeviceService{
  apiDomain=environment.apiDomain;

  Add(deviceModel){
    return client.post(this.apiDomain+'add', deviceModel);
  }


  GetCategory(){
    return client.get(this.apiDomain+'get-category');
  }
}
