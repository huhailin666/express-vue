
  <template>
  <div id="add">
    <h1>添加新标签</h1>
    <input type="text" v-model="text" placeholder="请输入内容">
    <div class="footer">
      <h6>重要星级</h6>
      <span>1</span>
    </div>
    <p>添加</p>
  </div>
</template>
  <script>
export default {
  data: function() {
    return {
      note: {},
      text:''
    };
  },
  methods: {
    add() {
      // let o = {
      //   name: "xiaoyu",
      //   text: "请输入",
      //   isFinish: false,
      //   createdAt: new Date(),
      //   level: 1
      // };
      // this.lists.push(o);
      // $.post("/api/notes/add", {}).done(ret => {
      //   if (ret.status === 0) {
      //     Toast("添加成功");
      //     this.$set(this.lists[this.lists.length - 1], "id", ret.id);
      //   }
      // });
    }
  }
};
</script>
  <style lang="less">
#add {
  width:350px;
  height:400px;
  position: fixed;
  top: 30%;
  margin: 0 auto;
  display:flex;
  flex-direction: column;
  justify-content: center;

}
</style>
  