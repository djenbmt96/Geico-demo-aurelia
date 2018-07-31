import { inject, autoinject } from "aurelia-framework";
import { HomeService } from "./home.service";
import { Device } from "model/device-model";
import { Category } from "model/category-model";
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from 'aurelia-validation';
import { BootstrapFormRenderer } from '../bootstrap-form-renderer';

@autoinject
export class Home {

  items: Device[] = [];
  categories: Category[] = [];
  selectedItems: Device[] = [];
  email = '';
  controller = null;
  inform = 0;
  selectedItem: Device;
  interval: any;
  init = true;

  constructor(
    private homeService: HomeService,
    private controllerFactory: ValidationControllerFactory
  ) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());

  }

  created() {
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 1000);
  }


  refreshData() {
    this.homeService.getList().then(res => {
      this.items = JSON.parse(res.response);
      if (this.init) {
        this.items.forEach(e => {
          e.email = false;
        });
        this.homeService.saveAll(this.items).then(res => {
          this.items = JSON.parse(res.response);
        })
        this.init = false;
      }
    });
    this.homeService.getCategory().then(res => {
      this.categories = JSON.parse(res.response);
    })
  }

  onChange() {
    this.homeService.saveAll(this.items).then(res => {
      this.items = JSON.parse(res.response);
    })
  }

  submit() {
    this.controller.validate().then((data) => {
      if (data.valid) {
        this.selectedItems = [];
        this.items.forEach(e => {
          if (e.email) {
            this.selectedItems.push(e);
          }
        });
        if (this.selectedItems.length !== 0) {
          let param = {};
          param['email'] = this.email;
          param['items'] = this.selectedItems;
          this.homeService.sendEmail(param)
            .then(res => {
              if (JSON.parse(res.response).message) {
                this.inform = -1;
              } else {
                this.items = JSON.parse(res.response)
                this.inform = 1;
              }
            })
        } else {
          alert("Please choose at least 1 item to send email!");
        }
      }
    })
  }

  changeEditItem(param) {
    this.inform = 0;
    this.selectedItem = param;
  }

  edit() {
    this.homeService.edit(this.selectedItem).then(res => {
      if (res.response) {
        this.inform = 2;
      }
      this.items = JSON.parse(res.response);
    })
  }

  delete(id) {
    let result = confirm('Do you want to delete?');
    if (result) {
      var param = {};
      param['id'] = id;
      this.homeService.delete(param).then(res => {
        if (res.response) {
          this.items = JSON.parse(res.response);
        }
      })
    }
  }

  getCategoryName(cats, categoryId) {
    cats.forEach(e => {
      if (e.id == categoryId) return e.Name;
      else return "";
    });
  }
}
ValidationRules
  .ensure((a: any) => a.email).required().email()
  .on(Home)
