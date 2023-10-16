<template>
 <div class="footer-nav row ac jc">
  <div class="submit-btn row ac jc" @click="clickHandle">下一题</div>
 </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    clickHandle(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang="less" scoped>
.footer-nav {
  width: 100%;
  height: 1.2rem;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  .submit-btn {
    width: 3rem;
    height: 0.7rem;
    background: #74a1fe;
    border-radius: 0.35rem;
    flex-shrink: 0;
    font-size: 0.3rem;
    color: #ffffff;
  }
}
</style>