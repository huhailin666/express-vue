<template>
  <div id="app">
    <div id="add" @click="add">添加</div>
    <div id="header">
      <span class="header-title">Sticky-Note</span>
      <ul class="header-button">
        <li class="all active" @click="toAll">全部</li>
        <li class="unFinish" >未完成</li>
        <li class="finished" >已完成</li>
      </ul>
      <div v-if="isLogin" class="login">登录了</div>
      <div v-else>未登录</div>
    </div>
    <div id="main">
      <ul class="main-container">
        <li class="item" v-for="(item ,index) in lists" :key="index">
          <h5>{{item.name}}说：</h5>
          <div class="text" contenteditable="true">{{item.text}}</div>
          <p>创建时间：{{item.time}}</p>
          <p>重要程度：{{item.level}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: "App",
  created() {
    this.getNote();
  },
  methods: {
    add(){
      this.lists.push({
          id: 1,
          name: "xiaoyu",
          text: "我爱小海",
          isFinish: false,
          time: "2019-05-5",
          level: 1
      })
    },
    toAll() {
      console.log("all");
    },
    getNote() {
      console.log('开始发送请求')
      $.get('/api/notes').done(function(ret){
        console.log(ret)
        console.log('结束发送请求')
      })
    }
  },
  data: function() {
    return {
      isLogin: false,
      lists: [
        {
          id: 1,
          name: "xiaoyu",
          text: "我爱小海",
          isFinish: false,
          time: "2019-05-5",
          level: 1
        },
        {
          id: 2,
          name: "xiaoyu",
          text: "我爱小海",
          isFinish: false,
          time: "2019-05-5",
          level: 1
        }
      ]
    };
  }
};
</script>

<style src="./app.less" lang="less"></style>

