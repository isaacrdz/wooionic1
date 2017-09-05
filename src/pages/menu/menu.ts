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
      console.log(JSON.parse(data.body).product_categories);

      let temp: any[] = JSON.parse(data.body).product_categories;

      for (let i = 0; i < temp.length; i++) {
        if (temp[i].parent == 0) {

          if (temp[i].slug == "tenis") {
            temp[i].icon = "shirt";
          }
          if (temp[i].slug == "music") {
            temp[i].icon = "musical-notes";
          }
          if (temp[i].slug == "posters") {
            temp[i].icon = "images";
          }

          this.categories.push(temp[i]);
        }
      }

    }, (err) => {
      console.log(err)
    });




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  openCategoryPage(category){
    this.childNavCtrl.setRoot(ProductsByCategoryPage, {"category": category});
  }
}
