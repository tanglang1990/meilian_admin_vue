<template>
  <div class="login_container">
    <div class="login_box">
      <!--图标-->
      <div class="avatar_box">
        <img
          src="../assets/logo.png"
          alt=""
        >
      </div>
      <!--登录表单-->
      <a-form
        :form="form"
        @submit="handleSubmit"
        class="login_form"
      >
        <a-form-item
          :validate-status="userNameError() ? 'error' : ''"
          :help="userNameError() || ''"
        >
          <a-input
            v-decorator="[
          'username',
          { rules: [{ required: true, message: '请输入您的用户名' }] },
        ]"
            placeholder="用户名"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color:rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item
          :validate-status="passwordError() ? 'error' : ''"
          :help="passwordError() || ''"
        >
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入您的密码!' }] },
        ]"
            type="password"
            placeholder="密码"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color:rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item class="btns">
          <a-button
            type="primary"
            html-type="submit"
            :disabled="hasErrors(form.getFieldsError())"
          >
            登录
          </a-button>
          <a-button
            type="danger"
            html-type="submit"
            @click="resetForm"
          >
            重置
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' })
    }
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields()
    })
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('username') && getFieldError('userName')
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('password') && getFieldError('password')
    },
    async handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values)
          this.$http
            .post('login', values)
            .then(response => {
              window.sessionStorage.setItem('token', response.data.token)
              this.$message.success('登录成功!')
              this.$router.push('/home')
            })
            .catch(error => {
              console.log(error)
              this.$message.info('用户名或密码错误,登录失败!')
            })
        }
      })
    },
    resetForm() {
      this.form.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 350px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
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
  button {
    margin: 5px;
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
