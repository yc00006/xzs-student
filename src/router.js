import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
// import Layout from '@/layout'

const Layout = () => import('@/layout')

Vue.use(Router)
const router = new Router({
  routes: [
    { path: '/login', name: 'Login', component: () => import('@/views/login/index'), meta: { title: '登录', bodyBackground: 'url(' + require('./assets/2345.jpg') + ')' } },
    // { path: '/register', name: 'Register', component: () => import('@/views/register/index'), meta: { title: '注册', bodyBackground: '#fbfbfb' } },
    {
      path: '/',
      component: Layout,
      redirect: '/index',
      children: [
        {
          path: 'index',
          component: () => import('@/views/dashboard/index'),
          name: 'Dashboard',
          meta: {
            title: '首页',
            bodyBackground: 'url(' + require('./assets/756.jpg') + ')',
            levels: [1]// 1：培训用户，2：竞赛用户，3：大屏用户，4：团队用户
          }
        }
      ]
    },
    {
      path: '/exam',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/dashboard2/index'),
          name: 'Dashboard2',
          meta: { title: '竞赛首页', bodyBackground: 'url(' + require('./assets/756.jpg') + ')', levels: [2] }
        }
      ]
    },
    {
      path: '/questionlist',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/question-list/index'),
          name: 'QuestionListIndex',
          meta: { title: '赛事题目列表', bodyBackground: 'url(' + require('./assets/756.jpg') + ')', levels: [2] }
        }
      ]
    },
    {
      path: '/paper',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/paper/index'),
          name: 'PaperIndex',
          meta: { title: '试卷中心' }
        }
      ]
    },
    {
      path: '/record',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/record/index'),
          name: 'RecordIndex',
          meta: { title: '考试记录' }
        }
      ]
    },
    {
      path: '/question',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/question-error/index'),
          name: 'QuestionErrorIndex',
          meta: { title: '错题本' }
        }
      ]
    },
    {
      path: '/user',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/user-info/index'),
          name: 'UserInfo',
          meta: { title: '个人中心' }
        }
      ]
    },
    {
      path: '/user',
      component: Layout,
      children: [
        {
          path: 'message',
          component: () => import('@/views/user-info/message'),
          name: 'UserMessage',
          meta: { title: '消息中心' }
        }
      ]
    },
    { path: '/do', name: 'ExamPaperDo', component: () => import('@/views/exam/paper/do'), meta: { title: '试卷答题', bodyBackground: 'url(' + require('./assets/756.jpg') + ')', levels: [2] } },
    { path: '/edit', name: 'ExamPaperEdit', component: () => import('@/views/exam/paper/edit'), meta: { title: '试卷批改' } },
    { path: '/read', name: 'ExamPaperRead', component: () => import('@/views/exam/paper/read'), meta: { title: '试卷查看' } },
    { path: '*', component: () => import('@/views/error-page/404'), meta: { title: '404' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let user = store.state.user
  // console.log('if userInfo exists')
  // console.log(user.userInfo)
  if (user.userInfo) {
    // console.log('user.userInfo')
    // console.log(user.userInfo)
    let userInfo = user.userInfo
    if (typeof (userInfo) === 'string') {
      // console.log('type string')
      userInfo = JSON.parse(user.userInfo)
      // console.log(userInfo)
    }
    let userLevel = userInfo.userLevel
    let routeLevels = null
    // console.log('to.meta')
    // console.log(to)
    // console.log(to.meta)
    if (to.meta) {
      if (to.meta.levels) {
        routeLevels = to.meta.levels
        // console.log('routeLevels')
        // console.log(routeLevels)
        let index = routeLevels.indexOf(userLevel)
        // console.log(index)
        if (index === -1) {
          let path = ''
          switch (userLevel) {
            case 1:
              path = '/'
              break
            case 2:
              path = '/exam/index'
              break
            case 3:
              path = '/'
              break
            case 4:
              path = '/'
              break
            default:
              path = '/'
          }
          // console.log('run next path')
          next(path)
        }
      }
    }
  } else if (to.path !== '/login') {
    next('/login')
  }
  // console.log('run next')
  next()
})

export { router }
