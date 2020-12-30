import Vue from 'vue'
import Router from 'vue-router'
const Resetpass = import('../page/resetpass/resetpass.vue');
const Person = import('../page/person/person.vue');
const Homeperson = import('../page/person/subperson/homeperson.vue');
const Article = import('../page/person/subperson/article.vue');
const Attention = import('../page/person/subperson/attention.vue');
const Fans = import('../page/person/subperson/fans.vue');
const Replyarticle = import('../page/person/subperson/replyarticle.vue');
const Information = import('../page/person/subperson/information.vue');
const Hispage = import('../page/hispage/hispage.vue');
const Hishomeperson = import('../page/hispage/subperson/hishomeperson.vue');
const Hisarticle = import("../page/hispage/subperson/hisarticle.vue");
const Hisattention = import('../page/hispage/subperson/hisattention.vue');
const Hisfans = import('../page/hispage/subperson/hisfans.vue');
const Settings = import('../page/Settings/Setting.vue');
const Setinfo = import('../page/Settings/subsetinfo/setinfo.vue');
const Helps = import('../page/helps/helps.vue');
const Suggest = import('../page/suggest/suggest.vue');
const Suggestdetail = import('../page/suggest/suggestdetail.vue');
const Nonetwork = import('../page/nonetwork/nonetwork.vue');
const Search = import('../page/search/search.vue')
const Publish = import('../page/publish/publish.vue')
const Publishvideo = import('../page/publishvideo/publishvideo.vue')
const Rule = import('../page/rule/rule.vue')
const Attentionset = import('../page/attentionset/attentionset.vue')
const Basicdataset = import('../page/basicdataset/basicdataset.vue')
const Header = import("../components/header/header.vue")
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/user/',
  routes: [
    {
      path: '/search',
      name: 'Search',
      // meta: {
      //   requireAuth: true
      // },
      component: () => Search
    },
    {
      path: '/header',
      name: 'Header',
      // meta: {
      //   requireAuth: true
      // },
      component: () => Header
    },
    {
      path: '/resetpass',
      name: 'resetpass',
      component: () => Resetpass
    },
    {
      path: '/settings',
      name: 'settings',
      meta: {
        requireAuth: true
      },
      component: () => Settings
    },
    {
      path: '/setinfo',
      name: 'setinfo',
      component: () => Setinfo
    },
    {
      path: '/person',
      name: 'person',
      meta: {
        requireAuth: true
      },
      redirect:"/person/homeperson/:user_uid",
      component: () => Person,
      children:[
        {
          path:"homeperson/:user_uid",
          name:"homeperson",
          component: () => Homeperson,
        },
        {
          path:"article/:user_uid",
          name:"article",
          component: () => Article,
        },
        {
          path:"attention/:user_uid",
          name:"attention",
          component: () => Attention,
        },
        {
          path:"fans",
          name:"fans",
          component: () => Fans,
        },
        {
          path:"replyarticle/:user_uid",
          name:"replyarticle",
          component: () => Replyarticle,
        },
        {
          path:"information/:user_uid",
          name:"information",
          component: () => Information,
        },
      ]
    },
    {
      path: '/hispage',
      name: 'hispage',
      meta: {
        requireAuth: true
      },
      redirect:"/hispage/hishomeperson",
      component: () => Hispage,
      children:[
        {
          path:"hishomeperson",
          name:'hishomeperson',
          component: () => Hishomeperson,
        },
        {
          path:"hisarticle",
          component: () => Hisarticle,
        },
        {
          path:"hisattention",
          component: () => Hisattention,
        },
        {
          path:"hisfans",
          component: () => Hisfans,
        },
      ]
    },
    {
      path: '/helps',
      name: 'helps',
      component: () => Helps
    },
    {
      path: '/suggest',
      name: 'suggest',
      meta: {
        requireAuth: true
      },
      component: () => Suggest,
    },
    {
      path: '/suggestdetail',
      name: 'suggestdetail',
      meta: {
        requireAuth: true
      },
      component: () => Suggestdetail,
    },
    {
      path: '/nonetwork',
      name: 'nonetwork',
      component: () => Nonetwork,
    },
    {
      path: '/publish',
      name: 'publish',
      meta: {
        requireAuth: true
      },
      component: () => Publish,
    },
    {
      path: '/publishvideo',
      name: 'publishvideo',
      meta: {
        requireAuth: true
      },
      component: () => Publishvideo,
    },
    {
      path: '/rule',
      name: 'rule',
      component: () => Rule,
    },
    {
      path: '/attentionset',
      name: 'attentionset',
      component: () => Attentionset,
    },
    {
      path: '/basicdataset',
      name: 'basicdataset',
      component: () => Basicdataset,
    }
  ]
})
