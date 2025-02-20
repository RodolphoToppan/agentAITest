<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :fill="fill"
    viewBox="0 0 90 90"
  >
    <path
      :fill="color"
      d="
        M45.481 7C24.762 7 8 23.781 8 44.5S24.762 82 45.481 82 83 65.219 83 44.5 66.2 7 45.481 7Zm.019 67.5
        c-16.575 0-30-13.425-30-30s13.425-30 30-30 30 13.425 30 30-13.425 30-30 30Z
      "
    />
    <path
      :fill="color"
      d="
        M42 59.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 1 1-7.5 0Zm0-30
        a3.75 3.75 0 1 1 7.5 0v16.5a3.75 3.75 0 1 1-7.5 0v-16.5Z
      "
    />
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: [String, Number],
      default: 90
    },
    height: {
      type: [String, Number],
      default: 90
    },
    fill: {
      type: String,
      default: 'none'
    },
    color: {
      type: String,
      default: '#535353'
    }
  }
};
</script>
