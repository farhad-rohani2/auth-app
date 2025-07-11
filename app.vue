<template>
    <NuxtPage/>
    <b-toast
        v-model:show="show"
        :title="notification.title"
        :body="notification.message"
        :variant="notification.variant"
        dir="rtl"
        solid
        show-on-pause
        :auto-hide-delay="5000"
        :progress-props="{
    showProgress: true,
    animated: true,
    striped: true,
    variant: notification.variant
  }"
        class="position-fixed top-0 end-0 m-3 z-50 text-end"
        @hidden="handleHidden"
    />
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
    ...mapGetters('notifications', ['notification']),
  },
  mounted() {
    // console.log('Component mounted.')
    // const authUser = useState('authUser');
    // console.log(authUser)
    // console.log(authUser._value)
    //
    // // this.setUser(authUser)
    // console.log(this.currentUser)
  },
  watch: {
    'notification.message': {
      immediate: true,
      handler(val) {
        if (val) {
          this.show = true
        }
      }
    }
  },
  methods: {
    ...mapActions('notifications', ['clearNotice']),
    ...mapActions('auth', ['setUser']),
    handleHidden() {
      this.show = false
      this.clearNotice()
    }
  }
}
</script>
<style>
button.btn-close.ms-auto {
  margin-left: 0 !important;
}

.toast-header {
  justify-content: space-between;
}
</style>