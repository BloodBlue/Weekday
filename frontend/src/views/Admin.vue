<template>
  <div>
    <div style="text-align:center">
      <el-button type="primary" @click="download()">下载
        <i class="el-icon-download el-icon--right"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
    }
  },
  methods: {
    download () {
      window.open('http://106.14.140.30:5000/questionnaires/result')
    }
  }
}
</script>

<style lang="stylus">

</style>
