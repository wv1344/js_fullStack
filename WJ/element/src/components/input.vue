<template>
  <div class="input-content">
    <textarea v-if="this.type === 'textarea'"></textarea>
    <input
    class="input-source"
    v-else v-model="innerValue"
    :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
    :placeholder="placeholder"
    @input="handleInput"
    :disabled="disabled" />
    <span class="clear" v-if="clearShow" @click="clearInput">
      <i class="iconfont iconziyuanxhdpi"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: [String, Number],
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      clearShow: false,
      innerValue: this.value,
      passwordVisible: false
    }
  },
  created () {
    if (this.value && this.clearable) { this.clearShow = true }
    console.log(this.type)
  },

  methods: {
    handleInput (val) {
      this.$emit('input', val.target.value)
    },
    clearInput () {
      this.innerValue = ''
      this.$emit('input', '')
    }
  },
  watch: {
    innerValue () {
      if (!this.innerValue) { this.clearShow = false } else { this.clearShow = true }
    }
  }
}

</script>
<style lang='stylus' scoped>
.input-content
  display inline-block
  position relative
  .input-source
    font-size 16px
    height 40px
    line-height 40px
    border 1px solid #dcdfe6
    border-radius 4px
    padding 0 30px 0 15px
    outline none
  .input-source:focus
    border-color #409eff
  .input-source:disabled
    background-color #f5f7fa
    color #c0c4cc
    cursor not-allowed
  .clear
    display none

.input-content:hover .clear
  display block
  position absolute
  top 10px
  right 10px
  color #ccc
</style>
