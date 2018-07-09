import { Device } from "../../model/device";
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from 'aurelia-validation';
import {BootstrapFormRenderer} from '../bootstrap-form-renderer';
import { autoinject } from "aurelia-framework";
import { DeviceService } from "./device.service";
import {Router} from 'aurelia-router';

@autoinject
export class AddDevice{
  controller=null;
  name:string;
  description:string;
  useDate:number;

  constructor(
    private router:Router,
    private deviceService:DeviceService,
    private controllerFactory:ValidationControllerFactory
  ){
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  submit(){
    this.controller.validate().then(data=>{
      if(data.valid){
        var device={};
        device['name']=this.name;
        device['description']=this.description;
        device['useDate']=this.useDate;
        this.deviceService.Add(device).then(res=>{
          console.log(JSON.parse(res.response));
          if(JSON.parse(res.response).message==='success'){
            this.router.navigate('/');
          }
        })
      }
    })
  }
}
ValidationRules
  .ensure((a:any) => a.name).required()
  .ensure((a:any) => a.description).required()
  .ensure((a:any) => a.useDate).required()
  .on(AddDevice)
