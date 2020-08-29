<template>
  <div class="post-item">
    <span class="date">{{date}}</span>
    <g-link :to="post.path" class="read">{{post.title}}</g-link>
    <span class="time-to-read"><i>{{post.timeToRead}} min read</i></span>
    <span class="tag" v-for="tag in post.tags" :key="tag.title">#{{tag.title}}</span>
    <p>{{post.description}}</p>
  </div>
</template>

<script>
export default {
  props: ["post"],
  computed: {
    date() {
      return this.post.date.substring(0, this.post.date.length - 4);
    }
  }
};
</script>

<style lang="scss" scoped>
.date {
  margin-right:10px;
  min-width: 60px;
  display:inline-block;
}
.time-to-read {
  margin-left:10px;
  margin-right:10px;
  color:gray;
  font-size:.8em;
}
.post-item {
  padding-left:20px;
}
.read {
  font-size: 1.5rem;
}
.post-item p {
  line-height: 1.5;
  font-style: italic;
  color:gray;
  border-left: 3px solid $brandPrimary;
  padding-left: 10px;
  margin: 0.5rem;
}
.tag {
  padding: 0px 5px 0px 5px;
}
</style>