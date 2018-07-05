import { WebAPI } from "../../api/web-api";
import { inject,autoinject } from "aurelia-framework";
import { HomeService } from "./home.service";
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from 'aurelia-validation';
import {BootstrapFormRenderer} from '../bootstrap-form-renderer';


// @inject(HomeService,WebAPI,ValidationControllerFactory)
@autoinject
export class Home {
  
  items;
  selectedItems: any[] = [];
  email='';
  controller = null;
  inform=0;

  currentPage=1;
  pageSize=5;
  totalItems=50;
  pageSizes=[10, 25, 50, 100];

  constructor(
    private homeService:HomeService,
    private api:WebAPI,
    private controllerFactory:ValidationControllerFactory
  ){
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());

  }


  created(){
    this.homeService.GetList().then(res=>{
      this.items=JSON.parse(res.response);
    })
  }

  submit(){
    this.controller.validate().then((data)=>{
      if(data.valid) {
        let param={};
        param['email']=this.email;
        param['items']=this.selectedItems;
        this.homeService.SendEmail(param)
        .then(res=>{
          console.log(JSON.parse(res.response));
          if(JSON.parse(res.response).message){
            this.inform=-1;
          } else {
            this.items=JSON.parse(res.response)
            this.inform=1;
          }
        })
      }
    })
  }
}
ValidationRules
  .ensure((a:any) => a.email).required().email()
  .on(Home);
