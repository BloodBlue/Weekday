<template>
  <div>
    <el-table :data="tableData" height="600">
      <el-table-column fixed prop="name" label="姓名"></el-table-column>
      <el-table-column fixed prop="school_name" label="学校"></el-table-column>
      <el-table-column fixed prop="grade" label="年级"></el-table-column>
      <el-table-column fixed prop="gender" label="性别"></el-table-column>
      <el-table-column fixed prop="id_number" label="学号"></el-table-column>
      <el-table-column fixed prop="email" label="邮箱"></el-table-column>
      <el-table-column fixed prop="sevendays" label="7天活动"></el-table-column>
      <el-table-column fixed prop="submit_phase1" label="调查问卷"></el-table-column>
      <el-table-column fixed prop="submit_phase2" label="活动频率"></el-table-column>
    </el-table>
    <div style="text-align:center" @click="download()">
      <a href="javascript:;" class="down">下载</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    download () {
      this.$ajax.get('/questionnaires/result',
        {headers: {'Authorization': localStorage.token}, responseType: 'arraybuffer'}
      ).then((val) => {
        console.log(val)
        let blob = new Blob([val.data.data], {type: 'application/vnd.ms-excel'})
        let objectUrl = URL.createObjectURL(blob)
        console.log(objectUrl)
        // window.open(objectUrl)
        window.location.href = objectUrl
      })
    },
    getGrid () {
      console.log(localStorage.token)
      this.$ajax.get('/users/information?page=1',
        {headers: {'Authorization': localStorage.token}, withCredentials: true}
      ).then((val) => {
        var data = val.data.data.data
        console.log(data)
        for (var index in data) {
          this.tableData.push(data[index])
        }
      })
    }
  },
  mounted () {
    this.getGrid()
  }
}
</script>

<style lang="stylus">
.down
  color green
  font-size 16px
</style>
