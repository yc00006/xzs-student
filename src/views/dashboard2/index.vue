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
<!--    <el-row class="app-item-contain">-->
<!--      <h3 class="index-title-h3" style="border-left: solid 10px #3651d4;">任务中心</h3>-->
<!--      <div style="padding-left: 15px">-->
<!--        <el-collapse  v-loading="taskLoading"  accordion v-if="taskList.length!==0">-->
<!--          <el-collapse-item :title="taskItem.title" :name="taskItem.id" :key="taskItem.id" v-for="taskItem in taskList">-->
<!--            <table class="index-task-table">-->
<!--              <tr v-for="paperItem in taskItem.paperItems" :key="paperItem.examPaperId">-->
<!--                <td class="index-task-table-paper">-->
<!--                  {{paperItem.examPaperName}}-->
<!--                </td>-->
<!--                <td width="70px">-->
<!--                  <el-tag :type="statusTagFormatter(paperItem.status)" v-if="paperItem.status !== null" size="mini">-->
<!--                    {{ statusTextFormatter(paperItem.status) }}-->
<!--                  </el-tag>-->
<!--                </td>-->
<!--                <td width="80px">-->
<!--                  <router-link target="_blank" :to="{path:'/do',query:{id:paperItem.examPaperId}}" v-if="paperItem.status === null">-->
<!--                    <el-button  type="text" size="small">开始答题</el-button>-->
<!--                  </router-link>-->
<!--                  <router-link target="_blank" :to="{path:'/edit',query:{id:paperItem.examPaperAnswerId}}" v-else-if="paperItem.status === 1">-->
<!--                    <el-button  type="text" size="small">批改试卷</el-button>-->
<!--                  </router-link>-->
<!--                  <router-link target="_blank" :to="{path:'/read',query:{id:paperItem.examPaperAnswerId}}" v-else-if="paperItem.status === 2">-->
<!--                    <el-button  type="text" size="small">查看试卷</el-button>-->
<!--                  </router-link>-->
<!--                </td>-->
<!--              </tr>-->
<!--            </table>-->
<!--          </el-collapse-item>-->
<!--        </el-collapse>-->
<!--      </div>-->
<!--    </el-row>-->
    <el-row>
      <h3 class="index-title-h3">赛事中心</h3>
    </el-row>
    <el-row class="app-item-contain" style="display: flex;flex-wrap: wrap;">
<!--      <h3 class="index-title-h3">赛事中心</h3>-->
<!--      <div style="padding-left: 15px">-->
        <el-col :span="7" v-for="(item, index) in fixedPaper" :key="index" :offset="1">
<!--        <el-col :span="6" v-for="(item, index) in fixedPaper" :key="index" >-->
          <el-card :body-style="{ padding: '0px' , 'margin': '5px 0 20px 0'}" v-loading="loading" class="box-card">
            <div slot="header" class="clearfix clearfix-title">
              <span>{{item.name}}</span>
<!--              <el-button style="float: right; padding: 3px 20px" type="text">_</el-button>-->
            </div>
<!--            <img src="@/assets/exam-paper/show1.png" class="image">-->
            <div style="padding: 14px;" class="box-card-body">
<!--              <span>{{item.name}}</span>-->
<!--              <span>{{item}}</span>-->
              <div>赛事名称：{{item.name}}</div>
              <div>赛事状态：</div>
              <div>题目数：</div>
              <div class="bottom clearfix">
<!--                <router-link target="_blank" :to="{path:'/do',query:{id:item.id}}">-->
<!--                  <el-button type="text" class="button">题目列表</el-button>-->
<!--                </router-link>-->
                <router-link :to="{path:'/questionlist/index',query:{id:item.id}}">
                  <el-button type="text" class="button">题目列表</el-button>
                </router-link>
              </div>
            </div>
          </el-card>
        </el-col>
<!--      </div>-->
    </el-row>
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
import indexApi from '@/api/dashboard'
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

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

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

  .box-card {
    background-color: rgba(0,0,0, 0);
    border: 0px solid #fff;
    /*-webkit-box-shadow: 0 2px 7px rgba(0, 129, 198, .45);*/
    /*box-shadow: inset 0 0 40px rgba(255,255,255,30%);*/
    width: 100%;
    max-width: 350px;
  }

  .box-card:hover .clearfix-title {
    color: #000000;
    background-image: url('../../assets/20210111131406.png');
  }

  .box-card-body:hover {
    color: #ebd393;
  }

  .clearfix-title {
    background-image: url('../../assets/20210111131419.png');
    /*background-size: cover;*/
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;

    padding: 9px 25px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-card ::v-deep .el-card__header {
    color: #B0B0B0;
    border: 0px solid #676767;
    /*background-image: url('../../assets/20210111131419.png');*/
    /*background-size: cover;*/
    padding: 0px 0px;
  }

  /*.el-card ::v-deep .el-card__header:hover {*/
  /*  color: #000000;*/
  /*  background-image: url('../../assets/20210111131406.png');*/
  /*}*/

  .el-card ::v-deep .el-card__body {
    color: #B0B0B0;
    border: 1px solid #676767;
    -webkit-box-shadow: 0 2px 7px rgba(0, 129, 198, .45);
    box-shadow: inset 0 0 40px rgba(255,255,255,.30);
    transition: ease all .3s;
  }

  .el-card ::v-deep .el-card__body:hover {
    opacity: .9;
    box-shadow: inset 0 0 0px rgba(255,255,255,.30);
  }
</style>
