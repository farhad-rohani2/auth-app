<template>
  <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <b-card title="ثبت‌نام" class="mx-auto w-100 max-w-400" align="end">
      <b-form @submit.prevent="handleRegister">
        <!-- ایمیل -->
        <b-form-group label="ایمیل">
          <b-form-input v-model="email" type="email" required></b-form-input>
          <ValidationErrors :validation="validation.email"/>
        </b-form-group>

        <!-- رمز عبور -->
        <b-form-group label="رمز عبور">
          <b-form-input v-model="password" type="password" required></b-form-input>
          <ValidationErrors :validation="validation.password"/>
        </b-form-group>

        <!-- تکرار رمز عبور -->
        <b-form-group label="تکرار رمز عبور">
          <b-form-input v-model="confirmPassword" type="password" required></b-form-input>
          <ValidationErrors :validation="validation.confirmPassword"/>
        </b-form-group>

        <div class="d-flex justify-content-center">
          <b-button-group class="w-100 mt-3 mx-auto">
            <b-button
                variant="secondary"
                class="w-50"
                @click="navigateTo('/login')"
            >
              ورود
            </b-button>

            <b-button
                type="submit"
                variant="success"
                class="w-50"
                :disabled="authLoading"
            >
              <span v-if="authLoading">
                <b-spinner small type="grow" class="me-2"/> در حال ثبت‌نام...
              </span>
              <span v-else>ثبت‌نام</span>
            </b-button>
          </b-button-group>
        </div>
        <div class="text-danger mt-2" v-if="authError">{{ authError }}</div>
      </b-form>
    </b-card>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue'
import {navigateTo} from '#app'
import {useStore} from 'vuex'
import useVuelidate from '@vuelidate/core'
import {required, email as emailValidator, minLength, sameAs} from '@vuelidate/validators'
import ValidationErrors from '@/components/ValidationErrors.vue'

definePageMeta({
  middleware: [ 'auth-server','auth-login-and-register']
})

const store = useStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const rules = computed(() => ({
  email: {required, emailValidator},
  password: {required, minLength: minLength(6)},
  confirmPassword: {
    required,
    sameAs: sameAs(password, 'رمز عبور'),
  },
}))

const validation = useVuelidate(rules, {
  email,
  password,
  confirmPassword
})

const authLoading = computed(() => store.getters['auth/authLoading'])
const authError = computed(() => store.getters['auth/authError'])

const handleRegister = async () => {
  validation.value.$touch()
  if (validation.value.$invalid) return

  await store.dispatch('auth/signup', {
    email: email.value,
    password: password.value
  })

  if (!authError.value) navigateTo('/dashboard')
}
</script>

<style>
.card-title {
  text-align: center;
}

.max-w-400 {
  max-width: 400px;
}
</style>
