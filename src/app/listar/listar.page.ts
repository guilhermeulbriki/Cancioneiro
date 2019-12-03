import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})

export class ListarPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  song = songLocalStorage;
  range: any;
  TituloDaMusica = NomeMusicaListada;
  pixel: number;
  interval: any;
  pixelTravado: number;
  titulos = JSON.parse(window.localStorage.getItem('titulos'));

  ColorRolagem = 'off';

  constructor(public navCtrl: NavController) { }

  ngOnInit() { }

  configRolagem() {
    if (this.ColorRolagem === 'off') {
      this.ColorRolagem = 'on';
      this.pixel = 1;
      this.pixelTravado = 1;
      if (this.range === undefined) 
        this.range = 100;
      const velocidade = this.range + 50;
      this.interval = setInterval(() => { this.Rolar(); }, velocidade);
    } else {
      this.ColorRolagem = 'off';
      clearInterval(this.interval);
    }
  }

  Rolar() {
    if ((this.pixelTravado + 20) < window.innerHeight) {
      document.getElementById('h4Zerar').classList.remove('disable');
      if (this.pixelTravado > 1) {
        this.content.scrollToPoint(0, this.pixelTravado, 1500);
        this.pixelTravado = this.pixelTravado + 2;
        this.pixelTravado = this.pixelTravado;
      } else {
        this.content.scrollToPoint(0, this.pixel, 1500);
        this.pixel = this.pixel + 2;
        this.pixelTravado = this.pixel;
      } 
    } else {
      clearInterval(this.interval);
      this.ColorRolagem = 'off';
    }
  }

  ZerarRolagem() {
    this.pixelTravado = 1;
    document.getElementById('h4Zerar').classList.add('disable');
    this.content.scrollToTop(1200);
  }
}

const titulos = JSON.parse(window.localStorage.getItem('titulos'));
const valor = window.localStorage.getItem('MusicaListada');
const musicas = JSON.parse(window.localStorage.getItem('musicas'));
const NumeroMusicaListada = musicas[valor];
const NomeMusicaListada = titulos[valor];
const songLocalStorage = JSON.parse(window.localStorage.getItem(NumeroMusicaListada));
