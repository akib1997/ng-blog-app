import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExceptionComponent } from './exception.component';
import { ExceptionRoutingModule } from './exception-routing.module';



@NgModule({
  declarations: [
    ExceptionComponent
  ],
  imports: [
    CommonModule,
    ExceptionRoutingModule
  ]
})
export class ExceptionModule { }
