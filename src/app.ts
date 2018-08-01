import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { inject } from 'aurelia-framework';
import { HardwareService } from 'services/hardware-service/hardware-service';

@inject(HardwareService)
export class App {
  message = 'Hello World!';
  constructor(public api: HardwareService) { }
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Geico';
    config.map([
      {
        route: '',
        moduleId: PLATFORM.moduleName('./pages/home/home'),
        title: 'Home'
      },
      {
        route: 'add',
        moduleId: PLATFORM.moduleName('./pages/hardware/add/add-hardware'),
        name: 'add'
      }
    ]);

    this.router = router;
  }
}
