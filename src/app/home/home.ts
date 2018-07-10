import { inject,autoinject } from "aurelia-framework";
import { HomeService } from "./home.service";
import { Device } from "../../model/device";
import { Category } from "../../model/category";
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from 'aurelia-validation';
import {BootstrapFormRenderer} from '../bootstrap-form-renderer';

@autoinject
export class Home {
  
  items:Device[]=[];
  categories: Category[]=[];
  selectedItems: Device[] = [];
  email='';
  controller = null;
  inform=0;
  selectedItem:Device;

  constructor(
    private homeService:HomeService,
    private controllerFactory:ValidationControllerFactory
  ){
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());

  }

  created(){
    this.homeService.GetList().then(res=>{
      this.items=JSON.parse(res.response);
    });
    this.homeService.GetCategory().then(res=>{
      this.categories=JSON.parse(res.response);
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

  changeEditItem(param){
    this.inform=0;
    this.selectedItem=param;
  }

  edit(){
    this.homeService.Edit(this.selectedItem).then(res=>{
      if(res.response){
        this.inform=2;
      }
      this.items=JSON.parse(res.response);
    })
  }

  delete(id){
    let result = confirm('Do you want to delete?');
    if(result){
      var param={};
      param['id']=id;
      this.homeService.Delete(param).then(res=>{
        if(res.response){
          this.items=JSON.parse(res.response);
        }
      })
    }
  }

  getCategoryName(cats,categoryId)
  {
    cats.forEach(e => {
        if (e.id == categoryId) return e.Name;
        else return "";
      });
  }
}
ValidationRules
  .ensure((a:any) => a.email).required().email()
  .on(Home)
