import { CategoryService } from 'services/category-service/category-service';
import { HardWare } from 'model/hardware-model';
import { DialogController } from "aurelia-dialog";
import {
  ValidationControllerFactory,
  ValidationRules
} from 'aurelia-validation';
import { BootstrapFormRenderer } from 'resources/elements/bootstrap-form-renderer';
import { autoinject } from 'aurelia-framework';
import { Category } from 'model/category-model';

@autoinject
export class EditModal {
  controller = null;
  item: HardWare;
  categories: Category[] = [];
  name = '';
  description = '';
  useDate = 0;
  category = 0;
  constructor(
    private dialogController: DialogController,
    private controllerFactory: ValidationControllerFactory,
    private categoryService: CategoryService
  ) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  activate(item: HardWare) {
    this.item = item;
    this.name = item.name;
    this.description = item.description;
    this.useDate = item.useDate;
    this.category = item.categoryid;
    this.categoryService.getCategory().then(res => {
      this.categories = res;
    })
  }

  send() {
    this.controller.validate().then(data=>{
      if(data.valid){
        this.item.name = this.name;
        this.item.useDate = this.useDate;
        this.item.description = this.description;
        this.item.categoryid = this.category;
        this.dialogController.ok(this.item);
      }
    })
  }
}

ValidationRules
  .ensure((a: any) => a.name).required()
  .ensure((a: any) => a.useDate).required()
  .ensure((a: any) => a.description).required()
  .on(EditModal)
