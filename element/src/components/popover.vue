<template>
  <span class="popper-container">
    <transition name="fade">
      <div
        ref="popper"
        :id="id"
        v-show="!!showContent"
        :style="{ width: width+'px'}"
        class="popper"
      >
        <div class="title">{{title}}</div>
        <div class="arrow"></div>
        <slot>{{content}}</slot>
      </div>
    </transition>
    <slot name="reference"></slot>
  </span>
</template>

<script>
// import Vue from 'vue'

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
    console.log(this.content)
    let popper = this.$refs.popper
    this.$slots.reference[0].elm.addEventListener('click', (e) => {
      console.log('1111')
      this.showContent = !this.showContent
      document.body.appendChild(popper)
    })
    console.dir(this.$slots.reference[0].elm.offsetParent)
    console.log(this.$slots.reference[0].elm.getBoundingClientRect().top)
    this.$refs.popper.style.top =
      this.$slots.reference[0].elm.getBoundingClientRect().top + 350 + 'px'
    this.$refs.popper.style.left =
      this.$slots.reference[0].elm.getBoundingClientRect().left + 'px'
    window.onscroll = () => {
      // console.log(this.$root.$el)
      // console.log(this.$slots.reference[0].elm.getBoundingClientRect().top)
      // console.log(this.$slots.reference[0].elm.getBoundingClientRect())
    }
    document.addEventListener('mouseup', (e) => {
      let con = this.$refs.popper
      // console.log(e.target)
      // console.log(this.$slots.reference[0].elm)
      if (
        (con !== e.target || !con.contains(e.target)) &&
        e.target !== this.$slots.reference[0].elm
      ) {
        this.showContent = false
      }
    })
  },
  watch: {},
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
}

.fade-leave {
  opacity: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.2s ease;
}

.popper {
  position: absolute;
  min-width: 150px;
  border-radius: 4px;
  // padding 18px 20px
  background: #fff;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

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
