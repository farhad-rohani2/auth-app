<template>
  <div class="container py-5">
    <b-card class="mx-auto" style="max-width: 600px;" align="center">
      <h3 class="mb-4">صفحه ایندکس</h3>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
definePageMeta({
  middleware: [ 'auth-server','auth-index']
})
export default {
  computed: {
    ...mapGetters('auth', ['currentUser', 'isAuthenticated', 'authLoading', 'authError']),
    userEmail() {
      return this.currentUser?.email || 'کاربر';
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async handleLogout() {
        await this.logout()
            .then(()=> this.$router.push('/login'));
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
