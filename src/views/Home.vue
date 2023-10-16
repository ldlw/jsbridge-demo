<template>
 <div class="home">
  <component :info="info" :is="questionType[type]"></component>
 </div>
</template>

<script>
import Choice from "@/components/question/choice"
import Judge from "@/components/question/judge.vue"
import Corresponding from "@/components/question/corresponding.vue"
import Sorted from "@/components/question/sorted.vue"
export default {
  data() {
    return {
      info: null,
      questionType: {
        'qmulti': Choice, // 多选
        'qradio': Choice, // 单选
        '判断题': Judge,
        '对应题': Corresponding,
        '排序题': Sorted
      },
      type: ""
    }
  },
  methods: {
    initial() {
      if (window.WebViewJavascriptBridge && WebViewJavascriptBridge.inited) {
        this.render()
      } else {
        document.addEventListener("WebViewJavascriptBridgeReady", () => {
          this.render()
        })
      }
    },
    bridgeInit() {
      window.WebViewJavascriptBridge.init((message, callback) => {
        callback({'Javascript Responds': 'inited!'})
      })
      window.WebViewJavascriptBridge.callHandler("initCallback", "", () => {
        console.log('initCallback')
      })
    },
    render() {
      this.bridgeInit()
      window.WebViewJavascriptBridge.registerHandler("render", (data) => {
        const d = JSON.parse(data)
        // d.yourAnswer = [{ answer:1, isRight: true }]
        // d.isFinishShow = true
        console.log("处理后的题目：", d)
        // if (d.yourAnswer) {
          // d.yourAnswer = JSON.parse(d.yourAnswer)
          // d.isFinishShow = true
        // }
        this.info = d
        this.type = d.type || d.qtype
      })
    },
  },
  mounted() {
    this.initial()
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
</style>