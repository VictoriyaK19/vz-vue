import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axiios from 'axios'

// const aws = require('aws-sdk');

// let s3 = new aws.S3({
//   AppId: process.env.S3_ID,
//   AppKey: process.env.S3_KEY
// });

var appId = process.env.vz-vetovo_APP_ID
// var appKey = process.env.APP_KEY
console.log(appId)

axiios.defaults.baseURL = 'https://parseapi.back4app.com'
// axiios.defaults.headers = {
//     'X-Parse-Application-Id': appId,
//     'X-Parse-REST-API-Key': appKey
// }

axiios.defaults.headers = {
    'X-Parse-Application-Id': 'e29amB1TcYqKYQlJDSvtbpHTFnMMdRQiSzEMVDn3',
    'X-Parse-REST-API-Key': '6rzQoexbCEallVe1wHp0cUXSpNXBSWQgU1LOSq9y'
}

createApp(App).use(store).use(router, axiios).mount('#app')
