<template>
  <div class="container mt-5">
    <b-card title="ورود" class="mx-auto" style="max-width: 400px;">
      <b-form @submit.prevent="handleLogin">
        <b-form-group label="ایمیل">
          <b-form-input
              v-model="email"
              type="email"
              required
              placeholder="ایمیل خود را وارد کنید"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="رمز عبور">
          <b-form-input
              v-model="password"
              type="password"
              required
              placeholder="رمز عبور"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" class="w-100">ورود</b-button>
      </b-form>

      <div v-if="error" class="mt-3 text-danger text-center">
        {{ error }}
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async handleLogin() {
      try {
        this.error = null
        // درخواست فرضی
        const response = await $fetch('/api/login', {
          method: 'POST',
          body: { email: this.email, password: this.password }
        })

        console.log('ورود موفق:', response)
        await navigateTo('/dashboard')
      } catch (err) {
        this.error = 'ورود ناموفق. ایمیل یا رمز اشتباه است.'
      }
    }
  }
}
</script>
