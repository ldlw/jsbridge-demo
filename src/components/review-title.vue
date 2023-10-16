<template>
 <div class="review-title row ac" :class="{ 'mb-4': status != -1 }">
  <img class="logo" src="../assets/images/img_btys@2x.png" alt="">
  <span class="title">{{ text }}</span>
  <div class="status-tag fault" v-if="status == 0">你答错了</div>
  <div class="status-tag right" v-if="status == 1">你答对了</div>
  <div class="status-tag half" v-if="status == 2">部分正确</div>
 </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "我的答案"
    },
    status: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.review-title {
  margin-bottom: 0.2rem;
  .logo {
    width: 0.25rem;
    margin-right: 0.08rem;
  }
  .title {
    font-size: 0.36rem;
    font-weight: 500;
  }
  &.mb-4 {
    margin-bottom: 0.4rem;
  }
}
.status-tag {
  width: 1.6rem;
  height: 0.5rem;
  color: #fff;
  font-size: 0.26rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.12rem;
  &.right {
    background: #3ee0b1;
  }
  &.half {
    background: #fa9f33;
  }
  &.fault {
    background: #ff5f5f;
  }
}
</style>