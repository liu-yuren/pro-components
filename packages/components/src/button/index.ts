import { withInstall } from '@pro-components/utils'

import Button from './button.vue'

// 按需加载
export const MyButton =  withInstall(Button)

// 将组件导出(全局加载)
export default MyButton

