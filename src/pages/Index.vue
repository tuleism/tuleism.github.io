<template>
  <Layout :sidebar="true">
    <div class="content">
      <h1>Recent Articles</h1>
      <PostList v-for="year in years" :key="year" :year="year" />
    </div>
  </Layout>
</template>

<page-query>
query {
  metadata {
    siteName
    siteUrl
    siteDescription
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
  metaInfo() {
    return {
      title: "Random.nextBlog | Scala, Programming, Data, Search, Distributed Systems",
      titleTemplate: `%s`,
      meta: [
        {property: "og:type", content: 'website'},
        {property: "og:description", content: this.$page.metadata.siteDescription},
        {property: "og:site_name", content: this.$page.metadata.siteName},
        {property: 'og:url', content: this.$page.metadata.siteUrl},
        {name: "twitter:title", content: this.$page.metadata.siteName},
        {name: "twitter:description", content: this.$page.metadata.siteDescription},
        {name: 'twitter:url', content: this.$page.metadata.siteUrl}
      ]
    }
  }
}
</script>