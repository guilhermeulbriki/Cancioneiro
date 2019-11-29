import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonReorderGroup, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController) { }

  ListarVivencias = new Array();
  titulos = new Array();
  vivencias = new Array();

  ionViewWillEnter() {
    this.ListarVivencias = JSON.parse(window.localStorage.getItem('ListarVivencias'));
    this.titulos = JSON.parse(window.localStorage.getItem('titulos'));
    this.vivencias = JSON.parse(window.localStorage.getItem('vivencias'));
  }

  async Remover(numero: any, title: any) {
    const ListarVivencias = JSON.parse(window.localStorage.getItem('ListarVivencias'));
    ListarVivencias.splice(numero, 1);
    this.vivencias[this.titulos.indexOf(title)] = 'x';
    window.localStorage.setItem('vivencias', JSON.stringify(this.vivencias));
    window.localStorage.setItem('ListarVivencias', JSON.stringify(ListarVivencias));
    this.ListarVivencias = ListarVivencias;
    const toast = await this.toastController.create({
      message: 'Removida das vivencias',
      position: 'bottom',
      duration: 1500
    });
    toast.present();
  }

  doReorder(ev: any) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    const title1 = this.ListarVivencias[ev.detail.from];
    const title2 = this.ListarVivencias[ev.detail.to];
    this.ListarVivencias.splice(ev.detail.to, 1, title1);
    this.ListarVivencias.splice(ev.detail.from, 1, title2);
    window.localStorage.setItem('ListarVivencias', JSON.stringify(this.ListarVivencias));
    ev.detail.complete();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

  ngOnInit() { }

  closeModal() {
    this.modalController.dismiss();
  }

  async drop() {
    const ListarVivencias = new Array();
    const vivencias = new Array();
    for (let x = 0; x <= (this.titulos.length) - 1; x++) {
      vivencias[x] = 'x';
    }
    window.localStorage.setItem('vivencias', JSON.stringify(vivencias));
    window.localStorage.setItem('ListarVivencias', JSON.stringify(ListarVivencias));
    window.location.reload();
  }
}
