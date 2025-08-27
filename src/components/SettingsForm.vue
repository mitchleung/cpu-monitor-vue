<template>
  <form class="settings-form" role="form" @submit.prevent>
    <fieldset>
      <label for="protocol">Protocol</label>
      <input
        type="text"
        id="protocol"
        name="protocol"
        v-model.trim="apiProtocol"
        :disabled="isLoading"
      />
    </fieldset>
    <fieldset>
      <label for="hostname">Hostname</label>
      <input
        type="text"
        id="hostname"
        name="hostname"
        v-model.trim="apiHostname"
        :disabled="isLoading"
      />
    </fieldset>
    <fieldset>
      <label for="apiPort">apiPort</label>
      <input
        type="text"
        id="apiPort"
        name="apiPort"
        v-model.number="apiPort"
        :disabled="isLoading"
      />
    </fieldset>
    <fieldset>
      <label for="apiPath">apiPath</label>
      <input
        type="text"
        id="apiPath"
        name="apiPath"
        v-model.trim="apiPath"
        :disabled="isLoading"
      />
    </fieldset>
    <fieldset>
      <label for="refreshRate">Refresh Rate</label>
      <input
        type="text"
        id="refreshRate"
        name="refreshRate"
        v-model.number="refreshRate"
        :disabled="isLoading"
      />
    </fieldset>
    <div class="button-group">
      <button
        class="button"
        :class="{ loading: isLoading && isSaving }"
        :disabled="isLoading && !isSaving"
        type="submit"
        @click="saveConfig"
      >
        <ArrowPathIcon class="button-icon" aria-hidden="true" />
        <span class="button-label">Save</span>
      </button>
      <button
        class="button"
        :class="{ loading: isLoading && isResetting }"
        :disabled="isLoading && !isResetting"
        type="button"
        @click="cancelEditConfig"
      >
        <ArrowPathIcon class="button-icon" aria-hidden="true" />
        <span class="button-label">Cancel</span>
      </button>
    </div>
  </form>
</template>

<script>
import { ArrowPathIcon } from "@heroicons/vue/24/solid";

export default {
  name: "SettingsForm",
  components: { ArrowPathIcon },
  data() {
    return {
      error: null,
      apiProtocol: this.$store.state.config.apiProtocol,
      apiHostname: this.$store.state.config.apiHostname,
      apiPort: this.$store.state.config.apiPort,
      apiPath: this.$store.state.config.apiPath,
      refreshRate: this.$store.state.config.refreshRate,
      isLoading: false,
      isSaving: false,
      isResetting: false,
    };
  },
  methods: {
    saveConfig() {
      if (!this.isLoading) {
        this.isLoading = true;
        this.isSaving = true;
        this.$store.commit("setConfig", {
          apiProtocol: this.apiProtocol,
          apiHostname: this.apiHostname,
          apiPort: this.apiPort,
          apiPath: this.apiPath,
          refreshRate: this.refreshRate,
        });
        setTimeout(() => {
          this.isLoading = false;
          this.isSaving = false;
        }, 300);
      }
      return false;
    },
    cancelEditConfig() {
      if (!this.isLoading) {
        this.isLoading = true;
        this.isResetting = true;
        this.$store.commit("setConfig", {
          apiProtocol: this.$store.state.defaultConfig.apiProtocol,
          apiHostname: this.$store.state.defaultConfig.apiHostname,
          apiPort: this.$store.state.defaultConfig.apiPort,
          apiPath: this.$store.state.defaultConfig.apiPath,
          refreshRate: this.$store.state.defaultConfig.refreshRate,
        });

        setTimeout(() => {
          this.apiProtocol = this.$store.state.config.apiProtocol;
          this.apiHostname = this.$store.state.config.apiHostname;
          this.apiPort = this.$store.state.config.apiPort;
          this.apiPath = this.$store.state.config.apiPath;
          this.refreshRate = this.$store.state.config.refreshRate;
          this.isLoading = false;
          this.isResetting = false;
        }, 300);
      }
    },
  },
  // mounted() {
  //   console.log("mounted");
  // },
};
</script>

<style scoped lang="scss">
form {
  @apply w-full m-auto p-0 md:max-w-[480px] text-lg md:text-2xl;
  fieldset {
    @apply w-full m-0 py-2 md:py-3 px-0 md:px-0 border-0 md:grid md:items-center md:justify-center md:grid-cols-[minmax(150px,_1fr)_2fr] md:gap-2;
    &:last-of-type {
      @apply mb-4 md:mb-8;
    }
  }
  label {
    @apply block m-0 py-0 px-4 md:px-0 text-left text-cyan-900;
  }
  input {
    @apply block w-full text-inherit leading-normal block py-2 px-4 rounded-lg border-2 border-solid border-cyan-500 bg-cyan-600 text-white cursor-pointer outline-none;
  }
  .button-group {
    @apply flex justify-center items-center py-4 px-0;
  }
  .button {
    @apply relative text-inherit leading-normal block py-2 px-12 mx-4 rounded-lg border-2 border-solid border-gray-400 bg-gray-500 text-white hover:bg-gray-200 hover:text-gray-500;
    &[type="submit"] {
      @apply font-bold border-cyan-400 bg-cyan-600 text-white hover:bg-cyan-200 hover:text-cyan-600;
    }
    &-label {
      @apply relative z-10 block opacity-100;
    }
    &-icon {
      @apply absolute origin-center top-1/2 left-1/2 -mt-4 -ml-4 animate-spin w-8 h-8 z-0 opacity-0;
    }
    &.loading {
      @apply pointer-events-none;
      .button-icon {
        @apply opacity-100 z-10;
        ~ .button-label {
          @apply opacity-0 z-0;
        }
      }
    }
  }
}
</style>
