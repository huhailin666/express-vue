<template>
  <div id="app">
    <div id="cloak" v-show="isAdd" @click="fanhui"></div>
    <a href="#" id="add" @click="isAdd='ture'">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-add"></use>
      </svg>
    </a>
    <div id="header">
      <span class="header-title">Sticky-Note</span>
      <ul class="header-button">
        <li class="all" :class="[select==0?'active':'']" @click="select=0"><a href="#">全部</a></li>
        <li class="unFinish" :class="[select==1?'active':'']" @click="select=1"><a href="#">未完成</a></li>
        <li class="finished" :class="[select==2?'active':'']" @click="select=2"><a href="#">已完成</a></li>
      </ul>
      <div v-if="isLogin" class="login">
        <img :src="user.img" alt>
        <span>{{user.username}}</span> |
        <a class="logout" href="/auth/logout">注销</a>
      </div>
      <div v-else class="unLogin" >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-github"></use>
        </svg>
        <a href="/auth/github">GitHub登录
        </a>
      </div>
    </div>
    <div id="main">
      <ul class="main-container">
        <li class="item" v-for="(item ,index) in choose " :key="index">
          <div class="item-header">
            <span>{{item.username}}说：</span>
            <a href="#" class="close" @click="close(item.id)">X</a>
          </div>
          <div class="text" @blur="update($event,item.id)" contenteditable="true">{{item.text}}</div>
          <p>创建时间：{{item.createdAt|dateFormat}}</p>
          <p>
            <span>重要程度：</span>
            <svg
              class="icon"
              aria-hidden="true"
              v-for="i in 5"
              :key="i"
              @click="changeStar(item.id,i)"
            >
              <use v-if="i<=item.level" xlink:href="#icon-Starlarge"></use>
              <use v-else xlink:href="#icon-star"></use>
            </svg>
          </p>
          <a href="#" class="finishIt" v-if="!item.isFinish" @click="toChangeFinish(item.id)">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-duiconverted"></use>
            </svg>
          </a>
          <a href="#" v-else class="finished" @click="toChangeUnfinish(item.id)">已完成</a>
        </li>
      </ul>
    </div>
    <add v-show="isAdd" @func="fanhui"></add>
  </div>
</template>
<script src="../js/App.js"></script>
<style src="../css/app.less" lang="less"></style>

