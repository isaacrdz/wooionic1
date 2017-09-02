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
      url: "http://localhost:8888/store1/",
      consumerKey:"ck_371eef5724bae9555956920650fb8b6df14b3444",
      consumerSecret:"cs_afdd6cba9a4e0e4fcda3353a61005018aabed88d",
      wpAPI: true,
      version: 'wc/v1'
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

      this.products = this.products.concat(JSON.parse(data.body).products)
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
