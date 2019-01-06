<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <el-card id="basis-card">
          <div slot="header" class="clearfix">
            <span>基本情况</span>
          </div>
          <div>
            <el-row type="flex" justify="center">
              <el-col :span="16">
                <el-form label-position="left" label-width="120px" :model="basisForm" :rules="rules" ref="basisForm">
                  <el-form-item label="身高" prop="height">
                    <el-input v-model="basisForm.height" placeholder="请输入身高" style="width:200px"></el-input>
                    <span>(公斤/kg)</span>
                  </el-form-item>
                  <el-form-item label="体重" prop="weight">
                    <el-input v-model="basisForm.weight" placeholder="请输入体重" style="width:200px"></el-input>
                    <span>(厘米/cm)</span>
                  </el-form-item>
                  <p class="pclass">请填写你最近一次体质测试的成绩</p>
                  <el-form-item label="肺活量" prop="pulmonary">
                    <el-input v-model="basisForm.pulmonary" placeholder="请输入肺活量" style="width:200px"></el-input>
                    <span>(毫升/ml)</span>
                  </el-form-item>
                  <el-form-item label="坐位体前屈" prop="sitReach">
                    <el-input v-model="basisForm.sitReach" placeholder="请输入坐位体前屈值" style="width:200px"></el-input>
                    <span>(厘米/cm)</span>
                  </el-form-item>
                  <el-form-item label="50米" prop="fifty">
                    <el-input v-model="basisForm.fifty" placeholder="请输入50米成绩" style="width:200px"></el-input>
                    <span>(秒)</span>
                  </el-form-item>
                  <el-form-item label="800米/1000米" prop="enduranceRun">
                    <el-input v-model="basisForm.enduranceRun" placeholder="请输入800米/1000米成绩" style="width:200px"></el-input>
                    <span>(秒)</span>
                    <br>
                    <span>如果记不起来准确时间，请勾选成绩的范围区间 (单位分/秒) </span>
                    <br>
                    <span>男生: </span>
                    <el-radio-group v-model="basisForm.enduranceRun">
                      <el-radio :label="b1">小于3.17</el-radio>
                      <el-radio :label="b2">3.18-3.57</el-radio>
                      <el-radio :label="b3">3.58-4.52</el-radio>
                      <el-radio :label="b4">4.53-6.12</el-radio>
                      <el-radio :label="b5">大于6.12</el-radio>
                    </el-radio-group>
                    <br>
                    <span>女生: </span>
                    <el-radio-group v-model="basisForm.enduranceRun">
                      <el-radio :label="g1">小于3.18</el-radio>
                      <el-radio :label="g2">3.19-3.57</el-radio>
                      <el-radio :label="g3">3.58-4.44</el-radio>
                      <el-radio :label="g4">4.45-5.24</el-radio>
                      <el-radio :label="g5">大于5.24</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Basis',
  data () {
    return {
      b1: '<3.17',
      b2: '3.18-3.57',
      b3: '3.58-4.52',
      b4: '4.53-6.12',
      b5: '>6.12',
      g1: '<3.18',
      g2: '3.19-3.57',
      g3: '4-4.44',
      g4: '4.45-5.24',
      g5: '>5.24',
      basisForm: {
        height: '',
        weight: '',
        pulmonary: '',
        sitReach: '',
        fifty: '',
        enduranceRun: ''
      },
      rules: {
        height: [
          { required: true, message: '请输入身高', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入体重', trigger: 'blur' }
        ],
        pulmonary: [
          { required: true, message: '请输入肺活量', trigger: 'blur' }
        ],
        sitReach: [
          { required: true, message: '请输入坐位体前屈值', trigger: 'blur' }
        ],
        fifty: [
          { required: true, message: '请输入50米成绩', trigger: 'blur' }
        ],
        enduranceRun: [
          { required: true, message: '请输入800米/1000米成绩', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    button () {
      console.log(this.basisForm.enduranceRun)
    }
  }
}
</script>

<style lang="stylus">
#login-card {
  margin-top: 50px
}

.pclass{
  color:blue;
  font-size:20px;
  font-weight:blod;
}
</style>
