<template>
  <div class="lottie-container">
    <lottie :options="opts" :height="400" :width="400" @animCreated="handleAnimation"/>
    <button @click="play">
      Play
    </button>
    <button @click="stop">
      Stop
    </button>
    <button @click="pause">
      Pause
    </button>
  </div>
</template>

<script>
import Lottie from 'vue-lottie/src/lottie.vue'
import * as animData from 'static/json/data.json'
export default {
  name: 'Test',
  components: {
    'lottie': Lottie
  },
  data () {
    return {
      opts: { animationData: animData.default },
      animationSpeed: 1
    }
  },
  methods: {
    handleAnimation (anim) {
      this.anim = anim
    },
    play () {
      this.anim.play()
    },
    pause () {
      this.anim.pause()
    },
    stop () {
      this.anim.stop()
    }
  }
}
</script>

<style lang="scss">
  .lottie-container {
    background-color: black;
  }
</style>
