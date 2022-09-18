import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, BrowserModule, RouterModule],
  exports: [HeaderComponent, CommonModule, BrowserModule, RouterModule],
})
export class SharedModule {}
