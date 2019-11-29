import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.page.html',
  styleUrls: ['./add-playlist.page.scss'],
})
export class AddPlaylistPage implements OnInit {

  constructor(
    private modalController: ModalController,
    public alertController: AlertController) { }

  playlist = JSON.parse(window.localStorage.getItem('playlists'));
  titulos = JSON.parse(window.localStorage.getItem('titulos'));

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async createPlaylist() {
    const alert = await this.alertController.create({
      animated: true,
      cssClass: 'alertPlaylist',
      inputs: [
        {
          name: 'namePlaylist',
          type: 'text',
          placeholder: 'Digite um nome para sua playlist...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            alert.dismiss();
          }
        }, {
          text: 'Criar',
          handler: data => {
            const folder = new Array();
            for (let x = 0; x <= (this.titulos.length) - 1; x++) {
              folder[x] = 'x';
            }
            const nameSongAddPlaylist = JSON.parse(window.localStorage.getItem('songAddPlaylist'));
            folder[this.titulos.indexOf(nameSongAddPlaylist)] = 'gravada';
            window.localStorage.setItem(data.namePlaylist, JSON.stringify(folder));
            if (JSON.parse(window.localStorage.getItem('playlists')) == undefined) {
              window.localStorage.setItem('playlists', JSON.stringify([data.namePlaylist]));
            } else {
              const playlists = JSON.parse(window.localStorage.getItem('playlists'));
              playlists.push(data.namePlaylist);
              window.localStorage.setItem('playlists', JSON.stringify(playlists));
            }
            alert.dismiss();
            this.modalController.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  async addToPlaylist(namePlaylist) {
    const playlistLocalStorage = JSON.parse(window.localStorage.getItem(namePlaylist));
    const titleSongLocalStorage = JSON.parse(window.localStorage.getItem('songAddPlaylist'));
    const numberSongLocalStorage = this.titulos.indexOf(titleSongLocalStorage);
    playlistLocalStorage[numberSongLocalStorage] = 'gravada';
    window.localStorage.setItem(namePlaylist, JSON.stringify(playlistLocalStorage));
    this.modalController.dismiss();
  }

}
