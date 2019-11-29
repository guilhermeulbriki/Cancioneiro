import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  titulos = JSON.parse(window.localStorage.getItem('titulos'));
  titleFolder = JSON.parse(window.localStorage.getItem('openFolder'));
  titleSongs = new Array();
  allTitleSongs = new Array();
  folderLocalStorage = JSON.parse(window.localStorage.getItem(this.titleFolder));

  ngOnInit() { }

  ionViewWillEnter() {
    const selectSongGravada = new Array();
    for (let count = 0; count <= this.folderLocalStorage.length; count++) {
      if (this.folderLocalStorage[count] === 'gravada') {
        selectSongGravada.push(count);
      }
    }
    const titleSongGravada = new Array();
    for (let count = 0; count <= (selectSongGravada.length) - 1; count++) {
      titleSongGravada.push(this.titulos[selectSongGravada[count]]);
    }
    this.titleSongs = titleSongGravada;
    this.allTitleSongs = titleSongGravada;
  }

  async selecionarMusicasDaPasta() {
    const selectSongGravada = new Array();
    for (let count = 0; count <= this.folderLocalStorage.length; count++) {
      if (this.folderLocalStorage[count] === 'gravada') {
        selectSongGravada.push(count);
      }
    }
    const titleSongGravada = new Array();
    for (let count = 0; count <= (selectSongGravada.length) - 1; count++) {
      titleSongGravada.push(this.titulos[selectSongGravada[count]]);
    }
    this.allTitleSongs = titleSongGravada;
  }

  FiltrarMusicas(digito: any) {
    const letraDigitada = (digito.target.value).toLowerCase();
    this.selecionarMusicasDaPasta();
    const filtrarTitulos = new Array();
    console.log(filtrarTitulos);
    for (let x = 0; x <= this.allTitleSongs.length; x++) {
      if (this.allTitleSongs[x] !== undefined) {
        if (((this.allTitleSongs[x]).toLocaleLowerCase()).indexOf(letraDigitada) > -1) {
          filtrarTitulos.push(this.allTitleSongs[x]);
        }
      }
    }
    this.titleSongs = filtrarTitulos;
    console.log(filtrarTitulos);
    console.log('-----------');
  }

  async listar(title: any) {
    let numero: any;
    for (let x = 0; x <= this.titulos.length; x++) {
      if (this.titulos[x] === title) {
        numero = x;
      }
    }
    window.localStorage.setItem('MusicaListada', JSON.stringify(numero));
    window.location.href = 'tabs/listar';
  }

  async Back() {
    this.modalController.dismiss();
  }

  async deletaMusicaPlaylist(title) {
    const numberMusicaPlaylist = this.titleSongs.indexOf(title);
    this.titleSongs.splice(numberMusicaPlaylist, 1);
    const numberMusicaAllTitles = this.titulos.indexOf(title);
    this.folderLocalStorage[numberMusicaAllTitles] = 'x';
    window.localStorage.setItem(this.titleFolder, JSON.stringify(this.folderLocalStorage));
    const toast = await this.toastController.create({
      message: 'Removida da Playlist',
      position: 'bottom',
      duration: 1500
    });
    toast.present();
  }
}
