import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})

export class IntroPage {

  constructor(
    public NavCtrl: NavController,
    public MdCtrl: ModalController
    ) { }

  async close() {
    window.localStorage.setItem('intropage', 'mostrou');
    this.MdCtrl.dismiss();
  }

  async disableAvancar() {
    document.getElementById('avancarButton').classList.add('disable');
    document.getElementById('avancarButton').classList.remove('active');
  }

  async ableAvancar() {
    document.getElementById('avancarButton').classList.add('active');
    document.getElementById('avancarButton').classList.remove('disable');
  }
}
