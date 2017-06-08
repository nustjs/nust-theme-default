/**
 * custom nuxt configuration
 */
module.exports = {
  'plugins': [
    '~plugins/pager.js'
  ],
  'css': [
    'element-ui/lib/theme-default/pagination.css',
    'highlight.js/styles/github.css',
    'gitment/style/default.css',
    { 'src': '~assets/css/main.styl', 'lang': 'stylus' }
  ]
}
