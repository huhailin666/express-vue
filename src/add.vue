
  <template>
  <div id="creat">
    <div class="title">
      <h1>添加新标签</h1>
      <span class="close" @click="close">X</span>
    </div>
    <textarea placeholder="输入内容" name="note-content" id="note-content" cols="30" rows="10"></textarea>
    <div class="footer">
      <p>
        <span>重要星级：</span>
        <svg class="icon" aria-hidden="true" v-for="i in 5" :key="i">
          <use v-if="i<=level" xlink:href="#icon-Starlarge"></use>
          <use v-else xlink:href="#icon-star"></use>
        </svg>
      </p>
    </div>
    <p class="addNote"><span @click="add">添加</span></p>
  </div>
</template>
  <script>
export default {
  data: function() {
    return {
      note: {},
      text: "",
      level:1
    };
  },
  methods: {
    close(){
      this.$emit('func')
    },
    add() {
            this.$emit('func')

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
<style src="./add.less" lang="less"></style>

  