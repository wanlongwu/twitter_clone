import "bootstrap";
import Vue from 'vue/dist/vue.esm'
import App from '../app.vue'

let users_array = [];
if (document.getElementById("users_array") != undefined) {
  users_array = document.getElementById("users_array").innerHTML;
};

let selectId = 0;
let currentUserId = 0

// const charLeft = () => {

// }

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
      if (that.tweet.content.length <= 140){
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
      } else {
        window.alert("Content exceeds limit of 140 characters")
      }
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
      console.log(that)
      if (that.tweet.content.length <= 140){
        $.ajax({
          method: 'POST',
          beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
          data: {
            tweet: that.tweet
          },
          url:'/tweets.json',
          success: function(response) {
            that.errors = {};
            // console.log(response)
            that.tweets.unshift(response);
          },
          error: function(response) {
            that.errors = response.responseJSON.errors;
          }
        })
      } else {
        window.alert("Content exceeds limit of 140 characters")
      }
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
            window.alert("Successfully followed")
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
            window.alert("Unfollowed")
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

