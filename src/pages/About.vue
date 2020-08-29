<template>
  <Layout :sidebar="true">
    <div class="content">
      <h1>About</h1>
      <p>Hi there! I'm <strong>Linh Nguyen</strong>. Currently I'm working as a Software Engineer in Singapore.</p>
      <p>I start this blog in hope of getting a deeper understanding of technologies and problem solving by writing about them. I'm interested in:</p>
      <ul>
        <li>Practical, Functional Programming in Scala.</li>
        <li>Data Management: Modeling, Cleaning, Quality Control, etc.</li>
        <li>Search Relevance techniques.</li>
        <li>Reasoning about Distributed Systems.</li>
      </ul>
      <p>Outside of the IT world, I enjoy photography as a hobby.</p>
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
}
</page-query>

<script>
const aboutDescription = "I'm Linh Nguyen. Currently I'm working as a Software Engineer in Singapore."

export default {
  metaInfo() {
    return {
      title: "About Me",
      meta: [
        {property: "og:type", content: 'website'},
        {property: "og:description", content: aboutDescription},
        {property: "og:site_name", content: this.$page.metadata.siteName},
        {property: 'og:url', content: this.$page.metadata.siteUrl + '/about/'},
        {name: "twitter:title", content: 'About Me | Random.nextBlog'},
        {name: "twitter:description", content: aboutDescription},
        {name: 'twitter:url', content: this.$page.metadata.siteUrl + '/about/'}
      ]
    }
  }
}
</script>