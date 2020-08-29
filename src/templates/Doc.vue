<template>
  <Layout>
    <h1>
      {{ $page.doc.title }}
    </h1>
    <div class="markdown" v-html="$page.doc.content" />
  </Layout>
</template>

<page-query>
query Doc ($path: String!) {
  metadata {
    siteName
    siteUrl
    siteDescription
  }
  doc: doc (path: $path) {
    title
    slug
    path
    date (format: "D. MMMM YYYY")
    timeToRead
    content
    description
    tags {
      title
    }
    headings(depth: h2) {
      value
      anchor
      depth
    }
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.doc.title,
      meta: [
        {key: 'description', name: 'description', content: this.$page.doc.description},
        {property: "og:type", content: 'article'},
        {property: "og:description", content: this.$page.doc.description},
        {property: "og:site_name", content: this.$page.metadata.siteName},
        {property: "og:title", content: this.$page.doc.title},
        {property: 'og:url', content: this.$page.metadata.siteUrl + this.$page.doc.path},
        {name: 'article:author', content: 'Linh Nguyen'},
        {name: "twitter:title", content: this.$page.doc.title},
        {name: "twitter:description", content: this.$page.doc.description},
        {name: 'twitter:url', content: this.$page.metadata.siteUrl + this.$page.doc.path}
      ].concat(
        this.$page.doc.tags.map(tag => {
          return {name: 'article:tag', content: tag.title}
        })
      )
    }
  }
}
</script>


<style lang="scss" scoped>

/deep/ > h2 {
  padding-top: 80px;
  margin-top: -80px;

  @include respond-above(md) {
    font-size: 1.5rem;
  }
}

/deep/ > p > img {
    max-width: 100%;
  }

.markdown {
  padding-bottom: 50vh;
}
</style>
