import environment from "../../../aurelia_project/environments/prod";
import { HttpClient } from "aurelia-http-client";

let client = new HttpClient();
export class CategoryService {
  constructor() { }

  apiDomain = environment.apiDomain;

  getCategory() {
    return client.get(this.apiDomain + 'get-category').then(res => {
      return JSON.parse(res.response);
    })
  }
}
