<script setup lang="ts">
import { MyButton, MyGrid, MyGridItem } from '@pro-components/components'
import { ref } from 'vue'

const collapsed = ref(false)
</script>

<template>
  <div>
    <h1>home</h1>
    <button @click="collapsed = !collapsed">
      却换 - collapsed
    </button>
    <MyButton />
    <MyGrid :cols="24" :collapsed="collapsed" :collapsed-rows="2" :gap="12">
      <MyGridItem v-for="one of 30" :span="6">
        <div style="background:#eee; height:40px">
          {{ one }}
        </div>
      </MyGridItem>
      <MyGridItem :span="6" :suffix="true">
        <div style="background:#eee; height:40px">
          展开
        </div>
      </MyGridItem>
    </MyGrid>
  </div>
</template>
