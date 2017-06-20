/**
 * custom nust configuration
 */
module.exports = {
  // gitment
  gitment: {
    owner: 'mamboer',
    repo: 'nust-theme-default',
    oauth: {
      client_id: '4577fc17d10b9bc43ac8',
      client_secret: '13f02cac93046f3f9c74e5aafa34e74add6c291f'
    }
  },
  // feed
  feed: {
    en: {
      title: 'Nust.js - A modern static site engine',
      desc: 'A modern static site generator built on top of Nuxt.js and Vue.js',
      show_content: true,
      type: 'rss2',
      use_default_posts: true
    },
    'zh-CN': {
      title: 'Nust.js - Vue静态站点引擎',
      desc: 'Nust.js 是一个基于 Nuxt.js 和 Vue.js 的轻量级静态站点应用框架，可充当静态站点引擎生成静态站点应用，具有优雅的代码结构分层和热加载等特性。',
      show_content: true,
      type: 'atom'
    }
  }
}
