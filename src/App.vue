<template>
  <nav class="nav">
    <router-link to="/"><ViewColumnsIcon class="nav__icon" /></router-link>
    <router-link to="/about"
      ><InformationCircleIcon class="nav__icon"
    /></router-link>
    <router-link to="/settings"
      ><Cog6ToothIcon class="nav__icon"
    /></router-link>
  </nav>
  <router-view />
</template>
<script>
import {
  ViewColumnsIcon,
  InformationCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/vue/24/solid";

export default {
  components: { ViewColumnsIcon, InformationCircleIcon, Cog6ToothIcon },
  methods: {
    appHeight() {
      const doc = document.documentElement;
      doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    },
  },
  mounted() {
    window.addEventListener("resize", this.appHeight);
    this.appHeight();
  },
};
</script>

<style lang="scss">
$animeTime: 8s;
$bgColors: (#1414e1, #ce1861, #3c3ce7, #a3ff04);
:root {
  --app-height: 100%;
}
html,
body {
  @apply m-0 p-0 bg-slate-500 h-screen w-full;
}
html {
  background: linear-gradient(
    -45deg,
    nth($bgColors, 1) 1%,
    nth($bgColors, 2) 45%,
    nth($bgColors, 3) 65%,
    nth($bgColors, 4) 95%
  );
  background-size: 120%;
  -webkit-animation: gradient $animeTime ease infinite alternate-reverse;
  animation: rotate $animeTime ease infinite alternate-reverse;
  -webkit-text-size-adjust: 100%;
}
body {
  @apply bg-transparent;
  height: var(--app-height);
}
#app {
  @apply font-sans w-full h-screen overflow-hidden text-center antialiased grid gap-0 grid-rows-[56px_1fr] landscape:grid-rows-1 grid-cols-1 landscape:grid-cols-[56px_1fr];
}
@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}
@keyframes rotate {
  0% {
    filter: hue-rotate(0deg);
  }

  100% {
    filter: hue-rotate(80deg);
  }
}

.nav {
  @apply flex flex-row landscape:flex-col justify-center items-center h-14 landscape:h-screen w-full landscape:w-14;
  a {
    @apply font-bold block p-2 mx-4 landscape:mx-0 landscape:my-4 text-xl md:text-2xl text-gray-300 hover:text-gray-200 border-b-2 border-b-gray-200/0 hover:border-b-gray-200 drop-shadow-lg;
    &.router-link-exact-active {
      @apply text-white border-b-white;
    }
    svg {
      fill: currentColor;
    }
  }
  &__icon {
    @apply h-10 w-10;
  }
}
</style>
