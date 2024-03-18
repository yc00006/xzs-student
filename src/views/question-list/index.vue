<template>
  <div style="margin-top: 10px">
<!--    <el-row>-->
<!--      <el-carousel :interval="5000" arrow="always" type="card">-->
<!--        <el-carousel-item >-->
<!--          <img src="@/assets/carousel/1.png" class="carousel-img">-->
<!--        </el-carousel-item>-->
<!--        <el-carousel-item >-->
<!--          <img src="@/assets/carousel/2.png" class="carousel-img">-->
<!--        </el-carousel-item>-->
<!--        <el-carousel-item >-->
<!--          <img src="@/assets/carousel/3.png" class="carousel-img">-->
<!--        </el-carousel-item>-->
<!--        <el-carousel-item >-->
<!--          <img src="@/assets/carousel/4.png" class="carousel-img">-->
<!--        </el-carousel-item>-->
<!--      </el-carousel>-->
<!--    </el-row>-->
    <el-row class="app-item-contain">
      <el-col :span="16">
        <el-row>
          <el-col :span="16">
            <h3 class="index-title-h3" style="border-left: solid 10px #3651d4;">赛事题目列表</h3>
          </el-col>
          <el-col :span="8">
            <div class="index-title-h3" style="margin-top: 22px;margin-bottom: 22px;">
              <router-link to="/exam/index">返回赛事中心</router-link>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div style="padding-left: 15px">
            <el-collapse  v-loading="taskLoading"  accordion v-if="taskList.length!==0" class="custom-collapse" active-class="custom-active">
              <el-collapse-item :title="taskItem.title" :name="taskItem.id" :key="taskItem.id" v-for="taskItem in taskList">
                <template slot="title">
                  <el-row class="title_el_row">
                    <el-col :span="4" >
                      <div>
                        {{taskItem.title}}
                      </div>
                    </el-col>
                    <el-col :span="4" >
                      <div>
                        排名
                      </div>
                    </el-col>
                    <el-col :span="4" >
                      <div>
                        类型
                      </div>
                    </el-col>
                    <el-col :span="4" >
                      <div>
                        分值
                      </div>
                    </el-col>
                    <el-col :span="4" >
                      <div>
                        答题状态
                      </div>
                    </el-col>
                  </el-row>
                </template>
                <table class="index-task-table">
                  <tr v-for="paperItem in taskItem.paperItems" :key="paperItem.examPaperId" class="body_tr">
                    <td class="index-task-table-paper" width="15%">
                      {{paperItem.examPaperName}}
                    </td>
                    <td class="index-task-table-paper" width="16.5%">
                      排名
                    </td>
                    <td class="index-task-table-paper" width="16.5%">
                      类型
                    </td>
                    <td class="index-task-table-paper" width="18%">
                      分值
                    </td>
                    <td width="70px">
<!--                      <el-tag :type="statusTagFormatter(paperItem.status)" v-if="paperItem.status !== null" size="mini">-->
<!--                        {{ statusTextFormatter(paperItem.status) }}-->
<!--                      </el-tag>-->
                      {{ statusTextFormatter(paperItem.status) }}
                    </td>
                    <td width="80px">
                      <router-link target="_blank" :to="{path:'/do',query:{id:paperItem.examPaperId, paperList:JSON.stringify(taskItem.paperItems.map((item)=>{
                        return item.examPaperId
                      }))}}" v-if="paperItem.status === null">
                        <el-button  type="text" size="small">开始答题</el-button>
                      </router-link>
                      <router-link target="_blank" :to="{path:'/edit',query:{id:paperItem.examPaperAnswerId}}" v-else-if="paperItem.status === 1">
                        <el-button  type="text" size="small">批改试卷</el-button>
                      </router-link>
                      <router-link target="_blank" :to="{path:'/read',query:{id:paperItem.examPaperAnswerId}}" v-else-if="paperItem.status === 2">
                        <el-button  type="text" size="small">查看试卷</el-button>
                      </router-link>
                    </td>
                  </tr>
                </table>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-row>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-card :body-style="{ padding: '0px' , 'margin': '5px 0 20px 0'}" v-loading="loading" class="box-card">
          <div slot="header" class="clearfix">
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
          <div v-for="o in 4" :key="o" style="padding: 14px;" class="box-card-body">
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
<!--    <el-row class="app-item-contain">-->
<!--      <h3 class="index-title-h3">固定试卷（删除）</h3>-->
<!--      <div style="padding-left: 15px">-->
<!--        <el-col :span="4" v-for="(item, index) in fixedPaper" :key="index" :offset="index > 0 ? 1 : 0">-->
<!--          <el-card :body-style="{ padding: '0px' }" v-loading="loading">-->
<!--            <img src="@/assets/exam-paper/show1.png" class="image">-->
<!--            <div style="padding: 14px;">-->
<!--              <span>{{item.name}}</span>-->
<!--              <div class="bottom clearfix">-->
<!--                <router-link target="_blank" :to="{path:'/do',query:{id:item.id}}">-->
<!--                  <el-button type="text" class="button">开始做题</el-button>-->
<!--                </router-link>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--      </div>-->
<!--    </el-row>-->
<!--    <el-row class="app-item-contain">-->
<!--      <h3 class="index-title-h3" style="border-left: solid 10px rgb(220, 208, 65);">时段试卷</h3>-->
<!--      <div style="padding-left: 15px">-->
<!--        <el-col :span="4" v-for="(item, index) in timeLimitPaper" :key="index" :offset="index > 0 ? 1 : 0">-->
<!--          <el-card :body-style="{ padding: '0px' }" v-loading="loading">-->
<!--            <img src="@/assets/exam-paper/show2.png" class="image">-->
<!--            <div style="padding: 14px;">-->
<!--              <span>{{item.name}}</span>-->
<!--              <p class="index-limit-paper-time">-->
<!--                <span>{{item.startTime}}</span>-->
<!--                <br/>-->
<!--                <span>{{item.endTime}}</span>-->
<!--              </p>-->
<!--              <div class="bottom clearfix">-->
<!--                <router-link target="_blank" :to="{path:'/do',query:{id:item.id}}">-->
<!--                  <el-button type="text" class="button">开始做题</el-button>-->
<!--                </router-link>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--      </div>-->
<!--    </el-row>-->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import indexApi from '@/api/questionList'
export default {
  data () {
    return {
      fixedPaper: [],
      timeLimitPaper: [],
      pushPaper: [],
      loading: false,
      taskLoading: false,
      taskList: []
    }
  },
  created () {
    let _this = this
    this.loading = true
    indexApi.index().then(re => {
      _this.fixedPaper = re.response.fixedPaper
      _this.timeLimitPaper = re.response.timeLimitPaper
      _this.pushPaper = re.response.pushPaper
      _this.loading = false
    })

    this.taskLoading = true
    indexApi.task().then(re => {
      _this.taskList = re.response
      _this.taskLoading = false
    })
  },
  methods: {
    statusTagFormatter (status) {
      return this.enumFormat(this.statusTag, status)
    },
    statusTextFormatter (status) {
      return this.enumFormat(this.statusEnum, status)
    }
  },
  computed: {
    ...mapGetters('enumItem', [
      'enumFormat'
    ]),
    ...mapState('enumItem', {
      statusEnum: state => state.exam.examPaperAnswer.statusEnum,
      statusTag: state => state.exam.examPaperAnswer.statusTag
    })
  }
}
</script>

<style lang="scss" scoped>
  .index-title-h3 {
    font-size: 22px;
    font-weight: 400;
    /*color: #1f2f3d;*/
    color: #AE4446;
    border-left: solid 10px #2ce8b4;
    padding-left: 10px;
  }

  /*.el-carousel__item h3 {*/
  /*  color: #475669;*/
  /*  font-size: 18px;*/
  /*  opacity: 0.75;*/
  /*  line-height: 300px;*/
  /*  margin: 0;*/
  /*}*/

  /*.el-carousel__item:nth-child(2n) {*/
  /*  background-color: #99a9bf;*/
  /*}*/

  /*.el-carousel__item:nth-child(2n+1) {*/
  /*  background-color: #d3dce6;*/
  /*}*/

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 50%;
    height: 80%;
    display: block;
    margin: 20px auto 10px auto;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  /*.el-collapse-item__header {*/
  /*  background-color: rgba(202, 202, 202, 0.26);*/
  /*}*/

  ::v-deep .custom-collapse .el-collapse-item {
    margin-bottom: 20px;
  }

  ::v-deep .custom-collapse .el-collapse-item__header {
    /*border-bottom: 1px solid #AE4446;*/
    background-color: rgba(202,202,202,0);
    border: 1px solid rgba(202,202,202,0.26);
    color: #888;
    /*margin-bottom: 25px;*/
  }

  ::v-deep .custom-collapse .el-collapse-item__header.is-active {
    /*border-bottom: 1px solid #AE4446;*/
    background-color: rgba(202,202,202,0.26);
    border: 1px solid rgba(202,202,202,0.26);
    color: #ddd;
    /*margin-bottom: 25px;*/
  }

  ::v-deep .custom-collapse .el-collapse-item__content {
    border: 1px solid rgba(202,202,202,0.26);
    padding-bottom: 0;
    /*margin-bottom: 25px;*/
  }

  ::v-deep .custom-collapse .el-collapse-item__wrap {
    background-color: rgba(202,202,202,0);
    border-bottom: 1px solid rgba(202, 202, 202, 0)
  }

  custom-active {
    /*border-bottom: 1px solid #AE4446;*/
    background-color: rgba(202,202,202,0.26);
    border-bottom: 1px solid rgba(202,202,202,0);
  }

  /*.custom-collapse.el-collapse-item__header.is-active {*/
  /*  background-color: rgba(202,202,202,0.26) !important;*/
  /*  border: 1px solid rgba(202,202,202,0.26);*/
  /*}*/

  .title_el_row {
    width: 100%;
    /*color: #ddd;*/
  }

  .custom-collapse {
    /*border-top: 1px solid #AE4446;//这两个border一个都不留的话右侧会有滚动条，点开折叠的时候的闪烁也是滚动条出现又消失造成的*/
    /*border-bottom: 1px solid #AE4446;*/
    /*border: 1px solid rgba(202,202,202,0.26);*/
    /*background-color: rgba(202,202,202,0);*/
    border-top: 1px solid rgba(202,202,202,0.26);
    border-bottom: 1px solid rgba(202,202,202,0);
  }

  .body_tr {
    color: #888;
    transition: all linear .3s ;
    -webkit-transition: all linear .3s ;
  }

  .body_tr:hover {
    color: #ebd393;
  }

  /*.clearfix:before,*/
  /*.clearfix:after {*/
  /*  display: table;*/
  /*  content: "";*/
  /*}*/
  /*.clearfix:after {*/
  /*  clear: both*/
  /*}*/

  /*.el-card ::v-deep .el-card__body {*/
  /*  color: #B0B0B0;*/
  /*  border: 1px solid #676767;*/
  /*  -webkit-box-shadow: 0 2px 7px rgba(0, 129, 198, .45);*/
  /*  box-shadow: inset 0 0 40px rgba(255,255,255,.30);*/
  /*  transition: ease all .3s;*/
  /*}*/
  /*.el-card ::v-deep .el-card__body:hover {*/
  /*  opacity: .9;*/
  /*  box-shadow: inset 0 0 0px rgba(255,255,255,.30);*/
  /*}*/
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

</style>
