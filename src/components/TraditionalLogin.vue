<template>
  <div class="traditional-login">
    <div class="login-box">
      <h2>用户登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>用户名</label>
          <input v-model="username" type="text" required />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input v-model="password" type="password" required />
        </div>
        <div class="form-group">
          <button type="submit" :disabled="loading">
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TraditionalLogin',
  data() {
    return {
      username: '',
      password: '',
      error: '',
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.error = ''
      this.loading = true
      // 模拟登录过程
      setTimeout(() => {
        // 检查用户名和密码是否匹配预设值
        if (this.username === 'jr' && this.password === '123456') {
          // 创建模拟用户信息
          const user = {
            id: 1,
            username: 'jr',
            address: '0x0000000000000000000000000000000000000000'
          }
          // 保存到localStorage
          localStorage.setItem('user', JSON.stringify(user))
          // 跳转到面板页
          this.$router.push('/panels')
        } else {
          this.error = '用户名或密码错误'
        }
        this.loading = false
      }, 500) // 添加短暂延迟模拟网络请求
    }
  }
}
</script>

<style scoped>
.traditional-login {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;
}
.login-box {
  background: #fff;
  padding: 40px 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 350px;
}
.login-box h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}
.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}
.form-group input:focus {
  border-color: #409eff;
  outline: none;
}
button[type="submit"] {
  width: 100%;
  padding: 12px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}
button[type="submit"]:hover:not(:disabled) {
  background: #66b1ff;
}
button[type="submit"]:disabled {
  background: #a0cfff;
  cursor: not-allowed;
}
.error {
  color: #f56c6c;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}
</style>
