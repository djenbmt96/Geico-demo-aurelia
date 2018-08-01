import {
  ValidationControllerFactory,
  ValidationRules
} from 'aurelia-validation';
import { BootstrapFormRenderer } from 'resources/elements/bootstrap-form-renderer';
import { autoinject } from "aurelia-framework";
import { HardwareService } from "services/hardware-service/hardware-service";
import { CategoryService } from "services/category-service/category-service";
import { Router } from 'aurelia-router';
import { Category } from "model/category-model";

@autoinject
export class AddDevice {
  categories: Category[] = [];
  controller = null;
  name: string;
  description: string;
  useDate: number;
  categoryId: number;

  constructor(
    private router: Router,
    private hardwareService: HardwareService,
    private categoryService: CategoryService,
    private controllerFactory: ValidationControllerFactory
  ) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  created() {
    this.categoryService.getCategory().then(res => {
      this.categories = res;
    })
  }

  submit() {
    this.controller.validate().then(data => {
      if (data.valid) {
        var hardware = {};
        hardware['name'] = this.name;
        hardware['description'] = this.description;
        hardware['useDate'] = this.useDate;
        hardware['categoryid'] = this.categoryId;
        this.hardwareService.add(hardware).then(res => {
          if (res.message === 'success') {
            this.router.navigate('/');
          }
        })
      }
    })
  }
}
ValidationRules
  .ensure((a: any) => a.name).required()
  .ensure((a: any) => a.description).required()
  .ensure((a: any) => a.useDate).required()
  .on(AddDevice)
