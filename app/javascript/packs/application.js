import "bootstrap";
import Vue from 'vue/dist/vue.esm'
import App from '../app.vue'

const tweets_store = {}

document.addEventListener('DOMContentLoaded', function() {
  const element = document.getElementById("show")
  if (element != undefined){
    tweets_store.tweets = JSON.parse(element.dataset.tweets)

    const app = new Vue({
      el: element,
      data: tweets_store,
      template: "<App :tweet_lists='tweets' />",
      methods: {
        saveTweet: function(){
            this.$http.post('/tweets', { tweet: this.tweet }).then(response => {
              window.location = '/users/${response.body.id}'
          }, response => {
            console.log(response)
          })
        }
      },
      components: { App }
    })
  }
})
