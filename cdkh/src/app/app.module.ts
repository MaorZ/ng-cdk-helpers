import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CdkPopoverDirective } from './directives/cdk-popover.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [AppComponent, CdkPopoverDirective],
  imports: [BrowserModule, OverlayModule, ColorPickerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
