<template>
  <div class="container">
   <div class="left-box">
     <record-tool></record-tool>
     <div class="title" v-html="title"></div>
   </div>
   <div class="right-box">
     <div class="right-main">
       <!-- <review-title :status="2"></review-title> -->
       <div class="options-box">
         <div 
          class="option"
          :class="{ active: optionIndex == i }"
          @click="optionChange(i)"
          v-for="(v, i) in info.options" 
          :key="i">{{ v }}</div>
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
    },
  },
  computed: {
    title() {
      return this.info.title.replace(/\(.?\)/g, `<span class="input-block mb-4">&nbsp;</span>`)
    },
    ansFormat() {
      const idxList = this.wordToIndex(this.info.answer.split(','))
      return idxList.map(v => this.info.options[v]).join(", ")
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  white-space: pre;
  // line-height: 1;
  vertical-align: middle;
}
.options-box {
  display: flex;
  flex-wrap: wrap;
  .option {
    width: 1.36rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.2rem 0.2rem 0;
    border: 2px solid #e3edff;
    border-radius: 0.3rem;
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