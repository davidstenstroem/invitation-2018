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
      <div class="grid-item">
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
      grid: [
        {
          text: null,
          image: '1.jpg'
        },
        {
          text: null,
          image: '2.jpg'
        },
        {
          text: 'opti 2019',
          image: '3.jpg'
        },
        {
          text: 'January 25-27',
          image: null
        },
        {
          text: 'Messe München'
        }
      ],
      config: {
        maxTranslationX: 50,
        maxTranslationY: 50
      }
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
      const win = this.win()
      return {
        x: win.width / 2,
        y: win.height / 2
      }
    }
  },
  mounted () {
    this.getRef()
  },
  methods: {
    getRef () {
      console.log(this.$refs)
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
        const win = this.win()
        const mousePos = this.getMousePos(event)
        const transX = 2 * this.config.maxTranslationX / win.width * mousePos.x - this.config.maxTranslationX
        const transY = 2 * this.config.maxTranslationY / win.height * mousePos.y - this.config.maxTranslationY
        this.$refs.grid.children.forEach(child => {
          child.style.transform = `translate3d(${transX}px, ${transY}px, 0)`
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
