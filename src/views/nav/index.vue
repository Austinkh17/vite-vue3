<template>
  <div class="nav-index">
    <div class="nav-menu">
      <img :src="defaultIcon" alt="icon" class="nav-image"/>
      <el-menu
        class="nav-el-menu"
        @open="handleOpen"
        @close="handleClose">
        <div v-for="(item, index) in navMenu" :key="index">
          <el-submenu :index="index" v-if="item.children && item.children.length">
            <template #title>
              <i class="el-icon-location"></i>
              <span>{{item.name}}</span>
            </template>
            <div v-for="(item1, index1) in item.children" :key="index1" @click="goToNavList(item1)" class="menu-children">
              <el-menu-item :index="index + '-' + index1">
                <i class="el-icon-setting"></i>
                <template #title>{{item1.name}}</template>
              </el-menu-item>
            </div>
          </el-submenu>
          <el-menu-item :index="index" v-else @click="goToNavList(item)">
            <i class="el-icon-setting"></i>
            <template #title>{{item.name}}</template>
          </el-menu-item>
        </div>
      </el-menu>
    </div>
    <div class="nav-list">
      <div v-for="(item, index) in navList" :key="index" class="nav-wrap">
        <div class="nav-header" :id="item.id">{{item.name}}</div>
        <div class="nav-content">
          <div v-for="(item1, index1) in item.list" :key="index1" class="nav-box" @click="goToUrl(item1)">
            <img :src="item1.icon || defaultIcon" alt="icon" class="nav-icon"/>
            <div class="nav-icon-right">
              <div class="nav-name ellipsis">{{item1.name}}</div>
              <div class="nav-desc ellipsis">{{item1.desc}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import defaultIcon from '@/assets/logo.png'
export default defineComponent({
  name: 'nav',
  setup: () => {
    let navList = ref([{name: '网站1', id: 'web1', list: [
      {name: '掘金', desc: '掘金是一个帮助开发者成长的社区,是给开发者用的Hacker News,给设计师用的Designer News,和给产品经理用的Medium。', icon: '', url: 'https://juejin.cn/'},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1ssssssssssssssssssssssssssssssssssssssssssssssssssssssqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''}
    ]}, {name: '网站2', id: 'web2', list: [
      {name: '掘金', desc: '掘金是一个帮助开发者成长的社区,是给开发者用的Hacker News,给设计师用的Designer News,和给产品经理用的Medium。', icon: '', url: 'https://juejin.cn/'},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1ssssssssssssssssssssssssssssssssssssssssssssssssssssssqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''}
    ]}, {name: '网站3', id: 'web3', list: [
      {name: '掘金', desc: '掘金是一个帮助开发者成长的社区,是给开发者用的Hacker News,给设计师用的Designer News,和给产品经理用的Medium。', icon: '', url: 'https://juejin.cn/'},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1ssssssssssssssssssssssssssssssssssssssssssssssssssssssqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''}
    ]}, {name: '网站4', id: 'web4', list: [
      {name: '掘金', desc: '掘金是一个帮助开发者成长的社区,是给开发者用的Hacker News,给设计师用的Designer News,和给产品经理用的Medium。', icon: '', url: 'https://juejin.cn/'},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1ssssssssssssssssssssssssssssssssssssssssssssssssssssssqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''}
    ]}, {name: '网站5', id: 'web5', list: [
      {name: '掘金', desc: '掘金是一个帮助开发者成长的社区,是给开发者用的Hacker News,给设计师用的Designer News,和给产品经理用的Medium。', icon: '', url: 'https://juejin.cn/'},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1ssssssssssssssssssssssssssssssssssssssssssssssssssssssqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''}
    ]}, {name: '网站6', id: 'web6', list: [
      {name: '掘金', desc: '掘金是一个帮助开发者成长的社区,是给开发者用的Hacker News,给设计师用的Designer News,和给产品经理用的Medium。', icon: '', url: 'https://juejin.cn/'},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1ssssssssssssssssssssssssssssssssssssssssssssssssssssssqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''},
      {name: 'xxxx', desc: 'qqqqqqqqqqqq', icon: ''},
      {name: 'xxxx1', desc: 'qqqqqqqqqqqq1', icon: ''}
    ]}])
    let navMenu = reactive([
      {name: '网站1', id: 'web1', children: [{name: '网站5', id: 'web5'}, {name: '网站6', id: 'web6'}]},
      {name: '网站2', id: 'web2'},
      {name: '网站3', id: 'web3'},
      {name: '网站4', id: 'web4'}
    ]);
    const goToUrl = (item: any) => {
      item.url && (window.location.href = item.url);
    }
    const goToNavList = (item: any) => {
      let id = '#' + item.id;
      document.querySelector(id)?.scrollIntoView({behavior: 'smooth'});
    }
    return { navList, navMenu, defaultIcon, goToUrl, goToNavList }
  }
});
</script>

<style lang="scss">
.nav-index{
  width: 100%;
  height: 100%;
  display: flex;
  .nav-menu{
    width: 200px;
    height: 100%;
    border-right: solid 1px #e6e6e6;
    box-sizing: border-box;
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .nav-image{
      width: 65%;
      height: 10%;
      margin-bottom: 75px;
    }
    .nav-el-menu{
      border: none;
      width: 100%;
      flex: 1;
      min-height: 0;
    }
    .menu-children{
      .el-menu-item{
        padding-left: 70px !important;
      }
    }
  }
  .nav-list{
    flex: 1;
    min-width: 0;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 15px;
    .nav-wrap{
      width: 100%;
      height: auto;
      &:not(:last-child){
        margin-bottom: 15px;
      }
      .nav-header{
        height: 20px;
        margin-bottom: 15px;
      }
      .nav-content{
        height: auto;
        display: flex;
        flex-wrap: wrap;
        .nav-box{
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
    }
  }
}
</style>