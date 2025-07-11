<template>
  <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <b-card title="ورود" class="mx-auto w-100 max-w-400" align="end">
      <b-form @submit.prevent="handleLogin">
        <!-- ایمیل -->
        <b-form-group label="ایمیل">
          <b-form-input v-model="email" type="email" required></b-form-input>
          <ValidationErrors :validation="validation.email" />
        </b-form-group>

        <!-- رمز عبور -->
        <b-form-group label="رمز عبور">
          <b-form-input v-model="password" type="password" required></b-form-input>
          <ValidationErrors :validation="validation.password" />
        </b-form-group>

        <div class="d-flex justify-content-center">
          <b-button-group class="w-100 mt-3 mx-auto">
            <b-button
                type="submit"
                variant="primary"
                class="w-50"
                :disabled="authLoading"
            >
              <span v-if="authLoading">
                <b-spinner small type="grow" class="me-2" /> در حال ورود...
              </span>
              <span v-else>ورود</span>
            </b-button>

            <b-button
                variant="secondary"
                class="w-50"
                @click="navigateTo('/register')"
            >
              ثبت‌نام
            </b-button>
          </b-button-group>
        </div>

        <div class="text-danger mt-2" v-if="authError">{{ authError }}</div>
      </b-form>
    </b-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator, minLength } from '@vuelidate/validators'
import {  navigateTo } from '#app'

import ValidationErrors from '@/components/ValidationErrors.vue'

definePageMeta({
  middleware: [ 'auth-server','auth-login-and-register']
})

const store = useStore()

const email = ref('')
const password = ref('')

const rules = {
  email: { required, email: emailValidator },
  password: { required, minLength: minLength(6) }
}

const validation = useVuelidate(rules, { email, password })

const authLoading = computed(() => store.getters['auth/authLoading'])
const authError = computed(() => store.getters['auth/authError'])

const handleLogin = async () => {
  validation.value.$touch()
  if (validation.value.$invalid) return

  await store.dispatch('auth/login', {
    email: email.value,
    password: password.value
  })
  if (!authError.value) {
    console.log(authError.value)
    navigateTo('/dashboard')
  }
}
</script>

<style scoped>
.max-w-400 {
  max-width: 400px;
}
</style>
