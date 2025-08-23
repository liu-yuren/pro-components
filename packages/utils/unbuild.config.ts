import { defineBuildConfig } from 'unbuild'

/**
 * 构建配置
 * entries: 指定构建入口
 * outDir: 指定构建输出的目录
 * declaration: 是否生成 .d.ts 文件
 * clean: 是否自动清空输出dist目录
 * externals: 指定外部化依赖, 不打包到产物中
 */
export default defineBuildConfig({
  entries: ['src/index'],
  outDir: 'dist',
  declaration: true,
  clean: true,
  externals: ['vue', '@vue/shared'],
})
