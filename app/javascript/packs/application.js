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

// // users_array is array of following users' ids

let users_array = [];
if (document.getElementById("users_array") != undefined) {
  users_array = document.getElementById("users_array").innerHTML;
};

let selectId = 0;
let currentUserId = 0


let new_tweets = [];

const addFollowStatus = (array,tweets) => {
  tweets.forEach(function(tweet){
    if (array.includes(tweet.user_id) === true) {
      tweet.follow = "followed";
      console.log(tweet.follow);
    } else {
      tweet.follow = "not followed"
      // console.log(tweet.follow);
    };
  });
  // console.log(tweets);
  return tweets;
}

var tweets = new Vue({
  el: '#tweets',
  data: {
    tweets: [],
    tweet: {
      content: '',
    },
    errors: {}
  },
  mounted: function() {
    var that;
    that = this;
    $.ajax({
      url:'/tweets.json',
      success: function(response) {
        that.tweets = addFollowStatus(users_array,response);
      }
    });
  },
  methods: {
    saveTweet: function() {
      var that;
      that = this;
      $.ajax({
        method: 'POST',
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        data: {
          tweet: that.tweet
        },
        url:'/tweets.json',
        success: function(response) {
          that.errors = {};
          that.tweets.unshift(response);
        },
        error: function(response) {
          that.errors = response.responseJSON.errors;
        }
      })
    }
  }
})

var feeds = new Vue({
  el: '#feeds',
  data: {
    tweets: [],
    tweet: {
      content: ''
    },
    errors: {}
  },
  mounted: function() {
    var that;
    that = this;
    $.ajax({
      url:'/tweets/feed.json',
      success: function(response) {
        // console.log(response)
        that.tweets = addFollowStatus(users_array,response);
      }
    });
  },
  methods: {
    saveTweet: function() {
      var that;
      that = this;
      $.ajax({
        method: 'POST',
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        data: {
          tweet: that.tweet
        },
        url:'/tweets.json',
        success: function(response) {
          that.errors = {};
          // console.log(that)
          // console.log(response)
          that.tweets.unshift(response);
        },
        error: function(response) {
          that.errors = response.responseJSON.errors;
        }
      })
    },
  }
})

var show = new Vue({
  el: '#show',
  data: {
    tweets: [],
    tweet: {
      content: ''
    },
    errors: {}
  },
  mounted: function() {
    selectId = document.getElementById("select-id").innerHTML;
    const a = `/users/${selectId}.json`;
    // console.log(selectId);
    var that;
    that = this;
    $.ajax({
      url: a,
      success: function(response) {
        // console.log(response);
        that.tweets = response;
      },
      error: function(response) {
          that.errors = response.responseJSON.errors;
        }
    });
  },
  methods: {
    follow: function() {
      var that;
      that = this;
      currentUserId = parseInt(document.getElementById("current-user-id").innerHTML, 10);
      let followId = parseInt(`${selectId}`,10);
      let following_array = JSON.parse(document.getElementById("following_users").innerHTML);
      console.log(typeof currentUserId);
      if (following_array.includes(followId) === false) {
        following_array.push(followId);
        console.log("+mode");
        console.log(following_array);
        $.ajax({
          method: 'PUT',
          beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
          data: {
            user:{
              following_users: `${following_array}`
            },
          },
          url:`/users/${currentUserId}`,
          success: function(response) {
            that.errors = {};
            // console.log(that)
            // console.log(response)
            that.tweets.unshift(response);
          },
          error: function(response) {
            that.errors = response.responseJSON.errors;
          }
        })
      } else {
        following_array = following_array.filter(item => item !== followId)
        console.log("-mode");

        $.ajax({
          method: 'PUT',
          beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
          data: {
            user:{
              following_users: `${following_array}`
            },
          },
          url:`/users/${currentUserId}`,
          success: function(response) {
            that.errors = {};
            // console.log(that)
            // console.log(response)
            that.tweets.unshift(response);
          },
          error: function(response) {
            that.errors = response.responseJSON.errors;
          }
        })
      }


      // console.log(users_array);

      // const i = document.getElementById("follow-btn");
      // i.parentNode.removeChild(i);
    },
  }
})

