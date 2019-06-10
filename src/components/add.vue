
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
        <svg class="icon" aria-hidden="true" v-for="i in 5" :key="i" @click="level=i">
          <use v-if="i<=level" xlink:href="#icon-Starlarge"></use>
          <use v-else xlink:href="#icon-star"></use>
        </svg>
      </p>
    </div>
    <p class="addNote">
      <span @click="add">添加</span>
    </p>
  </div>
</template>
  <script>
export default {
  data: function() {
    return {
      note: {},
      text: "",
      level: 1
    };
  },
  methods: {
    close() {
      this.$emit("func");
    },
    add() {
      let text = document.querySelector("textarea").value;
      let o = {
        text: text,
        level: this.level,
      };
      this.$emit("func", o);
    }
  }
};
</script>
<style src="../css/add.less" lang="less"></style>

  