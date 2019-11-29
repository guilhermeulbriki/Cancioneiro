import { Component } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { AddPlaylistPage } from '../add-playlist/add-playlist.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  favoritas = new Array();
  titulosFavoritas = new Array();

  constructor(
    public toastController: ToastController,
    public modalController: ModalController) { }

  ionViewWillEnter() {
    const favoritas = new Array();
    this.titulosFavoritas = new Array();
    const favoritar = JSON.parse(window.localStorage.getItem('favoritas'));
    for (let y = 0; y <= favoritar.length; y++) {
      if (favoritar[y] === 'favoritada') {
        favoritas.push(y);
      }
    }
    const titulos = JSON.parse(window.localStorage.getItem('titulos'));
    for (let x = 0; x <= (favoritas.length) - 1; x++) {
      this.titulosFavoritas.push(titulos[favoritas[x]]);
    }
    this.favoritas = this.titulosFavoritas;
  }

  async presentToastLiked() {
    const toast = await this.toastController.create({
      message: 'Adicionada as favoritas',
      position: 'bottom',
      duration: 1500
    });
    toast.present();
  }

  async FiltrarMusicas(digito) {
    const value = (digito.target.value).toLowerCase();
    const newTitles = new Array();
    for (let x = 0; x <= this.titulosFavoritas.length; x++) {
      if (this.titulosFavoritas[x] !== undefined) {
        if (((this.titulosFavoritas[x]).toLocaleLowerCase()).indexOf(value) > -1) {
          newTitles.push(this.titulosFavoritas[x]);
        }
      }
    }
    this.favoritas = newTitles;
  }

  async Listar(tituloMusica: string) {
    const titulos = JSON.parse(window.localStorage.getItem('titulos'));
    let numero: any;
    for (let x = 0; x <= titulos.length; x++) {
      if (titulos[x] === tituloMusica) {
        numero = x;
      }
    }
    window.localStorage.setItem('MusicaListada', JSON.stringify(numero));
    window.location.href = 'tabs/listar';
  }

  async AdicionarNaPlaylist(tituloMusica: any) {
    const modal = await this.modalController.create({
      component: AddPlaylistPage
    });
    modal.present();
    window.localStorage.setItem('songAddPlaylist', JSON.stringify(tituloMusica));
  }

  AcharCasaDoTitulo(numero: any) {
    window.localStorage.setItem('MusicaListada', JSON.stringify(numero));
    window.location.href = 'tabs/tab1/listar';
  }

  async Remover(tituloMusica) {
    const titulos = JSON.parse(window.localStorage.getItem('titulos'));
    const numero = titulos.indexOf(tituloMusica);
    const favoritas: any = JSON.parse(window.localStorage.getItem('favoritas'));
    favoritas[numero] = 'x';
    window.localStorage.setItem('favoritas', JSON.stringify(favoritas));
    const num = this.titulosFavoritas.indexOf(tituloMusica);
    this.titulosFavoritas.splice(num, 1);
    this.favoritas = this.titulosFavoritas;
    const toast = await this.toastController.create({
      message: 'Removida das favoritas',
      position: 'top',
      duration: 1500
    });
    toast.present();
  }
}
