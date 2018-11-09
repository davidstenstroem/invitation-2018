import imagesLoaded from 'imagesloaded'
import Vue from 'vue'

function isEqual (firstArray, secondArray) {
  const length = firstArray.length
  if (length !== secondArray.length) {
    return false
  }
  for (let i = 0; i < length; i++) {
    const first = firstArray[i]
    const second = secondArray[i]
    if ((first.img !== second.img) || (first.src !== second.src)) {
      return false
    }
  }
  return true
}

function checkFunction (callback, message = '') {
  if (typeof callback !== 'function') {
    /* eslint-disable-next-line no-throw-literal */
    throw `imageLoaded directive error: object ${callback} should be a function ${message}`
  }
}

function registerImageLoaded (imgLoad, { value, arg, modifiers }) {
  if (!arg) {
    checkFunction(value)
    imgLoad.on('always', (inst) => setTimeout(() => value(inst)))
  }

  const hasModifier = !!modifiers && !!Object.keys(modifiers).length
  const keys = hasModifier ? modifiers : value
  const getCallback = hasModifier ? (key) => { return value } : (key) => value[key]

  for (const key in keys) {
    const callback = getCallback(key)
    checkFunction(callback, !hasModifier ? `property ${key} of ${value}` : '')
    imgLoad[arg](key, (inst, img) => setTimeout(() => callback(inst, img)))
  }
}

function applyImagesLoaded (el, binding) {
  const newContext = imagesLoaded(el)
  const contextImages = newContext.images.map(img => { return { img: img.img, src: img.img.src } })
  const oldContextImages = el.__imagesLoaded__.context
  if (isEqual(oldContextImages, contextImages)) {
    return
  }

  registerImageLoaded(newContext, binding)
  Object.assign(el.__imagesLoaded__, { context: contextImages, imageLoaded: newContext })
}

export default {
  bind (el) {
    el.__imagesLoaded__ = { context: [] }
  },
  inserted (el, binding) {
    applyImagesLoaded(el, binding)
  },
  componentUpdated (el, binding) {
    Vue.nextTick(() => {
      applyImagesLoaded(el, binding)
    })
  },
  unbind (el, binding) {
    el.__imagesLoaded__ = null
  }
}
