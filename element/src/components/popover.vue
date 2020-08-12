<template>
  <div class="popper-container">
    <transition name="fade">
      <div
        ref="popper"
        :id="id"
        v-show="!!showContent"
        :style="{ width: width+'px'}"
        class="popper"
        :class="hasPadding? 'add-padding':''"
      >
        <div class="title">{{title}}</div>
        <div class="arrow"></div>
        <slot>{{content}}</slot>
      </div>
    </transition>
    <slot name="reference"></slot>
  </div>
</template>

<script>
export default {
  name: 'Popover',
  props: {
    value: [Boolean],
    width: {
      type: [String, Number],
      default: 200
    },
    title: [String],
    trigger: {
      type: String,
      default: 'click'
    },
    content: {
      type: String,
      default: ''
    },
    hasPadding: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'bottom'
    }
  },
  data () {
    return {
      visible: false,
      showContent: false
    }
  },
  computed: {
    id () {
      return Math.floor(Math.random() * 10000)
    }
  },
  mounted () {
    let popper = this.$refs.popper
    let reference = this.$slots.reference[0].elm
    // 监听 点击事件
    this.$slots.reference[0].elm.addEventListener('click', (e) => {
      if (this.showContent && (e.target === reference || reference.contains(e.target))) return
      this.showContent = true
      this.$emit('input', this.showContent)
      this.$refs.popper.style.left = this.$slots.reference[0].elm.offsetLeft + 'px'
      let tt = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      // 相对当前页面 的 top  + 触发元素的高度
      this.$refs.popper.style.top = this.$slots.reference[0].elm.getBoundingClientRect().top + tt + reference.offsetHeight + 15 + 'px'
      document.body.appendChild(popper)
    })

    this.$root.$el.addEventListener('scroll', () => {
      let tt = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      this.$refs.popper.style.top = this.$slots.reference[0].elm.getBoundingClientRect().top + tt + reference.offsetHeight + 15 + 'px'
    })
    document.addEventListener('mouseup', (e) => {
      if (!(this.$refs.popper === e.target ||
        this.$refs.popper.contains(e.target) ||
        e.target === this.$slots.reference[0].elm ||
        this.$slots.reference[0].elm.contains(e.target))) {
        this.showContent = false
        this.$emit('input', this.showContent)
      }
    })
  },
  watch: {
    value (newVal) {
      this.showContent = newVal
    }
  },
  methods: {
    changeVisible () {
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="stylus" scoped>
.fade-enter {
  opacity: 0;
  transform-origin: 0 0;
  transform scaleY(0)
}

.fade-leave {
  opacity: 0;
  transform-origin: 0 0;
  transform scaleY(0)
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.2s;
}

.popper {
  position: absolute;
  min-width: 150px;
  border-radius: 4px;
  // height 200px
  // padding 18px 20px
  background: #fff;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  &.add-padding {
    padding: 18px 20px;
  }

  .arrow {
    position: absolute;
    top: -6px;
    border-top-width: 0;
    border-bottom-color: #ebeef5;
    border-width: 6px;
    filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));

    &:after {
      content: '';
      top: -6px;
      left: 20px;
      border-width: 6px;
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
    }

    &:after {
      border-bottom-color: #fff;
    }
  }
}
</style>
