<template>
  <div class="settings">
    <div class="container">
      <h1>Settings for API</h1>
      <SettingsForm />
    </div>
  </div>
</template>

<script>
import SettingsForm from "@/components/SettingsForm.vue";
export default {
  name: "SettingsView",
  components: {
    SettingsForm,
  },
};
</script>

<style scoped lang="scss">
.settings {
  @apply w-full h-full px-4 overflow-x-hidden overflow-y-auto my-6 mx-auto;
}
.container {
  @apply w-full mx-auto bg-white/50 p-8 md:p-20 rounded-2xl max-w-5xl text-2xl md:text-3xl my-6;
}
h1 {
  @apply text-2xl md:text-4xl text-cyan-900 mb-4 md:mb-12 font-bold;
}
</style>
