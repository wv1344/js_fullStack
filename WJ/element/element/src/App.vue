<template>
  <div id="app">
    <Calendar v-model="value"></Calendar>
    <div>{{value}}</div>
  </div>
</template>

<script>
import Calendar from '@/components/calendar'
export default {
  name: 'App',
  components: {
    Calendar
  },
  data () {
    return {
      value: '2019-09-01'
    }
  }
}
</script>
