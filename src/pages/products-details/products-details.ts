import { Component } from '@angular/core';
import { NavController, NavParams,ToastController, ModalController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { Storage } from '@ionic/storage';
import { Cart } from '../cart/cart';




@Component({
  selector: 'page-products-details',
  templateUrl: 'products-details.html',
})
export class ProductsDetailsPage {
  product: any;
  WooCommerce: any;
  reviews:any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage:Storage,
              public toastCtrl:ToastController,
              public modalCtrl:ModalController) {

    this.product = this.navParams.get("product")
    console.log(this.product);

    this.WooCommerce = WC({
      url: "http://store.ninjamkt.com/",
      consumerKey:"ck_72513a6f3063cfc8f8e02d4a1a2c27b54e5d9e92",
      consumerSecret:"cs_3c9ca2bdc0eba9f82bc4a97bc10faffa644eedbc",

    });

    this.WooCommerce.getAsync('products/'+ this.product.id +'/reviews').then((data)=>{
      this.reviews = JSON.parse(data.body);
      console.log(this.reviews);
    }, (err)=>{
      console.log(err)
    })



  }

  addToCart(product){
    this.storage.get("cart").then((data)=>{
      // console.log(data);
      if(data == null || data.length == 0){

        data = []

        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price)
        });

      }else {
        let added = 0;

        for(let i = 0; i < data.length; i++){
          if(product.id == data[i].product.id){
            console.log("This product is already in cart");
            let qty = data[i].qty;

            data[i].qty = qty + 1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price)
            added = 1;
          }
        }

        if(added == 0 ){
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(product.price)
          });
        }
      }
      this.storage.set("cart",data).then(()=>{
        console.log("Cart updated");
        console.log(data);

        this.toastCtrl.create({
          message:"Cart updated",
          duration: 3000,

        }).present();
      })
    });
  }
openCart(){
  this.modalCtrl.create(Cart).present();
}
}
