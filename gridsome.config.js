// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/globals.scss')
      ],
    })
}

module.exports = {
  siteName: 'Random.nextBlog by tuleism',
  siteUrl: 'https://tuleism.github.io',
  titleTemplate: `%s | Random.nextBlog`,
  templates: {
    Doc: '/:slug',
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'docs/blog/**/*.md',
        typeName: 'Doc',
        remark: {
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        },
        refs: {
          // Create a Tag content type and its nodes automatically.
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: (process.env.GA_ID ? process.env.GA_ID : 'XX-999999999-9')
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Doc',
        feedOptions: {
          title: 'Random.nextBlog by tuleism',
          feed_url: 'https://tuleism.github.io/rss.xml',
          site_url: 'https://tuleism.github.io'
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: 'https://tuleism.github.io' + node.path,
          date: node.date,
          categories: node.tags
        }),
        latest: true,
        output: {
          dir: './static',
          name: 'rss.xml'
        }
      }
    }
  ],
  templates: {
    Doc: '/blog/:year/:slug'
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  }
}

