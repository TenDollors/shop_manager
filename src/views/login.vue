<template>
  <div class="login-container">
    <div class="login_box">
      <div class="img_box">
        <img :src="avatarUrl">
      </div>
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="login_form">
        <el-form-item label="用户名"
                      prop="username">

          <el-input type="text"
                    v-model="ruleForm.username"
                    autocomplete="off"
                    placeholder="请输入登入账号"
                    prefix-icon="el-icon-s-custom">
          </el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input type="password"
                    v-model="ruleForm.password"
                    autocomplete="off"
                    placeholder="请输入密码"
                    prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="login">提交</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {

      avatarUrl: require('@/assets/003.jpg'),
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
          { min: 3, max: 8, message: '账户名的长度为3-8个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 3, max: 8, message: '密码的长度为3-8个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      const that = this
      // 发送前验证
      this.$refs.ruleForm.validate(async function (validated, object) {
        if (!validated) {
        }
        const { data: res } = await that.$http.post('/api/private/v1/login', that.ruleForm)
        if (res.meta.status === 200) {
          // 请求成功
          console.log(res.data.token)
          that.$msg({
            message: '恭喜您 登入成功',
            type: 'success'
          })
          // 登陆成功 保存token
          window.sessionStorage.setItem('token', res.data.token)
          // 跳转页面
          console.log(res)
          that.$router.push('/home')
        } else {
          that.$msg({
            message: '未知错误，登录失败',
            type: 'error'
          })
        }
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // resetForm (formName) {
    //   this.$refs[formName].resetFields()
    // },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .img_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
