<!-- pages/dashboard.vue -->
<template>
  <div class="container py-5">
    <b-card class="mx-auto" style="max-width: 600px;" align="center">
      <h3 class="mb-4">داشبورد</h3>

      <ClientOnly>
        <div v-if="isAuthenticated">
          <p>خوش آمدید، <strong>{{ userEmail }}</strong>!</p>
          <div class="d-flex justify-content-center">
            <b-button variant="danger" @click="handleLogout" :disabled="authLoading">
              <span v-if="authLoading">
                <b-spinner small type="grow" class="me-2" /> در حال خروج...
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
import { useStore } from 'vuex'
import { computed } from 'vue'

definePageMeta({
  middleware: ['auth-dashboard']
})



const store = useStore()

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
const userEmail = computed(() => store.getters['auth/currentUser']?.email || 'کاربر')
const authLoading = computed(() => store.getters['auth/authLoading'])

const handleLogout = async () => {
  await store.dispatch('auth/logout')
  await navigateTo('/login')
}
</script>
