<template>
  <div class="login_page">
    <h3>login</h3>
    <button @click="show()">show/not show</button>
    <!-- 触发这个transition? v-show v-if router 切换 mounted -->
    <transition name='form-fade' mode="in-out" v-if="showLogin">
      <section class="form_container" >
        <div class="manage-tip">
          <span class="title">后台管理系统</span>
        </div>
        <el-form 
        :model="loginForm" 
        :rules="rules" 
        ref="loginForm" 
        class="loginForm"
        >
          <el-form-item prop="username">
            <span class="fa-tips">
              <i class="fa fa-user"> </i>
            </span>
            <!-- <el-input 
            v-model="input" 
            placeholder="用户名" 
            type="text"
            class="area"
            ></el-input> -->
            <el-input 
            class="area" 
            type="text" 
            placeholder="用户名"
            v-model="loginForm.username" 
            />
            <el-input 
            class="area" 
            type="password" 
            placeholder="密码" 
            v-model="loginForm.password"
            />
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  // 表单提交后会有登录状态 vuex 
  // 提交过程中 字段报错 v-model 自身的
  data(){
    return {
      showLogin:true,
      loginForm:{
        username:'',
        password:''
      },
      rules: {
					username: [
			      { 
              required: true, 
              message: '请输入用户名',       
              trigger: 'blur' 
            },
						{ 
              min: 2, 
              max: 8, 
              message: '长度在 2 到 8 个字符', 
              trigger: 'blur' }
			    ],
					password: [
            { 
              required: true, 
              message: '请输入密码', 
              trigger: 'blur' 
            }
					],
      },
      input:'',
    }
  },
  mounted() {
    this.showLogin = true;
  },
  methods: {
    show(){
      this.showLogin = !this.showLogin
    }
  },
}
</script>

<style  lang="less" scoped>
.form-fade-enter-active,
.form-fade-leave-active{
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-to{
  transform: translate3d(0,-50px,0);
  opacity: 0;
}
</style>
