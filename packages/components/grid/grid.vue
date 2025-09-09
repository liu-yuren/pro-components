<script setup lang="ts">
import type { GridProps } from './types'
import { computed, onBeforeUnmount, onMounted, provide, reactive } from 'vue'

const props = withDefaults(defineProps<GridProps>(), {
  // 显示的栅格数量
  cols: 24,
  // 是否折叠
  collapsed: false,
  // 折叠时显示的行数
  collapsedRows: 1,
  // 网格间距
  gap: 0,
})

// 响应式断点键名类型
type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// 组件内部状态：用于存储窗口宽度
const state = reactive({ width: 0 })

// 断点优先级顺序（从小到大）
const breakpointOrder: BreakpointKey[] = ['xs', 'sm', 'md', 'lg', 'xl']
// 各断点的最小宽度（单位：px）
const breakpointMin: Record<BreakpointKey, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

// 窗口宽度更新函数（监听 resize）
function updateWidth() {
  state.width = window.innerWidth
}

onMounted(() => {
  updateWidth()
  window.addEventListener('resize', updateWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth)
})

// 计算当前应使用的列数：
// - 若传入数字，直接使用
// - 若传入断点映射，按当前宽度匹配对应断点
// - 未匹配到时回退到 24 列

// 计算当前列数
const currentCols = computed(() => {
  console.log(props, 'props')

  if (typeof props.cols === 'number')
    return props.cols

  const width = state.width
  let matched: BreakpointKey = 'xs'
  for (const key of breakpointOrder) {
    if (width >= breakpointMin[key])
      matched = key
  }
  const bpCols = props.cols[matched]
  return bpCols ?? 24
})

// 归一化 gap
const normalizedGap = computed(() => {
  if (props.gap == null)
    return undefined

  if (typeof props.gap === 'number')
    return `${props.gap}px`

  const [rowGap, colGap] = props.gap
  return `${rowGap}px ${colGap}px`
})

// CSS Grid 构建等分列网格
const gridStyle = computed(() => ({
  display: 'grid',
  gridGap: normalizedGap.value,
  gridTemplateColumns: `repeat(${currentCols.value}, minmax(0, 1fr))`,
  gridAutoFlow: 'row dense',
}))

// provide 当前列数给子项，用于计算 suffix 的定位
provide('my-grid-cols', currentCols)
</script>

<template>
  <div class="my-grid" :style="gridStyle">
    <slot />
  </div>
</template>
