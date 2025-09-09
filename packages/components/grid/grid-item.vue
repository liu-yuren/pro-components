<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, reactive } from 'vue'

defineOptions({
  name: 'MyGridItem',
})

// 组件 Props：
// - span：默认所占列数
// - xs/sm/md/lg/xl：按断点覆盖的列数
// - offset：起始偏移列（从 0 开始）
// - suffix：是否吸附到末尾（从最后一列向前占据 span 个列）
const props = withDefaults(defineProps<GridItemProps>(), {
  offset: 0,
  span: 24,
  suffix: false,
})

interface GridItemProps {
  // 栅格左侧的间隔格数
  offset?: number
  // 栅格占据的列数
  span?: number
  // 栅格后缀
  suffix?: boolean
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

// 响应式断点键名类型
type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// 内部状态：窗口宽度
const state = reactive({ width: 0 })

// 断点顺序与最小宽度（单位：px）
const breakpointOrder: BreakpointKey[] = ['xs', 'sm', 'md', 'lg', 'xl']
const breakpointMin: Record<BreakpointKey, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

// 更新窗口宽度
function updateWidth() {
  state.width = window.innerWidth
}

// 生命周期：挂载绑定监听 / 卸载移除监听
onMounted(() => {
  updateWidth()
  window.addEventListener('resize', updateWidth, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth)
})

// 计算当前列数：优先匹配断点覆盖，否则使用 span
const currentSpan = computed(() => {
  const width = state.width
  let matched: BreakpointKey = 'xs'
  for (const key of breakpointOrder) {
    if (width >= breakpointMin[key])
      matched = key
  }
  const mapped: Partial<Record<BreakpointKey, number>> = {
    xs: props.xs,
    sm: props.sm,
    md: props.md,
    lg: props.lg,
    xl: props.xl,
  }
  const bpSpan = mapped[matched]
  return bpSpan ?? props.span
})

// 注入父级网格列数（用于 suffix 右吸附定位）
const injectedCols = inject<any>('my-grid-cols', computed(() => 24))

// 项样式：通过 gridColumn 控制跨列
const itemStyle = computed(() => {
  const s = currentSpan.value
  // suffix: 让项目以最后一列为结束点，向前占据 s 列；支持右侧 offset
  if (props.suffix) {
    const totalCols: number = Number(injectedCols?.value ?? 24)
    const rightOffset = Math.max(0, props.offset || 0)
    const endLine = Math.max(1, totalCols - rightOffset + 1)
    const startLine = Math.max(1, endLine - s)
    return {
      gridColumn: `${startLine} / ${endLine}`,
      minWidth: 0,
    } as Record<string, string | number>
  }
  // 带 offset: 指定起始列（offset 从 0 计）再向后跨 s 列
  if (props.offset > 0) {
    return {
      gridColumn: `${props.offset + 1} / span ${s}`,
      minWidth: 0,
    } as Record<string, string | number>
  }
  // 默认：仅跨 s 列
  return {
    gridColumn: `span ${s} / span ${s}`,
    minWidth: 0,
  } as Record<string, string | number>
})
</script>

<template>
  <div class="my-grid-item" :style="itemStyle">
    <slot />
  </div>
</template>

<style scoped>
.my-grid-item {
  box-sizing: border-box;
}
</style>
