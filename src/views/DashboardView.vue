<template>
  <div class="dashboard">
    <div class="dashboard__host" v-if="this.$store.state.config">
      Host: {{ this.$store.state.config.apiHostname }}
    </div>
    <div class="dashboard__grid">
      <div class="dashboard__grid__cell" v-if="this.$store.state.cpu">
        <ChartComponent
          :displayValue="this.$store.state.cpu"
          viewBox="0 0 100 100"
          :radius="50"
          :strokeWidth="5"
          :cx="50"
          :cy="50"
          label="CPU"
          suffix="%"
        />
      </div>
      <div class="dashboard__grid__cell" v-if="this.$store.state.cpuTemp">
        <ChartComponent
          :displayValue="this.$store.state.cpuTemp"
          viewBox="0 0 100 100"
          :radius="50"
          :strokeWidth="5"
          :cx="50"
          :cy="50"
          label="Temp"
          suffix="°C"
        />
      </div>
      <DashboardBrainComponent apiPath="/api/all" apiPort="3000" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ChartComponent from "@/components/Chart.vue";
import DashboardBrainComponent from "@/components/Dashboard.vue";
export default {
  name: "DashboardView",
  components: {
    ChartComponent,
    DashboardBrainComponent,
  },
};
</script>

<style scoped lang="scss">
.dashboard {
  @apply w-full h-full px-4 overflow-x-hidden overflow-y-auto grid gap-0 grid-rows-[40px_1fr] md:grid-rows-[56px_1fr] lg:grid-rows-[64px_1fr];

  &__host {
    @apply text-lg md:text-xl lg:text-2xl font-bold text-white/90 h-10 md:h-14 lg:h-16 flex justify-center items-center drop-shadow-lg;
  }

  &__grid {
    @apply flex h-full items-center flex-wrap justify-center overflow-hidden;

    &__cell {
      @apply p-0 m-0 landscape:w-1/2 portrait:w-10/12 md:w-1/2;
    }
  }
}
</style>
