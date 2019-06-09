<template>
  <div id="app">
    <div id="cloak" v-show="isAdd" @click="fanhui"></div>
    <div id="add" @click="add">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-add"></use>
      </svg>
    </div>
    <div id="header">
      <span class="header-title">Sticky-Note</span>
      <ul class="header-button">
        <li class="all" :class="[select==0?'active':'']" @click="toAll">全部</li>
        <li class="unFinish" :class="[select==1?'active':'']" @click="toUnfinish">未完成</li>
        <li class="finished" :class="[select==2?'active':'']" @click="toFinished">已完成</li>
      </ul>
      <div v-if="isLogin" class="login">
        <img src="https://avatars0.githubusercontent.com/u/44695653?v=4" alt>
        <span>小鱼</span>|
        <span class="logout">注销</span>
      </div>
      <div v-else class="unLogin">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-github"></use>
        </svg>
        <span>GitHub登录</span>
      </div>
    </div>
    <div id="main">
      <ul class="main-container">
        <li class="item" v-for="(item ,index) in choose " :key="index">
          <div class="item-header">
            <span>{{item.username}}说：</span>
            <span class="close" @click="close(item.id)">X</span>
          </div>
          <div class="text" @blur="update($event,index)" contenteditable="true">{{item.text}}</div>
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
          <span class="finishIt" v-if="!item.isFinish" @click="toChangeFinish(item.id)">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-duiconverted"></use>
            </svg>
          </span>
          <span v-else class="finished" @click="toChangeUnfinish(item.id)">已完成</span>
        </li>
      </ul>
    </div>
    <add v-show="isAdd" @func="fanhui"></add>
  </div>
</template>
<script src="./App.js"></script>
<style src="./app.less" lang="less"></style>

