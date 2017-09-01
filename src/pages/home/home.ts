import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';

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
      url: "http://localhost:8888/store1/",
      consumerKey:"ck_371eef5724bae9555956920650fb8b6df14b3444",
      consumerSecret:"cs_afdd6cba9a4e0e4fcda3353a61005018aabed88d",
      wpAPI: true,
      version: 'wc/v1'
    });

    this.loadMoreProducts(null);

    this.WooCommerce.getAsync("products").then( (data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body);
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
    console.log(event)
    if(event == null){

      this.page = 2;
      this.moreProducts = [];
    } else {
      this.page ++;
    }


    this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body));

      if(event != null){
        event.complete();
        event.enable(false);
      }

      if(JSON.parse(data.body).length < 10){

        this.toastCtrl.create({
          message: "No more products",
          duration: 2000
        }).present();
      }
    }, (err) => {
      console.log(err)
    })
  }

}
