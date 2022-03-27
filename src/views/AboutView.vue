<template>
  <div class="about">
    <div class="container">
      <h1>About CPU Monitor Vue 3</h1>
      <p>
        This CPU monitor has been reconstructed with
        <a href="https://vuejs.org/" target="_blank">VueJS 3</a> and
        <a href="https://tailwindcss.com/" target="_blank">TailwindCSS</a> but
        it still requires
        <a
          href="https://github.com/mitchleung/cpu-monitor-express-webapp"
          target="_blank"
          >CPU Monitor Express Server</a
        >
        to run on your machine in order to display CPU loading and temperature.
      </p>
      <p>
        Now you can adjust some of the settings with CPU monitor's Settings
        page, e.g. hostname, api port number, api path, refresh rate (in
        milliseconds).
      </p>
      <p>
        If you run CPU Monitor on any cloud services other than your local
        machine, you would want to change the hostname to point it back your
        machine's IP address.
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
  @apply w-full h-full px-4 overflow-x-hidden overflow-y-auto my-6 mx-auto;
}
.container {
  @apply w-full mx-auto bg-white/50 p-8 md:p-20 rounded-2xl max-w-5xl text-lg md:text-3xl my-6;
}
h1 {
  @apply text-2xl md:text-4xl text-cyan-900 mb-8 md:mb-12 font-bold;
}
a {
  @apply text-cyan-700 hover:text-cyan-600 underline;
}
p {
  @apply leading-normal;
  &:not(:last-child) {
    @apply mb-6;
  }
}
</style>
