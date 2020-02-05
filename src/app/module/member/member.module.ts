import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModuleModule } from '../../shared/shared-module.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    SharedModuleModule,
  ]
})
export class MemberModule { }
