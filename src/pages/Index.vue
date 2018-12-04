<template>
  <main @mousemove="onMove" @deviceorientation="onOrientation">
    <div class="snip"/>
    <a class="logo" href="https://lindberg.com/"/>
    <div v-images-loaded:on="loadingCallback()" ref="grid" class="grid" @deviceorientation="onOrientation">
      <div class="grid-item grey"/>
      <div class="grid-item grey">
        <div class="container">
          <h1>100%</h1>
          <h1>optical</h1>
        </div>
      </div>
      <div class="grid-item">
        <div class="container">
          <p>january</p>
          <h1>12 - 14</h1>
        </div>
      </div>
      <div class="grid-item">
        <!-- <div class="text">Messe München</div> -->
      </div>
      <div class="grid-item grey"/>
      <div class="grid-item grey"/>
      <div class="grid-item 7">
        <p>Combine our latest digital tools with selected visual merchandising elements in persuance of individuals to witness and feel the features of the <span class="lindberg">LINDBERG</span> Universe - minimalist and contemporary design, high-grade materials, ultimate comfort and diverse customisation.</p>
        <p>The world is rapidly changing. <span class="lindberg">LINDBERG</span> has a clear vision and numerous exciting developments coming your way.</p>
        <p>See you in London!</p>
        <p><span class="lindberg">LINDBERG</span></p>
      </div>
      <a class="grid-item" href="https://lindberg.com/login/exhibitions">
        <p>Book appointment</p>
      </a>
    </div>
  </main>
</template>

<script>
import imagesLoaded from 'directives/imagesLoadedDirective'

export default {
  directives: {
    imagesLoaded
  },
  data () {
    return {
      config: {
        maxTranslationX: 50,
        maxTranslationY: 50,
        minTranslationX: 5,
        minTranslationy: 5
      },
      windowWidth: 0,
      windowHeight: 0
    }
  },
  computed: {
    win () {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      }
    },
    center () {
      return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
    }
  },
  mounted () {

  },
  created () {
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('deviceorientation', (ev) => this.debounce(this.onOrientation(ev)))
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('deviceorientation', this.onOrientation)
  },
  methods: {
    itemCenter (el) {
      const bcr = el.getBoundingClientRect()
      return {
        x: bcr.left + bcr.width / 2,
        y: bcr.top + bcr.height / 2
      }
    },
    handleResize () {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    },
    debounce (func, wait, immediate) {
      let timeout
      return () => {
        let context = this
        let args = arguments
        let later = () => {
          timeout = null
          if (!immediate) func.apply(context, args)
        }
        let callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
      }
    },
    getMousePos (e) {
      let posX = 0
      let posY = 0
      if (!e) {
        /* eslint-disable-next-line no-unused-vars */
        let e = window.event
      }

      if (e.pageX || e.pageY) {
        posX = e.pageX
        posY = e.pageY
      } else if (e.clientX || e.clientY) {
        posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
        posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
      }

      return {
        x: posX,
        y: posY
      }
    },
    onMove (event) {
      requestAnimationFrame(() => {
        this.$refs.grid.querySelectorAll('.grid-item').forEach(item => {
          const mousePos = this.getMousePos(event)
          const dist = this.distance(this.itemCenter(item).x, this.itemCenter(item).y, this.center.x, this.center.y)
          const transX = 2 * this.config.maxTranslationX / this.windowWidth * mousePos.x - this.config.maxTranslationX// this.randomOffset()
          const transY = 2 * this.config.maxTranslationY / this.windowHeight * mousePos.y - this.config.maxTranslationX// this.randomOffset()
          const tx = transX / window.innerWidth * dist || 0
          const ty = transY / window.innerHeight * dist || 0
          item.style.transform = `translate3d(${tx * -1}px, ${ty * -1}px, 0)`
        })
      })
    },
    distance (x1, x2, y1, y2) {
      const a = x1 - x2
      const b = y1 - y2
      return Math.sqrt(a * a + b * b)
    },
    randomOffset () {
      return Math.floor(Math.random() * (this.config.maxTranslationX - this.config.minTranslationX)) + this.config.minTranslationX
    },
    onOrientation (event) {
      requestAnimationFrame(() => {
        let x = Math.round(event.beta)
        const y = Math.round(event.gamma)

        if (x > 0) {
          x = -x
        } else if (x <= -40) {
          x = -(x + 80)
        }

        this.$refs.grid.querySelectorAll('.grid-item').forEach(item => {
          const dist = this.distance(this.itemCenter(item).x, this.itemCenter(item).y, this.center.x, this.center.y)
          const transX = 2 * this.config.maxTranslationX / this.windowWidth * x - this.config.maxTranslationX// this.randomOffset()
          const transY = 2 * this.config.maxTranslationY / this.windowHeight * y - this.config.maxTranslationX// this.randomOffset()
          const tx = transX / window.innerWidth * dist || 0
          const ty = transY / window.innerHeight * dist || 0
          item.style.transform = `translate3d(${ty * -1}px, ${tx * -1}px, 0)`
        })
      })
    },
    loadingCallback () {
      return {
        progress: (instance, img) => {
          console.log(instance, img)
        },
        always: (instance) => {
          console.log(instance)
        }
      }
    }
  }
}
</script>
