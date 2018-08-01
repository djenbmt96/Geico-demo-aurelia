import { inject, autoinject } from "aurelia-framework";
import { HardwareService } from "services/hardware-service/hardware-service";
import { CategoryService } from "services/category-service/category-service";
import { HardWare } from "model/hardware-model";
import { Category } from "model/category-model";
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from 'aurelia-validation';
import { BootstrapFormRenderer } from 'resources/elements/bootstrap-form-renderer';

@autoinject
export class Home {

  items: HardWare[] = [];
  categories: Category[] = [];
  selectedItems: HardWare[] = [];
  email = '';
  controller = null;
  inform = 0;
  selectedItem: HardWare;
  interval: any;
  init = true;

  constructor(
    private hardwareService: HardwareService,
    private categoryService: CategoryService,
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
    this.hardwareService.getList().then(res => {
      this.items = res;
      if (this.init) {
        this.items.forEach(e => {
          e.email = false;
        });
        this.hardwareService.saveAll(this.items).then(res => {
          this.items = res;
        })
        this.init = false;
      }
    });
    this.categoryService.getCategory().then(res => {
      this.categories = res;
    })
  }

  onCheckEmail() {
    this.hardwareService.saveAll(this.items).then(res => {
      this.items = res;
    })
  }

  sendEmail() {
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
          this.hardwareService.sendEmail(param)
            .then(res => {
              if (res.message) {
                this.inform = -1;
              } else {
                this.items = res;
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

  submitEdit() {
    this.hardwareService.edit(this.selectedItem).then(res => {
      if (res) {
        this.inform = 2;
      }
      this.items = res;
    })
  }

  delete(id) {
    let result = confirm('Do you want to delete?');
    if (result) {
      var param = {};
      param['id'] = id;
      this.hardwareService.delete(param).then(res => {
        if (res) {
          this.items = res;
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
