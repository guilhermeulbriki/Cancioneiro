import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-vivencia',
  templateUrl: './vivencia.page.html',
  styleUrls: ['./vivencia.page.scss'],
})

export class VivenciaPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  ColorRolagem = 'off';
  number = 0;
  range;
  pixel: number;
  interval;
  pixelTravado: number;

  titulos = JSON.parse(window.localStorage.getItem('titulos'));
  musicas = JSON.parse(window.localStorage.getItem('musicas'));
  ListarVivencias = JSON.parse(window.localStorage.getItem('ListarVivencias'));
  NumberSongListada = this.titulos.indexOf(this.ListarVivencias[this.number]);
  song = JSON.parse(window.localStorage.getItem(this.musicas[this.NumberSongListada]));
  title = this.titulos[this.NumberSongListada];

  constructor(public alertController: AlertController) { }

  ngOnInit() { }

  async configRolagem() {
    if (this.ColorRolagem === 'off') {
      this.ColorRolagem = 'on';
      this.pixel = 1;
      const velocidade = this.range + 50;
      this.interval = setInterval(() => { this.Rolar(); }, velocidade);
    } else {
      this.ColorRolagem = 'off';
      clearInterval(this.interval);
    }
  }

  async Rolar() {
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
  }

  async ZerarRolagem() {
    this.pixelTravado = 1;
    document.getElementById('h4Zerar').classList.add('disable');
    this.content.scrollToTop(1200);
  }

  async nextSong() {
    this.number++;
    if (this.number <= (this.ListarVivencias.length) - 1) {
      const NumberSongListada = this.titulos.indexOf(this.ListarVivencias[this.number]);
      this.song = JSON.parse(window.localStorage.getItem(this.musicas[NumberSongListada]));
      this.title = this.titulos[NumberSongListada];
    } else {
      this.alert();
    }
  }

  async prevSong() {
    this.number--;
    const NumberSongListada = this.titulos.indexOf(this.ListarVivencias[this.number]);
    this.song = JSON.parse(window.localStorage.getItem(this.musicas[NumberSongListada]));
    this.title = this.titulos[NumberSongListada];
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'As músicas acabaram',
      message: 'Você deseja sair e apagar a sua playlist?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Sair',
          handler: () => {
            const vivencias = new Array();
            for (let x = 0; x <= (this.titulos.length) - 1; x++) {
              vivencias.push('x');
            }
            const ListarVivencias = new Array();
            window.localStorage.setItem('vivencias', JSON.stringify(vivencias));
            window.localStorage.setItem('ListarVivencias', JSON.stringify(ListarVivencias));
            window.location.href = 'tabs/tab2';
          }
        }
      ]
    });

    await alert.present();
  }
}
