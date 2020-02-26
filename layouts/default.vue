<template>
  <el-container>
    <el-header>
      <label class="title">
        スプラトゥーン ブキ抽選
      </label>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Inkling } from '~/types'

export default {
  data (): {
    inklings: Inkling[],
    weapons: string[]
    } {
    return {
      inklings: [],
      weapons: []
    }
  }
}
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.title {
  font-size: 40px;
  font-weight: bold;
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
