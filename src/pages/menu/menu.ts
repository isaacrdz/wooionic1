import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import * as WC from 'woocommerce-api';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  homePage: Component;
  WooCommerce: any;
  categories: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.homePage = HomePage;
    this.categories = [];

    this.WooCommerce = WC({
      url: "http://localhost:8888/store1/",
      consumerKey:"ck_371eef5724bae9555956920650fb8b6df14b3444",
      consumerSecret:"cs_afdd6cba9a4e0e4fcda3353a61005018aabed88d",
      wpAPI: true,
      version: 'wc/v1'
    });

    this.WooCommerce.getAsync("products/categories").then((data) => {
      // console.log(JSON.parse(data.body));

      let temp: any[] = JSON.parse(data.body);

      for(let i = 0; i < temp.length; i++) {
        if(temp[i].parent == 0){
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

}
