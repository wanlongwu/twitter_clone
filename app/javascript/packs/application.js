import "bootstrap";
import Vue from 'vue/dist/vue.esm'
import App from '../app.vue'

const tweets_store = {}

document.addEventListener('DOMContentLoaded', function() {
  const element = document.querySelector("#show")
  if (element != undefined){
    tweets_store.tweets = JSON.parse(element.dataset.tweets)

    const app = new Vue({
      el: element,
      data: tweets_store,
      template: "<App :tweet_lists='tweets' />",
      components: { App },
    })
  };
  // console.log(app)

  // const table = new Vue({
  //   el: 'tweet-table',
  //   data:{
  //     tweets: user.tweets
  //   },
  // })
})
