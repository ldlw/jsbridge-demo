import { cutPrefix } from '../utils/utils'
import { wordMap } from '../config/index'

import RecordTool from '@/components/record-tool.vue';
import ReviewTitle from "@/components/review-title.vue"
import FooterNav from "@/components/footer-nav.vue"
export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      wordMap,
    }
  },
  methods: {
    cutPrefix,
    wordToIndex(words){
      // ABC转索引 
      // words传字符串 返回对应索引 没找到就返回-1  数组就返回数组
      if (typeof words == "string") {
        return wordMap.indexOf(words)
      }
      if (typeof words == "object") {
        // 数组处理
        return words.map(v => wordMap.indexOf(v))
      } else {
        throw new Error("请输入一个字符串或字符串数组")
      }
    },
    sendAns(ans) {
      const strAns = JSON.stringify(ans)
      window.WebViewJavascriptBridge.callHandler("backResult", strAns, (msg) => {
        console.log("backResult: ", msg)
      })
    }
  },
  mounted() {
    this.reviewDeal() // 页面的方法
  },
  computed: {
    // 是否回显
    isReview() {
      return this.info.isFinishShow
    },
    ansState() {
      const ans = this.info.yourAnswer
      if (!ans.length) return -1
      if (ans.every(v => v.isRight)) return 1
      if (ans.every(v => !v.isRight)) return 0
      return 2
    }
  },
  components: {
    RecordTool,
    ReviewTitle,
    FooterNav
  }
}