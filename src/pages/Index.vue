<template>
  <Layout :sidebar="true">
    <div class="content">
      <h1>Recent articles</h1>
      <PostList v-for="year in years" :key="year" :year="year" />
    </div>
  </Layout>
</template>

<page-query>
query {
  metadata {
    siteName
  }
  allPost: allDoc {
    edges {
      node {
        slug
        path
        title
        tags {
          title
        }
        timeToRead
        date(format:"MMM D YYYY")
        description
      }
    }
  }
}
</page-query>

<script>
import PostList from '~/components/PostList.vue'

export default {
  computed: {
    years() {
      const years = {};
      const posts = this.$page.allPost.edges;
      posts.map((post) => {
        const year = post.node.date.split(" ")[2];
        years[year] = "";
      });
      return Object.keys(years).sort((a, b) => {
        return b - a;
      });
    }
  },
  components: {
    PostList
  },
  metaInfo: {
    title: "Random.nextBlog by tuleism",
    titleTemplate: `%s`,
    meta: [
      { key: 'description', name: 'description', content: 'Random.nextBlog by tuleism, a tech blog on Scala, Programming, Data and Distributed Systems'}
    ]
  }
}
</script>