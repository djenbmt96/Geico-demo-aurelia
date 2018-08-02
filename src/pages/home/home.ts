import { autoinject } from "aurelia-framework";
import { HardwareService } from "services/hardware-service/hardware-service";
import { CategoryService } from "services/category-service/category-service";
import { HardWare } from "model/hardware-model";
import { Category } from "model/category-model";
import { DialogService } from 'aurelia-dialog';
import { EmailModal } from "./modal/email-modal";
import { EditModal } from "./modal/edit-modal";
import * as toastr from 'toastr';

@autoinject
export class Home {

  items: HardWare[] = [];
  categories: Category[] = [];
  selectedItems: HardWare[] = [];
  email = '';
  selectedItem: HardWare;
  interval: any;
  init = true;

  currentPage = 1;
  pageSize = 10;
  pageSizes = [10, 20, 50, 100];
  totalItems = 100;

  constructor(
    private dialogService: DialogService,
    private hardwareService: HardwareService,
    private categoryService: CategoryService,
  ) { }

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

  openEmailModal() {
    this.selectedItems = [];
    this.items.forEach(e => {
      if (e.email) {
        this.selectedItems.push(e);
      }
    });
    this.dialogService.open({ viewModel: EmailModal, model: this.selectedItems, lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        this.email = response.output;
        this.sendEmail();
      } else { }
    });
  }

  sendEmail() {
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
      console.log(param);
      this.hardwareService.sendEmail(param)
        .then(res => {
          if (res.message) {
            toastr.error("Fail! Email was not sent.");
          } else {
            this.items = res;
            toastr.success("Email has sent successfully!");
          }
        })
    } else {
      toastr.error("Fail! Please choose at least 1 item to send email.");
    }
  }

  changeEditItem(param: HardWare) {
    this.dialogService.open({ viewModel: EditModal, model: param, lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        this.selectedItem = response.output;
        this.submitEdit();
      } else { }
    });
  }

  submitEdit() {
    this.hardwareService.edit(this.selectedItem).then(res => {
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
