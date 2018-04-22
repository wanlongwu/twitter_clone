import Vue from 'vue/dist/vue.esm'


let selectId = 0;
let currentUserId = 0;

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
