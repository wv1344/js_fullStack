<template>
  <div id="app">
    <Calendar v-model="value" :range="['2019-09-30', '2019-10-20']">
        <!-- <template v-slot="scope">
          <div>{{scope.data.month}}-{{scope.data.day >= 10 ? scope.data.day : '0'+scope.data.day}}</div>
        </template> -->
    </Calendar>
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
      value: new Date()
    }
  }
}
</script>
