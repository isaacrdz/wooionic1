import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProductsByCategoryPage} from '../products-by-category/products-by-category';

import * as WC from 'woocommerce-api';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  homePage: Component;
  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCtrl: NavController;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.homePage = HomePage;
    this.categories = [];

    this.WooCommerce = WC({
      url: "http://store.ninjamkt.com/",
      consumerKey:"ck_72513a6f3063cfc8f8e02d4a1a2c27b54e5d9e92",
      consumerSecret:"cs_3c9ca2bdc0eba9f82bc4a97bc10faffa644eedbc",

    });

    this.WooCommerce.getAsync("products/categories").then((data) => {
      // console.log(JSON.parse(data.body));

      let temp: any[] = JSON.parse(data.body);

      for(let i = 0; i < temp.length; i++) {
        if(temp[i].parent == 0){

          if(temp[i].slug == "motocicletas"){
            temp[i].icon = "hammer"
          }

          if(temp[i].slug == "autos-deportivos"){
            temp[i].icon = "car"
          }

          if(temp[i].slug == "basicos"){
            temp[i].icon = "car"
          }

          if(temp[i].slug == "harware"){
            temp[i].icon = "hammer"
          }

          if(temp[i].slug == "armas-pesadas"){
            temp[i].icon = "hammer"
          }

          if(temp[i].slug == "mochilas"){
            temp[i].icon = "car"
          }



          this.categories.push(temp[i]);
        }
      }
    }, (err)=> {
      console.log(err)
    })




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  openCategoryPage(category){
    this.childNavCtrl.setRoot(ProductsByCategoryPage, {"category": category});
  }
}
