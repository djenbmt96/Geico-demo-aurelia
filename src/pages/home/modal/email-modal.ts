import { DialogController } from "aurelia-dialog";
import {
  ValidationControllerFactory,
  ValidationRules
} from 'aurelia-validation';
import { BootstrapFormRenderer } from 'resources/elements/bootstrap-form-renderer';
import { autoinject } from 'aurelia-framework';

@autoinject
export class EmailModal {
  email = '';
  controller = null;
  constructor(
    private dialogController: DialogController,
    private controllerFactory: ValidationControllerFactory
  ) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  activate() {}

  send() {
    this.controller.validate().then(data => {
      if (data.valid) {
        this.dialogController.ok(this.email);
      }
    })
  }
}

ValidationRules
  .ensure((a: any) => a.email).required().email()
  .on(EmailModal)
