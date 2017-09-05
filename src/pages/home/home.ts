import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';
import { ProductsDetailsPage } from '../products-details/products-details';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products:any[] = [];
  moreProducts:any[]=[];
  page:number;

  @ViewChild('productSlides')productSlides:Slides;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

    this.page = 2;

    this.WooCommerce = WC({
      url: "http://store.ninjamkt.com/",
      consumerKey:"ck_72513a6f3063cfc8f8e02d4a1a2c27b54e5d9e92",
      consumerSecret:"cs_3c9ca2bdc0eba9f82bc4a97bc10faffa644eedbc",

    });

    this.loadMoreProducts(null);

    this.WooCommerce.getAsync("products").then( (data) => {
    console.log(JSON.parse(data.body));
    this.products = JSON.parse(data.body).products;
  }, (err) => {
    console.log(err)
  })
  }

  ionViewDidLoad(){
    setInterval(()=>{

      if(this.productSlides.getActiveIndex()== this.productSlides.length() -1 )
        this.productSlides.slideTo(0);

      this.productSlides.slideNext();
    },3000)
  }

  loadMoreProducts(event){
    console.log(event);
    if(event == null)
    {
      this.page = 2;
      this.moreProducts = [];
    }
    else
      this.page++;

    this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if(event != null)
      {
        event.complete();
        event.enable(false);
      }

      if(JSON.parse(data.body).products.length < 10){

        this.toastCtrl.create({
          message: "No more products!",
          duration: 5000
        }).present();

      }


    }, (err) => {
      console.log(err)
    })
  }

  openProductPage(product){
    this.navCtrl.push(ProductsDetailsPage, {"product":product});
  }

}
