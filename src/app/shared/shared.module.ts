import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailToNamePipe } from './pipes/email-to-name.pipe';



@NgModule({
  declarations: [EmailToNamePipe],
  imports: [
    CommonModule
  ],
  exports: [EmailToNamePipe]
})
export class SharedModule { }
