import Vue from 'vue'
// import App from './App.vue'
import Flutterwave from  'flutterwave-vue-v3'
 
 const key = process.env.FLUTTERWAVE_PUBLIC_KEY
Vue.use(Flutterwave, { publicKey: key} )