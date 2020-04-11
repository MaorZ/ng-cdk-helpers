import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CdkPopoverDirective } from './directives/cdk-popover.directive';

@NgModule({
  declarations: [
    AppComponent,
    CdkPopoverDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
