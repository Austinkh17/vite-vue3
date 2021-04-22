<template>
  <div class="index">
    <div v-for="(item, index) in navList" :key="index" class="nav-block">{{item.name}}{{item.desc}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'index',
  setup: () => {
    let navList = ref([
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''}
    ])
    return { navList }
  }
});
</script>

<style lang="scss">
.index{
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .nav-block{
    width: calc((100% - 120px) / 4);
    background: #fff;
    margin: 15px;
    padding: 15px;
    box-sizing: border-box;
    height: 86px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #e4ecf3;
    transition: all 0.3s ease;
  }
}
</style>