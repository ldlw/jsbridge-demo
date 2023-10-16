<template>
 <div class="container">
  <div class="left-box">
    <record-tool></record-tool>
    <div v-html="info.title"></div>
  </div>
  <div class="right-box">
    <div class="right-main">
      <review-title :status="ansState" v-if="isReview"></review-title>
      <!-- 更改 success / error 动态展示option状态 -->
      <div 
        class="option" 
        :class="{ 
          active: activeIdx==i,
          success: ansStatus[i] == 1,
          error: ansStatus[i] == 0,
          'pointer-none': isReview
        }" 
        v-for="(v, i) in info.options" 
        :key="i" 
        @click="chooseOption(i)">
        <div v-html="v"></div>
      </div>

      <!-- 回显 -->
      <div class="review-box" v-if="isReview">
        <review-title text="答案"></review-title>
        <div class="mb-2 text">{{ ansFormat }}</div>
        <review-title text="听力原文"></review-title>
        <div class="mb-2 text" v-for="(v, i) in info.eContent" :key="i">{{ v }}</div>
        <review-title text="听力译文"></review-title>
        <div class="text" v-for="(v, i) in info.cContent" :key="i">{{ v }}</div>
      </div>
    </div>
    <footer-nav @click="getAns"></footer-nav>
  </div>
 </div>
</template>

<script>
import CommonMinix from '../../mixin/common'
export default {
  mixins: [CommonMinix],
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      activeIdx: -1,
      ansStatus: []
    }
  },
  methods: {
    chooseOption(i) {
      this.activeIdx = i
    },
    getAns() {
      const rightIndexList = this.wordToIndex(this.info.answer.split(','))
      const ans = [this.activeIdx].map(v => {
        const answer = v
        const isRight = rightIndexList.includes(v)
        return { answer, isRight }
      })
      console.log(ans)
      return ans
    },
    reviewDeal() {
      if (this.info.yourAnswer.length == 0) return
      // 单纯再把答案写进去
      if (this.info.yourAnswer && this.info.yourAnswer.length) {
        this.activeIdx = this.info.yourAnswer.map(v => v.answer)
      }
      // 错对判断
      if (this.info.isFinishShow) {
        this.activeIdx = -1
        // 默认全部为-1
        const statusList = this.info.options.map(v => -1)
        // 找到所有正确的
        this.info.yourAnswer.forEach(v => {
          if (v.isRight) {
            statusList[v.answer] = 1
          } else {
            statusList[v.answer] = 0
          }
        })
        this.ansStatus = statusList
      }
    },
  },
  computed: {
    ansFormat() {
      const idx = this.wordToIndex(this.info.answer)
      return this.info.options[idx]
    }
  }
}
</script>

<style lang="less" scoped>
.option {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  border-radius: 0.3rem;
  border: 2px solid #e3edff;
  overflow: hidden;
  margin-bottom: 0.2rem;
  &.active {
    border-color: #74a1fe;
    color: #74a1fe;
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
</style>