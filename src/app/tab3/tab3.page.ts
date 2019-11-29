import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FolderPage } from '../folder/folder.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  playlists = new Array();

  ionViewWillEnter() {
    this.playlists = JSON.parse(window.localStorage.getItem('playlists'));
  }

  constructor(
    public modalController: ModalController,
    public alertController: AlertController
  ) { }

  async OpenPlaylist(tituloPlaylist: string) {
    const telaListaMusicas = await this.modalController.create({
      component: FolderPage
    });
    window.localStorage.setItem('openFolder', JSON.stringify(tituloPlaylist));
    telaListaMusicas.present();
  }

  async DeletePlaylist(numero, titulo) {
    const confimarDelete = await this.alertController.create({
      message: 'Você tem certeza que deseja excluir a playlist <strong>' + titulo + '</strong>?',
      animated: true,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            confimarDelete.dismiss();
          }
        }, {
          text: 'Ok',
          handler: () => {
            if (window.localStorage.getItem('playlists')) {
              let playlist = JSON.parse(window.localStorage.getItem('playlists'));
              if ((playlist.length) > 1) {
                playlist.splice(numero, 1);
                window.localStorage.setItem('playlists', JSON.stringify(playlist));
              } else {
                playlist = new Array();
                window.localStorage.removeItem('playlists');
              }
              window.localStorage.removeItem(titulo);
              this.playlists = playlist;
            } else {
              this.playlists = [];
            }
          }
        }
      ]
    });
    confimarDelete.present();
  }
}
