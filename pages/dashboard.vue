<!-- pages/dashboard.vue -->
<template>
  <div class="d-flex flex-column items-center justify-content-center gap-2 vh-100">
    <b-card class="mx-auto w-100 d-flex  items-center justify-content-center" style="max-width: 600px;" align="center">
      <h3 class="mb-4">داشبورد</h3>
      <h5 class="mb-4">رندر سمت سرور</h5>
      <p class="m-0">خوش آمدید. <strong>{{ userEmailInServer }}</strong>!</p>
    </b-card>
    <b-card class="mx-auto w-100" style="max-width: 600px;" align="center">
      <ClientOnly>
        <h3 class="mb-4">داشبورد</h3>
        <h5 class="mb-4">رندر سمت کاربر</h5>
        <div v-if="isAuthenticated">
          <p>خوش آمدید. <strong>{{ userEmail }}</strong>!</p>
          <div class="d-flex justify-content-center">
            <b-button variant="danger" :disabled="authLoading" @click="handleLogout">
              <span v-if="authLoading">
                <b-spinner small type="grow" class="me-2"/> در حال خروج...
              </span>
              <span v-else>خروج</span>
            </b-button>
          </div>
        </div>
      </ClientOnly>
    </b-card>
  </div>
</template>

<script setup>
import {useStore} from 'vuex'
import {computed} from 'vue'

const store = useStore()
definePageMeta({
  middleware: ['auth-server', 'auth-dashboard',]
})


const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
const userEmail = computed(() => store.getters['auth/currentUser']?.email || 'کاربر')
const userEmailInServer = computed(() => useState('authUser')?.value?.email || 'کاربر')
const authLoading = computed(() => store.getters['auth/authLoading'])

const handleLogout = async () => {
  await store.dispatch('auth/logout')
  console.log('dddddddd')
  await navigateTo('/login')
}
</script>
