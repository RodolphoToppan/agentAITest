<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="
        M5.67678 7.17678C5.77441 7.07915 5.77441 6.92085 5.67678 6.82322L2.85355
        4L5.67678 1.17678C5.77441 1.07915 5.77441 0.920855 5.67678 0.823223C5.57915
        0.725592 5.42085 0.725592 5.32322 0.823223L2.32322 3.82322C2.22559 3.92085
        2.22559 4.07915 2.32322 4.17678L5.32322 7.17678C5.42085 7.27441 5.57915 7.27441 5.67678 7.17678Z"
      :fill="color"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconArrowLeft',
  props: {
    width: {
      type: [String, Number],
      default: 16
    },
    height: {
      type: [String, Number],
      default: 16
    },
    color: {
      type: String,
      default: '#6D6D6B'
    }
  }
};
</script>
