import "bootstrap";
import Vue from 'vue/dist/vue.esm'
import App from '../app.vue'

// const tweets_store = {}
// const all_tweets = {}
// const feed_tweets = {}

// document.addEventListener('DOMContentLoaded', function() {
//   const element = document.getElementById("show")
//   if (element != undefined){
//     tweets_store.tweets = JSON.parse(element.dataset.tweets)

//     const app = new Vue({
//       el: element,
//       data: tweets_store,
//       template: "<App :tweet_lists='tweets' />",
//       methods: {
//         saveTweet: function(){
//             this.$http.post('/tweets', { tweet: this.tweet }).then(response => {
//               window.location = '/users/${response.body.id}'
//           }, response => {
//             console.log(response)
//           })
//         }
//       },
//       components: { App }
//     })
//   }

  // const element2 = document.getElementById("tweet-form")
  // if (element2 != undefined){
  //   all_tweets.tweets = JSON.parse(element2.dataset.tweets)

  //   const app = new Vue({
  //     el:element2,
  //     data: all_tweets,
  //     template: "<App :tweet_lists='tweets' />",
  //     components: { App }
  //   })
  // }

  // const element3 = document.getElementById("feed-form")
  // if (element3 != undefined){
  //   feed_tweets.tweets = JSON.parse(element3.dataset.tweets)

  //   const app = new Vue({
  //     el:element3,
  //     data: feed_tweets,
  //     template: "<App :tweet_lists='tweets' />",
  //     components: { App }
  //   })
  // }
// })


var tweets = new Vue({
  el: '#tweets',
  data: {
    tweets: [],
    tweet: {
      content: '',
      user: {
        username: ''
      }
    },
    errors: {}
  },
  mounted: function() {
    var that;
    that = this;
    $.ajax({
      url:'/tweets.json',
      success: function(response) {
        that.tweets = response;
      }
    });
  },
  methods: {
    saveTweet: function() {
      var that;
      that = this;
      $.ajax({
        method: 'POST',
        data: {
          tweet: that.tweet
        },
        url:'/tweets.json',
        success: function(response) {
          that.errors = {};
          console.log(that)
          console.log(response)
          that.tweets.unshift(response);
        },
        error: function(response) {
          that.errors = response.responseJSON.errors;
        }
      })
    }
  }
})

// var feeds = new Vue({
//   el: '#feeds',
//   data: {
//     tweets: [],
//     tweet: {
//       content: ''
//     },
//     errors: {}
//   },
//   mounted: function() {
//     var that;
//     that = this;
//     $.ajax({
//       url:'/tweets/feed.json',
//       success: function(response) {
//         that.tweets = response;
//       }
//     });
//   },
//   methods: {
//     saveTweet: function() {
//       var that;
//       that = this;
//       $.ajax({
//         method: 'POST',
//         data: {
//           tweet: that.tweet
//         },
//         url:'/tweets.json',
//         success: function(response) {
//           that.errors = {};
//           // console.log(that)
//           // console.log(response)
//           that.tweets.unshift(response);
//         },
//         error: function(response) {
//           that.errors = response.responseJSON.errors;
//         }
//       })
//     }
//   }
// })
