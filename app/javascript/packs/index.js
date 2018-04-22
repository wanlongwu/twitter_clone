import Vue from 'vue/dist/vue.esm'

let users_array = [];
if (document.getElementById("users_array") != undefined) {
  users_array = document.getElementById("users_array").innerHTML;
};

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
