<template>

  <ul id="app">
    <li v-for="tweet in tweet_lists">
      <p>{{ tweet.content }}</p>
    </li>
  </ul>

</template>

<script>
export default {
  props: ["tweet_lists"]
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
