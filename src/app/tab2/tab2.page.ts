import { NewSongs } from './../new-songs';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ToastController, ModalController, IonContent } from '@ionic/angular';
import { AddPlaylistPage } from '../add-playlist/add-playlist.page';
import { IntroPage } from '../intro/intro.page';
import { GravarSongs } from '../gravarSongs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  titulosGerais = new Array();
  titulosFiltrados = new Array();
  favoritasGerais = new Array();
  favoritasFiltradas = new Array();
  musicasLocalStorage = JSON.parse(window.localStorage.getItem('musicas'));
  titulosLocalStorage = JSON.parse(window.localStorage.getItem('titulos'));

  @ViewChild(IonContent) content: IonContent;

  constructor(
    public toastController: ToastController,
    public modalController: ModalController,
    public NovasMusicas: NewSongs,
    public Songs: GravarSongs
  ) { }

  ngOnInit() {
    if (window.localStorage.getItem('intropage') !== 'mostrou') {
      this.Songs.gravarLocalStorage();
      this.Songs.gravarMusicasLocalStorage();
      this.mostrarIntro();
    }
  }

  ionViewWillEnter() {
    this.titulosGerais = JSON.parse(window.localStorage.getItem('titulos'));
    this.updateMusicas();
    this.titulosGerais = JSON.parse(window.localStorage.getItem('titulos'));
    this.titulosFiltrados = JSON.parse(window.localStorage.getItem('titulos'));
    this.favoritasFiltradas = JSON.parse(window.localStorage.getItem('favoritas'));
    this.favoritasGerais = JSON.parse(window.localStorage.getItem('favoritas'));
    this.titulosLocalStorage = JSON.parse(window.localStorage.getItem('titulos'));
  }

  async AdicionarNaPlyalist(tituloDaMusica) {
    const tela = await this.modalController.create({
      component: AddPlaylistPage
    });
    tela.present();
    window.localStorage.setItem('songAddPlaylist', JSON.stringify(tituloDaMusica));
  }

  FiltrarMusicas(digito: any) {
    const letraDigitada = (digito.target.value).toLowerCase();
    const filtrarTitulos = new Array();
    this.favoritasFiltradas = new Array();
    for (let x = 0; x <= this.titulosLocalStorage.length; x++) {
      if (this.titulosLocalStorage[x] !== undefined) {
        if (((this.removerAcentos(this.titulosLocalStorage[x])).toLocaleLowerCase()).indexOf(letraDigitada) > -1) {
          filtrarTitulos.push(this.titulosLocalStorage[x]);
          if (this.favoritasGerais[x] === 'favoritada') {
            this.favoritasFiltradas.push('favoritada');
          } else {
            this.favoritasFiltradas.push('x');
          }
        }
      }
    }
    this.titulosFiltrados = filtrarTitulos;
  }

  removerAcentos(newStringComAcento) {
    var string = newStringComAcento;
    var mapaAcentosHex 	= {
      a : /[\xE0-\xE6]/g,
      A : /[\xC0-\xC6]/g,
      e : /[\xE8-\xEB]/g,
      E : /[\xC8-\xCB]/g,
      i : /[\xEC-\xEF]/g,
      I : /[\xCC-\xCF]/g,
      o : /[\xF2-\xF6]/g,
      O : /[\xD2-\xD6]/g,
      u : /[\xF9-\xFC]/g,
      U : /[\xD9-\xDC]/g,
      c : /\xE7/g,
      C : /\xC7/g,
      n : /\xF1/g,
      N : /\xD1/g,
    }  
    for ( var letra in mapaAcentosHex ) {
      var expressaoRegular = mapaAcentosHex[letra];
      string = string.replace( expressaoRegular, letra );
    } 
    console.log(string); 
    return string;
  }

  Listar(tituloDaMusica) {
    let numero: any;
    for (let x = 0; x <= this.titulosLocalStorage.length; x++) {
      if (this.titulosLocalStorage[x] === tituloDaMusica) {
        numero = x;
      }
    }
    window.localStorage.setItem('MusicaListada', JSON.stringify(numero));
    window.location.href = 'tabs/listar';
  }

  async FavoritarRemover(title: string) {
    const numeroDaMusicaNoGeral = this.titulosLocalStorage.indexOf(title);
    const numeroDaMusicaNasFiltradas = this.titulosFiltrados.indexOf(title);
    if (this.favoritasGerais[numeroDaMusicaNoGeral] !== 'favoritada') {
      this.favoritasGerais[numeroDaMusicaNoGeral] = 'favoritada';
      this.favoritasFiltradas[numeroDaMusicaNasFiltradas] = 'favoritada';
      const mensagemFavoritou = await this.toastController.create({
        message: 'Adicionada as favoritas',
        position: 'top',
        duration: 1500
      });
      mensagemFavoritou.present();
    } else {
      this.favoritasFiltradas[numeroDaMusicaNasFiltradas] = 'x';
      this.favoritasGerais[numeroDaMusicaNoGeral] = 'x';
      const mensagemDesfavoritou = await this.toastController.create({
        message: 'Removida das favoritas',
        position: 'top',
        duration: 1500
      });
      mensagemDesfavoritou.present();
    }
    window.localStorage.setItem('favoritas', JSON.stringify(this.favoritasGerais));
  }

  async updateMusicas() {
    this.NovasMusicas.update(this.titulosGerais);
    if (JSON.parse(window.localStorage.getItem('atualizar')) === 'atualizou') {
      const msgAtualizou = await this.toastController.create({
        header: 'Novas músicas foram adicionadas',
        message: 'Agora novas músicas estão disponíveis para você!',
        position: 'middle',
        buttons: [{
          text: 'Beleza',
          role: 'cancel',
          handler: () => {
            msgAtualizou.dismiss();
            window.location.reload();
          }
        }]
      });
      msgAtualizou.present();
    }
    window.localStorage.setItem('atualizar', JSON.stringify('padrao'));
  }

  async mostrarIntro() {
    const template = await this.modalController.create({
      component: IntroPage
    });
    template.present();
  }
}
