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
          active: checkedList.includes(i),
          success: ansStatus[i] == 1,
          error: ansStatus[i] == 0,
          'pointer-none': isReview
        }" 
        v-for="(v, i) in info.options" 
        :key="i" 
        @click="chooseOption(i)">
        <div class="prefix row ac jc">
          <!-- 选择框左侧 -->
          <span v-if="!isReview">{{ wordMap[i] }}</span>
          <img src="../../assets/images/img_zq1@2x.png" v-if="ansStatus[i] == 1" alt="" class="status-img">
          <img src="../../assets/images/img_cw2@2x.png" v-if="ansStatus[i] == 0" alt="" class="status-img">
        </div>
        <!-- 右侧内容 -->
        <div class="content row ac jc" v-html="cutPrefix(v, i)"></div>
      </div>

      <!-- 回显 -->
      <div class="review-box" v-if="isReview">
        <review-title text="答案"></review-title>
        <div class="mb-2 text">{{ info.answer }}</div>
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
  data() {
    return {
      checkedList: [],
      ansStatus: []
    }
  },
  methods: {
    chooseOption(i) {
      // 单选
      if (this.info.type == 'qradio') {
        this.checkedList = [i]
        return
      }
      // 多选
      const index = this.checkedList.indexOf(i)
      if (index != -1) {
        this.checkedList.splice(index, 1)
      } else {
        this.checkedList.push(i)
      }
    },
    getAns() {
      const rightIndexList = this.wordToIndex(this.info.answer.split(','))
      const ans = this.checkedList.map(v => {
        const answer = v
        const isRight = rightIndexList.includes(v)
        return { answer, isRight }
      })
      this.sendAns(ans)
    },
    reviewDeal() {
      if (this.info.yourAnswer && this.info.yourAnswer.length) {
        this.checkedList = this.info.yourAnswer.map(v => v.answer)
      }
      // 错对判断
      if (this.isReview) {
        this.checkedList = []
        // 默认全部为-1
        const statusList = this.info.options.map(() => -1)
        // 只处理用户的答案 不显示正确答案
        this.info.yourAnswer.forEach(v => {
          if (v.isRight) {
            statusList[v.answer] = 1
          } else {
            statusList[v.answer] = 0
          }
        })
        this.ansStatus = statusList
      }
    }
  }
}
</script>

<style lang="less" scoped>
.option {
  display: flex;
  height: 1.5rem;
  border-radius: 0.3rem;
  border: 2px solid #e3edff;
  overflow: hidden;
  margin-bottom: 0.2rem;
  .status-img {
    width: 0.5rem;
    height: 0.5rem;
  }
  .prefix {
    width: 0.7rem;
    height: 100%;
    color: #74a1fe;
    background-color: #F1F5FF;
  }
  .content {
    padding: 0 0.24rem;
    box-sizing: border-box;
  }
  &.active {
    border-color: #74a1fe;
    .content {
      color: #74a1fe;
    }
  }
  &.success {
    color: #3EE0B1;
    border-color: #3EE0B1;
    .prefix {
      background-color: rgba(62,224,177,0.10);
    }
  }
  &.error {
    color: #FF5F5F;
    border-color: #FF5F5F;
    .prefix {
      background-color: rgba(255,95,95,0.10);
    }
  }
}
</style>