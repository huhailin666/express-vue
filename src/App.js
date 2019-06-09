import $ from "jquery";
import { Toast } from "mint-ui";
import add from "./add.vue";

export default {
  name: "App",
  components: { add },
  created() {
    this.getNote();
  },
  computed: {
    choose: function() {
      if (!this.select) {
        return this.lists;
      } else if (this.select === 2) {
        return this.lists.filter(list => {
          if (list.isFinish) {
            return list;
          }
        });
      } else {
        return this.lists.filter(list => {
          if (!list.isFinish) {
            return list;
          }
        });
      }
    }
  },
  methods: {
    toChangeUnfinish(id) {
      this.lists.forEach(e => {
        if (e.id == id) {
          this.$set(e, "isFinish", false);
        }
      });
    },
    toChangeFinish(id) {
      this.lists.forEach(e => {
        if (e.id == id) {
          this.$set(e, "isFinish", true);
        }
      });
    },
    changeStar(id, i) {
      //在此处发送修改请求
      this.lists.forEach(e => {
        if (e.id == id) {
          this.$set(e, "level", i);
        }
      });
    },
    toAll() {
      this.select = 0;
    },
    toUnfinish() {
      this.select = 1;
    },
    toFinished() {
      this.select = 2;
    },
    fanhui() {
      this.isAdd = false;
    },
    update(el, i) {
      console.log(el.target.innerText);
      // let text = this.lists[i].text
      // let id =this.lists[i].id
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
      this.isAdd = true;
    },
    close(id) {
      // let id =this.lists[i].id;
      $.post("/api/notes/delete", { id: id }).done((ret)=> {
        if (ret.status === 0) {
          this.lists.forEach((e,index)=>{//根据 id 找元素，找到后删除
            if(e.id==id){
              this.lists.splice(index,1)
            }
          })
          Toast("删除成功");
        } else {
          console.log(ret.errorMsg);
        }
      });
    },
    getNote() {
      $.get("/api/notes").done(ret => {
        if (ret.status == 0) {
          this.lists = ret.data;
        }
      });
    }
  },
  data: function() {
    return {
      isLogin: true,
      isAdd: false,
      select: 0,
      lists: [
        {
          id: 1,
          name: "xiaoyu",
          text: "我爱小海",
          isFinish: false,
          createdAt: "2019-05-5",
          level: 3
        },
        {
          id: 2,
          name: "xiaoyu",
          text: "我爱小海",
          isFinish: false,
          createdAt: "2019-05-5",
          level: 2
        },
        {
          id: 3,
          name: "xiaoyu",
          text: "我爱小海",
          isFinish: true,
          createdAt: "2019-05-5",
          level: 1
        },
        {
          id: 4,
          name: "xiaoyu",
          text: "我爱小海",
          isFinish: false,
          createdAt: "2019-05-5",
          level: 2
        }
      ]
    };
  }
};