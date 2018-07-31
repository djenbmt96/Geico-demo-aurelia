import { HttpClient } from 'aurelia-http-client';
import environment from "../../../aurelia_project/environments/prod";

let client = new HttpClient();

export class DeviceService {
  apiDomain = environment.apiDomain;

  add(deviceModel) {
    return client.post(this.apiDomain + 'add', deviceModel);
  }

  getCategory() {
    return client.get(this.apiDomain + 'get-category');
  }
}
