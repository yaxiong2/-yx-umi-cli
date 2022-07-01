import { defineConfig } from 'umi'
export default defineConfig({
  nodeModulesTransform: {
    type: 'none'
  },
  title: '文档',
  links: [{ rel: 'icon', href: '/favicon.ico' }],
  fastRefresh: {},
  base: '/',
  publicPath: './',
  hash: true,
  history: {
    type: 'hash'
  }
})
