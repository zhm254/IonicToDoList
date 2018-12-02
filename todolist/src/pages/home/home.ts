import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  things: object[] = [];
  date: string;
  thing: string;
  constructor(public navCtrl: NavController,
    public storage: Storage,
    public toastCtrl: ToastController) {
  }
  addThing() {
    if (this.date && this.thing) {
      this.things.push({ date: this.date, thing: this.thing });
      this.date = '';
      this.thing = '';
      this.storage.set('things', this.things);
    } else {
      let toast = this.toastCtrl.create({
        message: '日期和事项都不能为空！',
        duration: 3000,
        position: 'middle',
      });
      toast.present();
    }
  }
  deleteThing(thing) {
    for (var i = 0; i < this.things.length; i++) {
      if (this.things[i] == thing) {
        this.things.splice(i, 1);
        this.storage.set('things', this.things);
      }
    }
  }
  ionViewWillEnter() {
    this.storage.get('things').then((value) => {
      if (value) {
        this.things = value;
      }
    });
  }
}
