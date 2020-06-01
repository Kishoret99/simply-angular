import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  AppComponent,
  AccordionComponent,
  AccordionItemDirective,
  AccordionButtonComponent,
  AccordionContentComponent
} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AccordionComponent,
    AccordionItemDirective,
    AccordionButtonComponent,
    AccordionContentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
