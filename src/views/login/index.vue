<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips" style="margin-top: -30px;">
        <!--<span style="margin-right:10px;">username: admin</span>
        <span style="margin-right: 10px" > password: any</span>-->
        <el-button type="text" @click="forgetPwd">forget password</el-button>
      </div>
    </el-form>

  </div>

</template>


<script>
import { validUsername } from '@/utils/validate'
import { sendAuthCode } from '@/api/user'
import { checkAuthCode } from '@/api/user'
import { findPwd } from '@/api/user'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,

    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.loading = true
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          console.log("hhhh")
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            console.log("aaaa")
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {

            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    forgetPwd(){
      this.$prompt('请输入邮箱','找回密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        sendAuthCode(value).then(response =>{
          console.log(response.data)
          if(response.data.code == 0){
            this.$message({
              type: 'success',
              message: '验证码已发送至邮箱: ' + value
            });

            setTimeout(() =>{
              this.$prompt('请输入验证码','验证码',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[\S\n\s]{6,6}$/,
                inputErrorMessage: '验证码格式不正确'
              }).then(({ value }) => {
                checkAuthCode(value).then(response =>{
                  console.log("coderes: "+response.data.code);
<<<<<<< HEAD
                   if(response.data.code == 0){
                     console.log("wd");
                     this.$prompt('请输入密码','提示', {
                       confirmButtonText: '确定',
                       cancelButtonText: '取消',
                       inputPattern: /^[\S\n\s]{6,6}$/,
                       inputErrorMessage: '密码不能少于6位'
                     }).then(({ value}) => {
                       console.log(value);
                       findPwd(value).then(response =>{
                         console.log(response.data.code);
                       })

                       setTimeout(() =>{
                         this.$message({
                           type: 'success',
                           message: '修改成功,请登陆爽爽! '
                         })
                       },3000);
                     }).catch(() => {
                       this.$message({
                         type: 'info',
                         message: '取消输入'
                       });
                     });

                   }
=======
                  this.$message({
                      type: 'success',
                      message: '验证码通过!'
                    });
>>>>>>> 权限
                }).catch(err=>{
                    this.$message({
                      type: 'error',
                      message: '验证码错误!'
                    });
                })
              }).catch(() => {
                this.$message({
                  type: 'warning',
                  message: '取消输入验证码'
                });

              });

            },3000);

          }else{
            this.$message({
              type: 'error',
              message: '邮箱错误,请检查后重新输入!: '
            });
          }
        })

      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '取消输入'
        });
      });
    },
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
