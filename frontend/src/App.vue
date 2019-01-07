<template>
  <div id="app">
    <el-container>
      <el-header>
      <el-menu :default-active="$route.path" mode="horizontal" router>
        <el-menu-item index="/" route="/">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的7天活动表</template>
          <el-menu-item index="2-1" route="/monday">周一</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="/login" route="/login">登录</el-menu-item>
        <el-menu-item index="/register" route="/register">注册</el-menu-item>
        <el-menu-item index="/basis" route="/basis">基本情况</el-menu-item>
        <el-menu-item index="/health" route="/health">健康相关</el-menu-item>
    </el-menu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer>
      <p style="text-align: center;"> 问卷系统 2019</p>
    </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key)
      console.log(keyPath)
    }
  }
}
</script>

<style>
</style>
