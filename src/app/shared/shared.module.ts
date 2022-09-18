import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatrialModule } from './matrial/matrial.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, BrowserModule, RouterModule, MatrialModule],
  exports: [
    HeaderComponent,
    CommonModule,
    BrowserModule,
    RouterModule,
    MatrialModule,
  ],
})
export class SharedModule {}
