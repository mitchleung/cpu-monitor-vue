<template>
  <div class="chart">
    <div class="chart__container">
      <div class="radialProgressBar" :class="progressClass">
        <svg class="svg" :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg">
          <g>
            <circle
              class="base"
              :cx="cx"
              :cy="cy"
              :r="trackRadius"
              :stroke-width="baseStrokeWidth"
              stroke-linecap="round"
              :stroke-dashoffset="baseOffset"
              :stroke-dasharray="circumference"
              fill="transparent"
            />
            <circle
              class="active"
              :cx="cx"
              :cy="cy"
              :r="trackRadius"
              :stroke-width="strokeWidth"
              stroke-linecap="round"
              :stroke-dashoffset="dashOffset"
              :stroke-dasharray="circumference"
              fill="transparent"
            />
          </g>
        </svg>
        <div class="overlay">
          <div v-if="label" class="overlay__label">{{ label }}</div>
          <div v-if="displayValue" class="overlay__value">
            {{ visualValue }}{{ suffix }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChartComponent",
  props: {
    label: String,
    displayValue: Number,
    suffix: String,
    viewBox: { type: String, default: "0 0 100 100" },
    strokeWidth: { type: Number, default: 10 },
    radius: { type: Number, default: 50 },
    cx: { type: Number, default: 50 },
    cy: { type: Number, default: 50 },
  },
  computed: {
    progressClass: function () {
      var css = this.displayValue
        ? "progress-" + String(Math.floor(this.displayValue))
        : "";
      return css;
    },
    baseStrokeWidth: function () {
      return 1 * this.strokeWidth;
    },
    circumference: function () {
      return 2 * Math.PI * this.trackRadius;
    },
    trackRadius: function () {
      return this.radius - this.strokeWidth / 2;
    },
    // dashArray: function () {
    //   const percent = (this.displayValue / 100) * this.circumference;
    //   return percent;
    // },
    dashOffset: function () {
      const percent =
        ((100 - this.displayValue * 0.75) / 100) * this.circumference;
      return percent;
    },
    visualValue: function () {
      return this.displayValue.toFixed(1);
    },
    baseOffset: function () {
      const percent = this.circumference * 0.25;
      return percent;
    },
  },
};
</script>

<style scoped lang="scss">
$bar-colors: (rgb(33, 232, 2), rgb(249, 200, 39), rgb(211, 14, 50));
$base-color: #ccc;
$mask-color: #000;
$text-color: #fff;
$chart-size: 90%;

.chart {
  @apply p-[100%_0_0_0] overflow-hidden h-0 m-0 relative;
  &__container {
    /* @apply absolute top-1/2 left-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2; */
    @apply absolute top-1/2 left-1/2 h-[90%] w-[90%] landscape:w-[80%] landscape:h-[80%] md:h-full md:w-full -translate-x-1/2 -translate-y-1/2;
  }
}

svg.svg {
  @apply absolute z-10 top-0 left-0 w-full h-full;

  g {
    @apply origin-center transform-gpu rotate-[135deg];
  }

  circle {
    @apply transition-all duration-[250ms] origin-center fill-transparent;

    &.base {
      @apply z-10;
      stroke: rgba($text-color, 0.25);
    }
    &.active {
      @apply z-20;
    }
  }
}

.radialProgressBar {
  @apply rounded-full w-full h-full flex justify-center items-center m-0 transition-all duration-200;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  .overlay {
    @apply rounded-full w-[80%] h-[80%] m-auto flex flex-col justify-center items-center font-bold drop-shadow-md text-center;

    color: $text-color;
    &__label {
      line-height: 1.35;
      @apply leading-snug;
      font-size: clamp(1.5rem, 4vw + 1rem, 6rem);
    }
    &__value {
      @apply leading-tight;
      font-size: clamp(2rem, 6vw + 1rem, 8rem);
    }
  }
}
@for $i from 0 to 101 {
  $rotation: $i * 360 / 100;
  $bar-color: nth($bar-colors, 1);

  .progress-#{$i} {
    @if $i > 80 {
      $bar-color: nth($bar-colors, 3);
    } @else if ($i > 50) {
      $bar-color: nth($bar-colors, 2);
    }
    svg circle.active {
      stroke: rgba($bar-color, 0.85);
    }
  }
}
</style>
