import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ChartsModule } from './charts.module';

platformBrowserDynamic().bootstrapModule(ChartsModule)
  .catch(err => console.log(err));
