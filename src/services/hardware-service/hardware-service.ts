import { HttpClient } from 'aurelia-http-client';
import environment from "../../../aurelia_project/environments/prod";

let client = new HttpClient();

export class HardwareService {
  apiDomain = environment.apiDomain;
  isRequesting = false;

  sendEmail(param) {
    this.isRequesting = true;
    return client.post(this.apiDomain, param).then(res => {
      this.isRequesting = false;
      return JSON.parse(res.response);
    })
  }

  getList() {
    this.isRequesting = true;
    return client.get(this.apiDomain).then(res => {
      this.isRequesting = false;
      return JSON.parse(res.response);
    });
  }

  edit(param) {
    this.isRequesting = true;
    return client.post(this.apiDomain + 'edit', param).then(res => {
      this.isRequesting = false;
      return JSON.parse(res.response);
    });
  }

  delete(param) {
    this.isRequesting = true;
    return client.post(this.apiDomain + 'delete', param).then(res => {
      this.isRequesting = false;
      return JSON.parse(res.response);
    });
  }

  saveAll(param) {
    this.isRequesting = true;
    return client.post(this.apiDomain + 'save-all', param).then(res => {
      this.isRequesting = false;
      return JSON.parse(res.response);
    });
  }

  add(hardware) {
    return client.post(this.apiDomain + 'add', hardware).then(res => {
      return JSON.parse(res.response);
    })
  }
}
