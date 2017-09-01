import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as WC from 'woocommerce-api';


@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {


  WooCommerce: any;
  products:any[] = [];
  page:number;
  category:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.page = 1;
    this.category = this.navParams.get("category");

    this.WooCommerce = WC({
      url: "http://localhost:8888/store1/",
      consumerKey:"ck_371eef5724bae9555956920650fb8b6df14b3444",
      consumerSecret:"cs_afdd6cba9a4e0e4fcda3353a61005018aabed88d",
      wpAPI: true,
      version: 'wc/v1'
    });

    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then( (data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body);
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }

}
