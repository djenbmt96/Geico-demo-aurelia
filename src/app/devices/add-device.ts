import { Device } from "model/device-model";
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from 'aurelia-validation';
import { BootstrapFormRenderer } from '../bootstrap-form-renderer';
import { autoinject } from "aurelia-framework";
import { DeviceService } from "./device.service";
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
    private deviceService: DeviceService,
    private controllerFactory: ValidationControllerFactory
  ) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  created() {
    this.deviceService.getCategory().then(res => {
      this.categories = JSON.parse(res.response);
    })
  }

  submit() {
    this.controller.validate().then(data => {
      if (data.valid) {
        var device = {};
        device['name'] = this.name;
        device['description'] = this.description;
        device['useDate'] = this.useDate;
        device['categoryid'] = this.categoryId;
        this.deviceService.add(device).then(res => {
          console.log(JSON.parse(res.response));
          if (JSON.parse(res.response).message === 'success') {
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
