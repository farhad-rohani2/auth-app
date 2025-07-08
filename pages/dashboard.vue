<template>
  <div class="container mt-5">
    <b-alert show variant="success">
      خوش آمدید به داشبورد 👋
    </b-alert>
  </div>
</template>

<script>
export default {
  middleware: 'auth', // اگر خواستی auth اضافه کنی
}
</script>
