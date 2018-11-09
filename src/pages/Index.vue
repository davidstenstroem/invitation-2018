<template>
  <main>
    <div v-images-loaded:on="loadingCallback()" class="grid">
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
  methods: {
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
