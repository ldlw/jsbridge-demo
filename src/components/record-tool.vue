<template>
 <div class="record-tool row ac sb">
  <div class="left-tool row ac" @click="playSound">
    <img :src="require('../assets/images/icon_yp'+ soundImgId +'@2x.png')" alt="">
    <div class="tip-box">听录音选答案</div>
  </div>
  <div class="right-tool row ac">
    <!-- <img src="../assets/images/icon_sc@2x.png" alt=""> -->
    <img src="../assets/images/icon_ysc@2x.png" alt="">
    <span>收藏</span>
  </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      timer: 0,
      soundImgId: 3
    }
  },
  methods: {
    playSound() {
      window.WebViewJavascriptBridge.callHandler("playTopic", "", () => {
        console.log('callback sound')
      })
      this.playSoundAnimate()
    },

    listenPlayState() {
      window.WebViewJavascriptBridge.registerHandler("playComplete", () => {
        this.playSoundAnimate()
      })
    },
    playSoundAnimate() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = 0
        this.soundImgId = 3
        return
      }
      this.timer = setInterval(() => {
        this.soundImgId += 1
        if (this.soundImgId > 3) this.soundImgId = 1
      }, 800)
    }
  },
  created() {
    this.listenPlayState()
  }
}
</script>

<style lang="less" scoped>
.record-tool {
  margin-bottom: 0.48rem;
  .left-tool {
    position: relative;
    img {
      width: 0.6rem;
      height: 0.6rem;
      z-index: 10;
    }
    .tip-box {
      width: 2.5rem;
      height: 0.5rem;
      text-align: right;
      padding-right: 0.28rem;
      box-sizing: border-box;
      font-size: 0.28rem;
      background: #d1dfff;
      border-radius: 0 0.25rem 0.25rem 0;
      color: #74a1fe;
      transform: translateX(-0.4rem);
    }
  }
  .right-tool {
    font-weight: 600;
    img {
      width: 0.36rem;
      margin-right: 4px;
    }
  }
}
</style>