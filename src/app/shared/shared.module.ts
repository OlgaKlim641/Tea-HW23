import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TruncateTextPipe} from "./pipes/truncate-text.pipe";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    TruncateTextPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    TruncateTextPipe,
  ]
})
export class SharedModule { }
