<template>
  <aside class="sidebar" :class="{'sidebar--open' : this.$store.state.sidebarOpen}">
    <nav>
      <hr class="dashed">
      <div align="center">
        <g-link class="topic" to="/" exact><code-icon class="icon"/>blog</g-link>
        /
        <g-link class="topic" to="/about/"><info-icon class="icon"/>about</g-link>
      </div>
      <div align="center">
        <g-link class="topic" to="https://github.com/tuleism"><github-icon class="icon"/></g-link>
        /
        <g-link class="topic" to="https://www.linkedin.com/in/tuleism"><linkedin-icon class="icon"/></g-link>
        /
        <g-link class="topic" to="https://www.instagram.com/randomphotohereandthere"><instagram-icon class="icon"/></g-link>
        /
        <g-link class="topic" to="mailto:tuleism@gmail.com"><mail-icon class="icon"/></g-link>
      </div>
      <hr class="dashed">
      <h3 class="section-title" v-if="$page && $page.doc">Table of Contents</h3>
      <ul v-if="$page && $page.doc">
        <li v-for="heading in $page.doc.headings" :key="heading.value">
          <a class="sub-topic" :href="$page.doc.path + heading.anchor">{{heading.value}}</a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import throttle from 'lodash/throttle'
import { GithubIcon, HashIcon, MailIcon, CodeIcon, LinkedinIcon, InstagramIcon, InfoIcon } from 'vue-feather-icons'

export default {
  components: {
    GithubIcon,
    HashIcon,
    MailIcon,
    CodeIcon,
    LinkedinIcon,
    InstagramIcon,
    InfoIcon
  },
  watch: {
    '$route' () {
      this.$store.commit('closeSidebar')
    }
  },
  methods: {
    checkAnchors(slug, item) {
      if (slug == item) {
        return true
      }
    },
    stateFromSize: function() {
      if (window.getComputedStyle(document.body, ':before').content == '"small"') {
        this.$store.commit('closeSidebar')
      } else {
        this.$store.commit('openSidebar')
      }
    },
    sidebarScroll: function() {
      let mainNavLinks = document.querySelectorAll('ul .sub-topic')
      let fromTop = window.scrollY

      mainNavLinks.forEach(link => {
        let section = document.querySelector(link.hash)
        let allCurrent = document.querySelectorAll('.current'), i

        if (section.offsetTop <= fromTop) {
          for (i = 0; i < allCurrent.length; ++i) {
            allCurrent[i].classList.remove('current')
          }
          link.classList.add('current')
        } else {
          link.classList.remove('current')
        }
      })
    }
  },
  beforeMount () {
    this.stateFromSize()
  },
  mounted() {
    window.addEventListener('scroll', throttle(this.sidebarScroll, 50))
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  transition: background .15s ease-in-out, transform .15s ease-in-out, border-color .15s linear;
  padding: 100px 30px 30px;
  width: 300px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  will-change: transform;
  transform: translateX(-300px);
  border-right: 1px solid transparent;
  overflow: auto;

  @include respond-above(sm) {
    transform: translateX(0);
  }

  &--open {
    transform: translateX(0);
  }
  
  .bright & {
    background: $sidebarBright;
    border-color: shade($sidebarBright, 10%);
  }

  .dark & {
    background: $sidebarDark;
    border-color: shade($sidebarDark, 40%);
  }
}

nav {
  position: relative;
  min-height: 100%;
  border: 1px solid transparent;
  padding-bottom: 40px;

  a {
    text-decoration: none;
    color: inherit;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 1.25rem;

    &.active {
      color: $brandPrimary;
    }

    svg {
      width: 20px;
      height: 20px;
      vertical-align: -3px;
      margin-right: 4px;
    }
  }
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;

  a {
    text-decoration: none;
    color: inherit;
    padding: 5px 0;
    display: block;

    &.active {
      color: $brandPrimary;
    }
  }
}

.section {
  margin-bottom: 30px;
}

.section-title {
  text-transform: uppercase;
  font-size: 13px;
  margin-bottom: 10px;
  padding-top: 20px;
  opacity: .5;
  letter-spacing: .15em;
  font-weight: 700;
}

.topic {
  font-weight: 700;
}

.sub-topic {
  font-size: .875rem;
  position: relative;
  opacity: .8;

  &::after {
    content: '';
    transition: opacity .15s ease-in-out;
    width: 6px;
    height: 6px;
    background: $brandPrimary;
    border-radius: 100%;
    display: block;
    opacity: 0;
    position: absolute;
    top: 13px;
    left: -15px;
  }

  &.current {
    &::after {
      opacity: 1;
    }
  }
}

.git {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>


