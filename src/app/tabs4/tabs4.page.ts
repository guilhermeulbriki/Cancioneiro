import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController, IonInfiniteScroll } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-tabs4',
  templateUrl: './tabs4.page.html',
  styleUrls: ['./tabs4.page.scss'],
})
export class Tabs4Page implements OnInit {

  filtrarFavoritados: boolean;
  titulos = new Array();
  icons = new Array();
  titulosFiltrados = new Array();
  favoritas = new Array();
  folders = new Array();
  vivenciaLS = JSON.parse(window.localStorage.getItem('vivencias'));
  check: boolean;

  ionViewWillEnter() {
    this.icons = JSON.parse(window.localStorage.getItem('vivencias'));
    if (this.filtrarFavoritados !== true) {
      this.titulos = JSON.parse(window.localStorage.getItem('titulos'));
    }
    this.titulosFiltrados = JSON.parse(window.localStorage.getItem('titulos'));
    if (this.filtrarFavoritados === undefined) {
      this.filtrarFavoritados = false;
    }
    this.favoritas = JSON.parse(window.localStorage.getItem('favoritas'));
    this.folders = JSON.parse(window.localStorage.getItem('playlists'));
    this.check = false;
  }

  constructor(
    public modalController: ModalController,
    public toastController: ToastController
  ) { }

  FiltrarFavoritados() {
    if (this.filtrarFavoritados === false) {
      const titulosFavoritas = new Array();
      const numberFavoritas = new Array();
      this.icons = new Array();
      for (let y = 0; y <= this.favoritas.length; y++) {
        if (this.favoritas[y] === 'favoritada') {
          numberFavoritas.push(y);
        }
      }
      for (let x = 0; x <= (numberFavoritas.length) - 1; x++) {
        titulosFavoritas.push(this.titulos[numberFavoritas[x]]);
        if (this.vivenciaLS[numberFavoritas[x]] === 'gravada') {
          this.icons.push('gravada');
        } else {
          this.icons.push('x');
        }
      }
      this.titulosFiltrados = titulosFavoritas;
      this.filtrarFavoritados = true;
    } else {
      this.icons = new Array();
      for (let i = 0; i < this.titulos.length; i ++) {
        if (this.vivenciaLS[i] === 'gravada') {
          this.icons.push('gravada');
        } else {
          this.icons.push('x');
        }
      }
      this.titulosFiltrados = JSON.parse(window.localStorage.getItem('titulos'));
      this.filtrarFavoritados = false;
    }
    this.check = true;
  }

  FiltrarFolder(select: any) {
    const valueSelect = (select.target.value);
    if (valueSelect !== 'nenhuma') {
      const folderSelecionada = JSON.parse(window.localStorage.getItem(valueSelect));
      const folderTitles = new Array();
      const titulosLs = JSON.parse(window.localStorage.getItem('titulos'));
      this.icons = new Array();
      for (let i = 0; i < this.titulos.length; i++) {
        if (folderSelecionada[i] === 'gravada') {
          folderTitles.push(titulosLs[i]);
          if (this.vivenciaLS[i] === 'gravada') {
            this.icons.push('gravada');
          } else {
            this.icons.push('x');
          }
        }
      }
      this.titulosFiltrados = folderTitles;
    } else {
      this.icons = new Array();
      for (let i = 0; i < this.titulos.length; i ++) {
        if (this.vivenciaLS[i] === 'gravada') {
          this.icons.push('gravada');
        } else {
          this.icons.push('x');
        }
      }
      this.titulosFiltrados = JSON.parse(window.localStorage.getItem('titulos'));
    }
    if (this.check === true) {
      document.getElementById('checkbox').removeAttribute('aria-checked');
      this.check = false;
    }
  }

  async GoToVivencias() {
    const ListarVivencias = JSON.parse(window.localStorage.getItem('ListarVivencias'));
    if (ListarVivencias.length > 0) {
      window.location.href = 'tabs/tabs4/vivencia';
    } else {
      alert('Você precisa selecionar pelo menos uma música');
    }
  }

  async confirmarMusicas() {
    const template = await this.modalController.create({
      component: ModalPage
    });
    template.present();
  }

  FiltrarMusicas(digito: any) {
    const teclaDigitada = (digito.target.value).toLowerCase();
    const titulosFiltrados = new Array();
    this.icons = new Array();
    for (let x = 0; x <= this.titulos.length; x++) {
      if (this.titulos[x] !== undefined) {
        if (((this.titulos[x]).toLocaleLowerCase()).indexOf(teclaDigitada) > -1) {
          titulosFiltrados.push(this.titulos[x]);
          if (this.vivenciaLS[x] === 'gravada') {
            this.icons.push('gravada');
          } else {
            this.icons.push('x');
          }
        }
      }
    }
    this.titulosFiltrados = titulosFiltrados;
  }

  async AddOrRemove(nomeDaMusica: string) {
    const ListarVivencias = JSON.parse(window.localStorage.getItem('ListarVivencias'));
    const numeroDaMusicaNoGeral = this.titulos.indexOf(nomeDaMusica);
    const numeroDaMusicaFiltrada = this.titulosFiltrados.indexOf(nomeDaMusica);
    if (this.vivenciaLS[numeroDaMusicaNoGeral] !== 'gravada') {
      this.vivenciaLS[numeroDaMusicaNoGeral] = 'gravada';
      this.icons[numeroDaMusicaFiltrada] = 'gravada';
      ListarVivencias.push(this.titulos[numeroDaMusicaNoGeral]);
      const toast = await this.toastController.create({
        message: 'Adicionada as vivencias',
        position: 'top',
        duration: 1500
      });
      toast.present();
    } else {
      this.vivenciaLS[numeroDaMusicaNoGeral] = 'x';
      this.icons[numeroDaMusicaFiltrada] = 'x';
      const num = ListarVivencias.indexOf(this.titulos[numeroDaMusicaNoGeral]);
      ListarVivencias.splice(num, 1);
      const toast = await this.toastController.create({
        message: 'Removida das vivencias',
        position: 'top',
        duration: 1500
      });
      toast.present();
    }
    window.localStorage.setItem('vivencias', JSON.stringify(this.vivenciaLS));
    window.localStorage.setItem('ListarVivencias', JSON.stringify(ListarVivencias));
  }

  public AtualizarIcones() {
    this.icons = JSON.parse(window.localStorage.getItem('vivencias'));
  }

  ngOnInit() { }

}
