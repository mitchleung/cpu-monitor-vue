<template>
  <div class="dashboard-brain" v-if="loading || error">
    <div v-if="!error && loading" class="loading">Loading ...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from "axios";
// import store from "../store"

export default {
  name: "DashboardBrainComponent",
  props: {
    apiProtocol: { type: String, default: "http" },
    apiHost: { type: String, default: "localhost" },
    apiPort: { type: String, default: "3000" },
    apiPath: { type: String, default: "/api/all" },
  },
  data() {
    return {
      // apiUrl: "",
      loading: true,
      error: null,
    };
  },
  computed: {
    apiUrl: function () {
      return `${this.$store.state.config.apiProtocol}://${this.$store.state.config.apiHostname}:${this.$store.state.config.apiPort}${this.$store.state.config.apiPath}`;
    },
  },
  methods: {
    fetchData() {
      axios
        .get(this.apiUrl)
        .then((response) => {
          var perCpuTemp = Array.prototype.map.call(
            response.data.cpu.cores,
            function (core, index) {
              return {
                core: Number(core),
                index: index,
              };
            }
          );
          this.$store.commit("setData", {
            cpu: Number(response.data.cpu.total),
            cpuTemp: Number(response.data.cpu.temp),
            perCpuTemp: perCpuTemp,
            speed: Number(response.data.speed),
            rx_sec: Number(response.data.rx_sec || 0) * 8e-6,
            tx_sec: Number(response.data.tx_sec || 0) * 8e-6,
            rx_bytes: Number(response.data.rx_bytes || 0) * 8e-6,
            tx_bytes: Number(response.data.tx_bytes || 0) * 8e-6,
            // perCpuTemp: response.data.cpu.cores,
            mem: Number(response.data.mem.used / response.data.mem.total) * 100,
          });
          this.error = null;
          this.loading = false;
        })
        .catch((error) => console.log((this.error = error)));
    },
  },
  mounted() {
    this.loading = true;
    // set all value to zero to hide previous readings
    this.$store.commit("setData", {
      cpu: 0,
      cpuTemp: 0,
      perCpuTemp: [],
      speed: 0,
      rx_sec: 0,
      tx_sec: 0,
      rx_bytes: 0,
      tx_bytes: 0,
      mem: 0,
    });
    this.$options.interval = setInterval(
      this.fetchData,
      this.$store.state.config.refreshRate
    );
  },
  beforeUnmount() {
    clearInterval(this.$options.interval);
  },
};
</script>

<style scoped lang="scss">
.dashboard-brain {
  @apply w-full max-w-7xl h-full block col-span-2 row-span-2;
}
.loading,
.error {
  @apply text-4xl md:text-6xl h-full m-0 p-0 flex items-center justify-center text-white/90;
}
</style>
