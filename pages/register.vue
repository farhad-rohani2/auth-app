<template>
  <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <b-card title="ثبت‌نام" class="mx-auto w-100 max-w-400" align="end">
      <b-form @submit.prevent="handleRegister">
        <!-- ایمیل -->
        <b-form-group label="ایمیل">
          <b-form-input v-model="email" type="email" required></b-form-input>
          <ValidationErrors :validation="validations.email"/>
        </b-form-group>

        <!-- رمز عبور -->
        <b-form-group label="رمز عبور">
          <b-form-input v-model="password" type="password" required></b-form-input>
          <ValidationErrors :validation="validations.password"/>
        </b-form-group>

        <!-- تکرار رمز عبور -->
        <b-form-group label="تکرار رمز عبور">
          <b-form-input v-model="confirmPassword" type="password" required></b-form-input>
          <ValidationErrors :validation="validations.confirmPassword"/>
        </b-form-group>

        <div class="d-flex justify-content-center">
          <b-button
              type="submit"
              variant="success"
              class="w-50 mt-3 mx-auto"
              :disabled="authLoading"
          >
            <span v-if="authLoading">
              <b-spinner small type="grow" class="me-2"/> در حال ثبت‌نام...
            </span>
            <span v-else>ثبت‌نام</span>
          </b-button>
        </div>
        <div class="text-danger mt-2" v-if="error">{{ error }}</div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {required, email, minLength, sameAs} from '@vuelidate/validators'
import ValidationErrors from '@/components/ValidationErrors.vue'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {ValidationErrors},
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      error: null,
      validations: null
    }
  },
  computed: {
    ...mapGetters('auth', ['authLoading', 'authError']),
  },
  validations() {
    return {
      email: {required, email},
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs(computed(() => this.password)),
      }
    }
  },
  created() {
    this.validations = useVuelidate(this.$options.validations.call(this), this)
  },
  methods: {
    ...mapActions('auth', ['signup']),
    async handleRegister() {
      this.validations.$touch()
      if (this.validations.$invalid) return
       this.signup({email: this.email, password: this.password})
          .then(() => this.$router.push('/'));
    }
  }
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