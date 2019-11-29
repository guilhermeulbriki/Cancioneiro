import { GravarSongs } from './../gravarSongs';
import { NewSongs } from './../new-songs';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { IntroPage } from '../intro/intro.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page, IntroPage],
  providers: [NewSongs, GravarSongs],
  entryComponents: [IntroPage]
})
export class Tab2PageModule {}
