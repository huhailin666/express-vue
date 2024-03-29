import $ from "jquery";
import add from "../components/add.vue";
var Toast = require('./Toast.js').Toast;

export default {
  name: "App",
  components: { add },
  created() {
    this.getNote();
  },
  computed: {
    choose: function () {
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
      if (!this.isLogin) {
        Toast("请先登录")
        return;
      }
      $.post("/api/notes/edit", {
        id: id,
        isFinish: false
      }).done((ret) => {
        if (ret.status === 0) {
          Toast("更新成功");
        } else {
          Toast("更新失败");
        }
      });
      this.lists.forEach(e => {
        if (e.id == id) {
          this.$set(e, "isFinish", false);
        }
      });
    },
    toChangeFinish(id) {
      if (!this.isLogin) {
        Toast("请先登录")
        return;
      }
      $.post("/api/notes/edit", {
        id: id,
        isFinish: true
      }).done((ret) => {
        if (ret.status === 0) {
          Toast("更新成功");
        } else {
          Toast("更新失败");
        }
      });
      this.lists.forEach(e => {
        if (e.id == id) {
          this.$set(e, "isFinish", true);
        }
      });
    },
    changeStar(id, i) {
      if (!this.isLogin) {
        Toast("请先登录")
        return;
      }
      $.post("/api/notes/edit", {
        id: id,
        level: i
      }).done((ret) => {
        if (ret.status === 0) {
          Toast("更新成功");
        } else {
          Toast("更新失败");
        }
      });
      this.lists.forEach(e => {
        if (e.id == id) {
          this.$set(e, "level", i);
        }
      });
    },
    fanhui(o) {
      this.isAdd = false;
      if (o) {
        if (!this.isLogin) {
          Toast("请先登录")
          return;
        }
        $.post("api/notes/add", o).done((ret) => {
          if (ret.status === 0) {
            this.lists.push(ret.data)
            Toast('添加成功')
          } else {
            Toast("添加失败");
          }
        })
      }
    },
    update(el, id) {
      let text = el.target.innerText;
      if(text==this.text){
        return
      }
      if (!this.isLogin) {
        Toast("请先登录")
        return;
      }
      this.lists.forEach(e => {
        if (e.id == id) {
          this.$set(e, "text", text);
        }
      });
      $.post("/api/notes/edit", {
        id: id,
        note: text
      }).done(function (ret) {
        if (ret.status === 0) {
          Toast("修改成功")
        } else {
          Toast("更新失败");
        }
      });
    },
    close(id) {
      if(!this.isLogin){
        Toast("请先登录")
        return;
      }
      $.post("/api/notes/delete", { id: id }).done((ret) => {
        if (ret.status === 0) {
          this.lists.forEach((e, index) => {//根据 id 找元素，找到后删除
            if (e.id == id) {
              this.lists.splice(index, 1)
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
          if (ret.user) {
            this.isLogin = true;
            this.user = ret.user;
          }
          console.log(ret)
        }
      });
    },
    toLogin() {
      $.get("/auth/github").done(() => {
        this.isLogin = true;
      })
    }
  },
  data: function () {
    return {
      isLogin: false,
      isAdd: false,
      select: 0,
      user: '',
      text:'',
      lists: []
    };
  }
};