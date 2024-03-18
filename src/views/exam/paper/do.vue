<template>
  <div>
<!--    <el-row  class="do-exam-title">-->
<!--      <el-col :span="24">-->
<!--        <span :key="item.itemOrder"  v-for="item in answer.answerItems">-->
<!--             <el-tag :type="questionCompleted(item.completed)" class="do-exam-title-tag" @click="goAnchor('#question-'+item.itemOrder)">{{item.itemOrder}}</el-tag>-->
<!--        </span>-->
<!--        <span class="do-exam-time">-->
<!--          <label>剩余时间：</label>-->
<!--          <label>{{formatSeconds(remainTime)}}</label>-->
<!--        </span>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row  class="do-exam-title-hidden">-->
<!--      <el-col :span="24">-->
<!--        <span :key="item.itemOrder"  v-for="item in answer.answerItems">-->
<!--             <el-tag  class="do-exam-title-tag" >{{item.itemOrder}}</el-tag>-->
<!--        </span>-->
<!--        <span class="do-exam-time">-->
<!--          <label>剩余时间：</label>-->
<!--        </span>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <el-container  class="app-item-contain content-color">
      <el-header class="align-center">
        <h1>{{form.name}}</h1>
        <div>
          <span class="question-title-padding">试卷总分：{{form.score}}</span>
<!--          <span class="question-title-padding">考试时间：{{form.suggestTime}}分钟</span>-->
        </div>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="16">
            <el-form :model="form" ref="form" v-loading="formLoading" label-width="100px">
              <el-row :key="index"  v-for="(titleItem,index) in form.titleItems">
                <h3>{{titleItem.name}}</h3>
                <el-card class="exampaper-item-box box-card" v-if="titleItem.questionItems.length!==0">
                  <el-form-item :key="questionItem.itemOrder" :label="questionItem.itemOrder+'.'"
                                v-for="questionItem in titleItem.questionItems"
                                class="exam-question-item" label-width="50px" :id="'question-'+ questionItem.itemOrder">
                    <QuestionEdit :qType="questionItem.questionType" :question="questionItem"
                                  :answer="answer.answerItems[questionItem.itemOrder-1]"/>
                    <div>
                      Tips:{{tips}}
                    </div>
                    <a href="http://pu2lh35s.ia.aqlab.cn/" target="_blank">传送门</a>
                  </el-form-item>
                </el-card>
              </el-row>
               <el-row class="do-align-center">
                 <el-col :span="6">
                   <router-link v-if="lastId" :to="{path:'/do',query:{id:lastId, paperList:tastIdListStr}}">上一题</router-link>
                 </el-col>
                 <el-col :span="6">
                   <label for="flagInput">Flag</label>
                   <input id="flagInput" title="Flag" :value="flagValue" :placeholder="placeholdercontent"/>
                 </el-col>
                 <el-col :span="6">
                   <el-button type="primary" @click="submitForm">提交</el-button>
<!--                   <el-button>取消</el-button>-->
                 </el-col>
                 <el-col :span="6">
                   <router-link v-if="nextId" :to="{path:'/do',query:{id:nextId, paperList:tastIdListStr}}">下一题</router-link>
                 </el-col>
               </el-row>
            </el-form>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-row>
              <el-col>
                <el-card :body-style="{ padding: '0px' , 'margin': '5px 0 20px 0'}" v-loading="formLoading" class="box-card-nohover course-recommend">
<!--                  <div slot="header" class="clearfix clearfix-title">-->
<!--                    <el-row>-->
<!--                      <el-col :span="16">-->
<!--                        <div>-->
<!--                          官方推荐WriteUp-->
<!--                        </div>-->
<!--                      </el-col>-->
<!--                    </el-row>-->
<!--                  </div>-->
                  <div style="padding: 14px;" >
                        <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
                          官方推荐WriteUp
                        </el-button>
                        <el-drawer
                          title="官方推荐WriteUp"
                          :visible.sync="drawer"
                          :direction="direction"
                          :before-close="handleClose">
                          <div>视频1</div>
                          <video width="320" height="240" controls :src="videoUrl">
                            Your browser does not support the video tag.
                          </video>
                          <div>文档1</div>
                          <a src="">文档</a>
                        </el-drawer>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-card :body-style="{ padding: '0px' , 'margin': '5px 0 20px 0'}" v-loading="formLoading" class="box-card">
                  <div slot="header" class="clearfix clearfix-title">
                    <!--              <el-button style="float: right; padding: 3px 20px" type="text">_</el-button>-->
                    <el-row>
                      <el-col :span="8">
                        <div>
                          排名
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div>
                          ID
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div>
                          时间
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <!--            <img src="@/assets/exam-paper/show1.png" class="image">-->
                  <div v-for="o in 4" :key="o" style="padding: 14px;" >
                    <el-row>
                      <el-col :span="8">
                        <div>
                          排名{{o}}
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div>
                          ID
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div>
                          时间
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { formatSeconds } from '@/utils'
import QuestionEdit from '../components/QuestionEdit'
import examPaperApi from '@/api/examPaper'
import examPaperAnswerApi from '@/api/examPaperAnswer'

export default {
  components: { QuestionEdit },
  data () {
    return {
      form: {},
      formLoading: false,
      answer: {
        questionId: null,
        doTime: 0,
        answerItems: []
      },
      timer: null,
      remainTime: 0,
      tastIdList: [],
      tastIdListStr: '',
      lastId: null,
      nextId: null,
      tips: '这是Tips',
      flagValue: '',
      placeholdercontent: '这里是flag，之后要提交',

      drawer: false,
      direction: 'rtl',
      videoUrl: ''
    }
  },
  created () {
    this.handleRouteChange()
  },
  watch: {
    '$route' (to, from) {
      this.handleRouteChange() // 路由变化时执行
    }
  },
  mounted () {

  },
  beforeDestroy () {
    window.clearInterval(this.timer)
  },
  methods: {
    formatSeconds (theTime) {
      return formatSeconds(theTime)
    },
    timeReduce () {
      let _this = this
      this.timer = setInterval(function () {
        if (_this.remainTime <= 0) {
          // _this.submitForm()
          // todo 可能在这里添加考试截止之后的操作
        } else {
          ++_this.answer.doTime
          --_this.remainTime
        }
      }, 1000)
    },
    questionCompleted (completed) {
      return this.enumFormat(this.doCompletedTag, completed)
    },
    goAnchor (selector) {
      this.$el.querySelector(selector).scrollIntoView({ behavior: 'instant', block: 'center', inline: 'nearest' })
    },
    initAnswer () {
      console.log('run initAnwser')
      this.answer.answerItems.splice(0)
      this.answer.id = this.form.id
      let titleItemArray = this.form.titleItems
      for (let tIndex in titleItemArray) {
        let questionArray = titleItemArray[tIndex].questionItems
        for (let qIndex in questionArray) {
          let question = questionArray[qIndex]
          this.answer.answerItems.push({ questionId: question.id, content: null, contentArray: [], completed: false, itemOrder: question.itemOrder })
        }
      }
      console.log('answer')
      console.log(this.answer)
    },
    submitForm () {
      let _this = this
      window.clearInterval(_this.timer)
      _this.formLoading = true
      examPaperAnswerApi.answerSubmit(this.answer).then(re => {
        if (re.code === 1) {
          _this.$alert('试卷得分：' + re.response + '分', '考试结果', {
            confirmButtonText: '返回考试记录',
            callback: action => {
              _this.$router.push('/record/index')
            }
          })
        } else {
          _this.$message.error(re.message)
        }
        _this.formLoading = false
      }).catch(e => {
        _this.formLoading = false
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleRouteChange () {
      console.log('handleRouteChange')
      // console.log(this.$route.query)
      let id = this.$route.query.id
      this.tastIdListStr = this.$route.query.paperList
      this.tastIdList = JSON.parse(this.$route.query.paperList)
      console.log(this.tastIdList)
      let indexNow = this.tastIdList.indexOf(parseInt(id))
      console.log(indexNow)
      if (this.tastIdList.length === 1) {
        this.lastId = null
        this.nextId = null
      } else {
        if (indexNow === 0) {
          this.lastId = null
          this.nextId = this.tastIdList[indexNow + 1]
        } else if (indexNow > 0 && indexNow < (this.tastIdList.length - 1)) {
          this.lastId = this.tastIdList[indexNow - 1]
          this.nextId = this.tastIdList[indexNow + 1]
        } else {
          this.lastId = this.tastIdList[indexNow - 1]
          this.nextId = null
        }
      }
      let _this = this
      if (id && parseInt(id) !== 0) {
        _this.formLoading = true
        examPaperApi.select(id).then(re => {
          _this.form = re.response
          _this.remainTime = re.response.suggestTime * 60
          _this.initAnswer()
          _this.timeReduce()
          _this.formLoading = false
        })
      }
    }
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      doCompletedTag: state => state.exam.question.answer.doCompletedTag
    })
  }
}
</script>

<style lang="scss" scoped>
  .align-center {
    text-align: center
  }

  .exam-question-item {
    padding: 10px;

    .el-form-item__label {
      font-size: 15px !important;
    }
  }

  .question-title-padding {
    padding-left: 25px;
    padding-right: 25px;
  }

  .el-card ::v-deep .el-card__header {
    border-bottom: 1px solid #AE4446;
  }

  .box-card {
    color: #B0B0B0;
    background-color: rgba(0,0,0, 0);
    border: 1px solid #AE4446;
    -webkit-box-shadow: 0 2px 7px rgba(0, 129, 198, .45);
    box-shadow: inset 0 0 40px rgba(255,255,255,.30);
    -webkit-transition: ease all .3s;
    transition: ease all .3s;
  }

  .box-card:hover {
    opacity: .9;
    box-shadow: inset 0 0 0px rgba(255,255,255,.30);
  }

  .box-card-nohover {
    color: #B0B0B0;
    background-color: rgba(0,0,0, 0);
    border: 1px solid #AE4446;
    /*-webkit-box-shadow: 0 2px 7px rgba(0, 129, 198, .45);*/
    /*box-shadow: inset 0 0 40px rgba(255,255,255,.30);*/
    /*-webkit-transition: ease all .3s;*/
    /*transition: ease all .3s;*/
  }

  .course-recommend {
    margin-bottom: 20px;
  }

  .content-color {
    color: #AE4446;
  }

  a {
    color: #c7c7c7;
  }
</style>
