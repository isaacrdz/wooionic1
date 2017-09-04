import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductsDetailsPage } from '../products-details/products-details';

import * as WC from 'woocommerce-api';


@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {


  WooCommerce: any;
  products: any[];
  page: number;
  category: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

                this.page = 1;
                this.category = this.navParams.get("category");

                this.WooCommerce = WC({
                  url: "http://store.ninjamkt.com/",
                  consumerKey:"ck_72513a6f3063cfc8f8e02d4a1a2c27b54e5d9e92",
                  consumerSecret:"cs_3c9ca2bdc0eba9f82bc4a97bc10faffa644eedbc",

                });


    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then((data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body);
    }, (err) => {
      console.log(err)
    })



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }

  loadMoreProducts(event) {
    this.page++;
    console.log("Getting page " + this.page);
    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then((data) => {
      let temp = (JSON.parse(data.body));

      this.products = this.products.concat(JSON.parse(data.body))
      console.log(this.products);
      event.complete();

      if (temp.length < 10)
        event.enable(false);
    })
  }

  openProductPage(product){
    this.navCtrl.push(ProductsDetailsPage, {"product":product});
  }



}
