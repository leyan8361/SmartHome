<template>
<i :class="{ finished } " :style="{ transform: `scale3d(${progress}, 1, 1)`, transition }" @transitionend="ontransitionend"></i>
</template>

<script>
export default {
  data: () => ({
    progress: 0,
    transition: '',
    finished: false
  }),

  created() {
    document.body.appendChild(this.$mount().$el)
  },

  destroyed() {
    document.body.removeChild(this.$el)
  },

  methods: {
    show() {
      if (this.delay || this.progress) return

      this.delay = setTimeout(() => {
        this.delay = null
        this.finished = false
        this.progress = 0.6
        this.transition = 'transform ease-out 0.5s'
      }, 300)
    },

    hide() {
      if (this.delay) {
        clearTimeout(this.delay)
        this.delay = null
      } else if (this.progress) {
        this.progress = 1
        this.transition = 'transform ease-out 0.1s'
      }
    },

    ontransitionend() {
      if (this.finished) {
        this.progress = 0
        this.transition = 'transform ease-out 0.5s'
      } else if (this.progress === 1) {
        this.finished = true
        this.transition = 'opacity 0.1s'
      } else {
        this.progress = 0.9
        this.transition = 'transform 20s'
      }
    }
  }
}
</script>

<style scoped>
i {
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #4D70FF;
  transform: scale3d(0, 1, 1);
  transform-origin: top left;
  opacity: 1;
}

i.finished {
  opacity: 0;
}
</style>
