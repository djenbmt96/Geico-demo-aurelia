import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import {inject} from 'aurelia-framework';
import {HomeService} from './app/home/home.service';

@inject(HomeService)
export class App {
  message = 'Hello World!';
  constructor(public api:HomeService){}
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Geico';
    config.map([
      {
        route: '',
        moduleId: PLATFORM.moduleName('./app/home/home'),
        title: 'Home'
      },
      {
        route: 'add',
        moduleId: PLATFORM.moduleName('./app/devices/add-device'),
        name: 'add'
      }
    ]);

    this.router = router;
  }
}
