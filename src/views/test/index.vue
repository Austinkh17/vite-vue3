<template>
  <div class="index">
    <div v-for="(item, index) in navList" :key="index" class="nav-block" @click="goToUrl(item)">
      <img :src="item.icon || defaultIcon" alt="icon" class="nav-icon" />
      <div class="nav-icon-right">
        <div class="nav-name ellipsis">{{item.name}}</div>
        <div class="nav-desc ellipsis">{{item.desc}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import defaultIcon from '@/assets/logo.png'
export default defineComponent({
  name: 'index',
  setup: () => {
    let navList = ref([
      {name: '掘金', desc: '掘金是一个帮助开发者成长的社区,是给开发者用的Hacker News,给设计师用的Designer News,和给产品经理用的Medium。', icon: '', url: 'https://juejin.cn/'},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1ssssssssssssssssssssssssssssssssssssssssssssssssssssssqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''}
    ])
    const goToUrl = (item: any) => {
      item.url && (window.location.href = item.url);
    }
    return { navList, defaultIcon, goToUrl }
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
    padding: 25px;
    box-sizing: border-box;
    height: 106px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #e4ecf3;
    transition: all 0.3s ease;
    display: flex;
    .ellipsis{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      word-break: break-word;
    }
    .nav-icon{
      margin-right: 25px;
    }
    .nav-icon-right{
      // flex: 1;
      min-width: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      .nav-name{
        margin-bottom: 10px;
        width: 100%;
      }
      .nav-desc{
        height: 100%;
        flex: 1;
        min-height: 0;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>