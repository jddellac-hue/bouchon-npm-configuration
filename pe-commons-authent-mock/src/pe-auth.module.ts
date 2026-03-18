import { NgModule, ModuleWithProviders } from '@angular/core';
import { PeAuthComponent } from './pe-auth.component';
import { PeAuthOptions } from './pe-auth-options';

@NgModule({
  declarations: [PeAuthComponent],
  exports: [PeAuthComponent],
})
export class PeAuthModule {
  static forRoot(_options: PeAuthOptions): ModuleWithProviders<PeAuthModule> {
    return { ngModule: PeAuthModule, providers: [] };
  }
}
