<template>
  <main>
    <div v-images-loaded:on="loadingCallback()" ref="grid" class="grid" @mousemove="onMove">
      <div class="grid-item">
        <img src="">
      </div>
      <div class="grid-item">
        <img src="">
      </div>
      <div class="grid-item">
        <img src="">
      </div>
      <div class="grid-item">
        <img src="">
      </div>
      <div class="grid-item">
        <div class="text">Messe München</div>
      </div>
      <div class="grid-item">
        <img src="">
      </div>
      <div class="grid-item">
        <img src="">
      </div>
      <div class="grid-item-no-move">
        <img src="">
      </div>
      <div class="grid-item">
        <img src="">
      </div>
      <div class="grid-item">
        <img src="">
      </div>
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
        maxTranslationX: 10,
        maxTranslationY: 10
      },
      windowWidth: 0,
      windowHeight: 0
    }
  },
  computed: {
    center () {
      const win = this.win()
      return {
        x: win.width / 2,
        y: win.height / 2
      }
    }
  },
  mounted () {

  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
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
        const mousePos = this.getMousePos(event)
        const transX = 2 * this.config.maxTranslationX / this.windowWidth * mousePos.x - this.config.maxTranslationX
        const transY = 2 * this.config.maxTranslationY / this.windowHeight * mousePos.y - this.config.maxTranslationY
        this.$refs.grid.querySelectorAll('.grid-item').forEach(item => {
          item.style.transform = `translate3d(${transX}px, ${transY}px, 0)`
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
