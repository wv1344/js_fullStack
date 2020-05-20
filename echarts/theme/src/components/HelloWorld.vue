<template>
  <div>
    <button @click="clickMe">click</button>
    <div class="echarts" ref="echarts"></div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/vue-echarts@4.0.2"></script>
<script>
// import ECharts from 'vue-echarts'
export default {
  name: "echarts",
  data() {
    return {};
  },
  methods: {
    clickMe() {
      console.log(this.$refs.echarts);
      var dom = this.$refs.echarts;
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(dom);

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>
<style lang='stylus' scoped>
.echarts {
  width: 400px;
  height: 400px;
}
</style>
