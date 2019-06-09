<template>
  <div id="app">
    <div id="add" @click="add">添加</div>
    <div id="header">
      <span class="header-title">Sticky-Note</span>
      <ul class="header-button">
        <li class="all active" @click="toAll">全部</li>
        <li class="unFinish">未完成</li>
        <li class="finished">已完成</li>
      </ul>
      <div v-if="isLogin" class="login">登录了</div>
      <div v-else>未登录</div>
    </div>
    <div id="main">
      <ul class="main-container">
        <li class="item" v-for="(item ,index) in lists" :key="index">
          <div class="item-header">
            <h5>{{item.id}}说：</h5>
            <span class="close" @click="close(index)">X</span>
          </div>
          <!-- <div class="text" @blur="update(index)" contenteditable="true">{{item.text}}</div> -->
          <input type="text" class="text" v-model="item.text" @blur="update(index)">
          <p>创建时间：{{item.createdAt|dateFormat}}</p>
          <p>重要程度：{{item.level}}</p>
        </li>
      </ul>
    </div>
    <add v-show="isAdd"></add>
  </div>
</template>
<script>
import $ from "jquery";
import { Toast } from "mint-ui";
import add from './add.vue'
export default {
  name: "App",
  components:{add},
  created() {
    this.getNote();
  },
  methods: {
    update(i) {
      let text = this.lists[i].text
      let id =this.lists[i].id
      $.post("/api/notes/edit", {
        id: id,
        note: text
      }).done(function(ret) {
        if (ret.status === 0) {
          Toast("更新成功");
        } else {
          Toast("更新失败");
        }
      });
    },
    add() {
      this.isAdd=true;
    },
    close(i) {
      let id =this.lists[i].id;
      this.lists.splice(i, 1);
      $.post("/api/notes/delete", { id: id }).done((ret)=> {
        if (ret.status === 0) {
          Toast("删除成功");
        } else {
          console.log(ret.errorMsg);
        }
      });
    },
    toAll() {
      Toast("all");
    },
    getNote() {
      $.get("/api/notes").done(ret => {
        if (ret.status == 0) {
          this.lists = ret.data;
        }
        console.log(ret);
      });
    }
  },
  data: function() {
    return {
      isLogin: false,
      isAdd:false,
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

