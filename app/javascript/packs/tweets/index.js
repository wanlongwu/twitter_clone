// import "bootstrap";
// import Vue from 'vue/dist/vue.esm'

// var tweets = new Vue({
//   el: '#tweets',
//   data: {
//     tweets: [],
//     tweet: {
//       content: '',
//       user: {
//         username: ''
//       }
//     },
//     errors: {}
//   },
//   mounted: function() {
//     var that;
//     that = this;
//     $.ajax({
//       url:'/tweets.json',
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
//           console.log(that)
//           console.log(response)
//           that.tweets.unshift(response);
//         },
//         error: function(response) {
//           that.errors = response.responseJSON.errors;
//         }
//       })
//     }
//   }
// })
