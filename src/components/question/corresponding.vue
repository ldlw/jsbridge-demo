<template>
 <div class="container">
  <div class="left-box">
    <record-tool></record-tool>
    <div class="title" v-html="title"></div>
  </div>
  <div class="right-box">
    <div class="right-main">
      <!-- <review-title :status="0"></review-title> -->
      <div class="options-box">
        <div 
          class="option row ac"
          :class="{ active: optionIndex == i }"
          @click="optionChange(i)"
          v-for="(v, i) in info.options" 
          :key="i">
          <span>{{ v }}</span>
          <!-- <img src="../../assets/images/img_zq1@2x.png" alt="" class="status-img"> -->
          <!-- <img src="../../assets/images/img_cw2@2x.png" alt="" class="status-img"> -->
        </div>
      </div>
      <!-- 回显 -->
      <!-- <div class="review-box">
        <review-title text="答案"></review-title>
        <div class="mb-2 text">{{ ansFormat }}</div>
        <review-title text="听力原文"></review-title>
        <div class="mb-2 text" v-for="(v, i) in info.eContent" :key="i">{{ v }}</div>
        <review-title text="听力译文"></review-title>
        <div class="text" v-for="(v, i) in info.cContent" :key="i">{{ v }}</div>
      </div> -->
    </div>
    <footer-nav @click="getAns"></footer-nav>
  </div>
  </div>
</template>

<script>
import CommonMinix from '../../mixin/common'
export default {
  mixins: [CommonMinix],
  data() {
    return {
      optionIndex: -1, // 当前选中的选项索引
    }
  },
  methods: {
    getAns() {},
    optionChange(i) {
      this.optionIndex = i
    }
  },
  computed: {
    title() {
      return this.info.title.replace(/\(.?\)/g, `<span class="input-block">&nbsp;</span>`)
    },
    ansFormat() {
      const idxList = this.wordToIndex(this.info.answer.split(','))
      return idxList.map(v => this.info.options[v]).join(", ")
    }
  }
}
</script>

<style lang="less">
.input-block {
  display: inline-block;
  min-width: 1.4rem;
  height: 0.5rem;
  border: 1px solid #999999;
  border-radius: 0.1rem;
}
</style>
<style lang="less" scoped>
.title {
  line-height: 1.5;
  vertical-align: middle;
}
.options-box {
  display: flex;
  flex-wrap: wrap;
  .option {
    min-width: 3.6rem;
    height: 1.2rem;
    background: #ffffff;
    border: 2px solid #e3edff;
    border-radius: 0.3rem;
    margin-right: 0.3rem;
    margin-bottom: 0.3rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    position: relative;
    .status-img {
      width: 0.5rem;
      height: 0.5rem;
      position: absolute;
      top: 50%;
      right: 0.2rem;
      transform: translateY(-50%);
    }
    &.active {
      border-color: #74a1fe;
      color: #74a1fe;
      background-color: #F1F5FF;
    }
    &.success {
      color: #3EE0B1;
      border-color: #3EE0B1;
      background-color: #EBFCF7;
    }
    &.error {
      color: #FF5F5F;
      border-color: #FF5F5F;
      background-color: #FFEFEF;
    }
  }
}
</style>