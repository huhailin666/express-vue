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
      $.post("/api/notes/edit", {
        id: id,
        isFinish: false
      }).done((ret)=> {
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
      $.post("/api/notes/edit", {
        id: id,
        isFinish: true
      }).done((ret)=> {
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
      $.post("/api/notes/edit", {
        id: id,
        level: i
      }).done((ret)=> {
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
      if(o){
        $.post("api/notes/add",o).done((ret)=>{
          if(ret.status===0){
            this.lists.push(ret.data)
            Toast('添加成功')
          } else {
            Toast("添加失败");
          }
        })
      }
    },
    update(el, id) {
      console.log(id)
      let text=el.target.innerText;
      this.lists.forEach(e => {
        if (e.id == id) {
          this.$set(e, "text", text);
        }
      });
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
    },
    toLogin(){
      $.get("/auth/github").done(()=>{
        this.isLogin=true;
      })
    }
  },
  data: function() {
    return {
      isLogin: false,
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