<!-- components/ValidationErrors.vue -->
<template>
  <ul class="text-danger mt-1" v-if="errors.length">
    <li v-for="(message, index) in errors" :key="index">{{ message }}</li>
  </ul>
</template>

<script>

export default {
  props: {
    validation: {
      type: Object,
      required: true,
    },
    customMessages: {
      type: Object,
      default: () => ({}),
    }
  },
  computed: {
    errors() {
      if (!this.validation.$dirty) return [];

      return this.validation.$errors.map(error => {
        const name = error.$validator;

        // اولویت با پیام سفارشی
        if (this.customMessages[name]) return this.customMessages[name];

        // پیام پیش‌فرض
        switch (name) {
          case 'required': return 'این فیلد الزامی است';
          case 'email': return 'فرمت ایمیل معتبر نیست';
          case 'minLength': return `حداقل ${error.$params.min} کاراکتر لازم است`;
          case 'sameAs': return 'رمزها یکسان نیستند';
          default: return 'مقدار وارد شده معتبر نیست';
        }
      });
    }
  }
}
</script>
