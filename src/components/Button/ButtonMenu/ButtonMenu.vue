<template>
  <button
    id="button-menu"
    class="button-menu"
    title="Abrir menu lateral"
    aria-label="Abrir menu lateral"
    v-on="$listeners"
  >
    <IconMenu class="button-menu__icon" />
  </button>
</template>

<script>
import IconMenu from '~/static/icons/IconMenu.vue';

export default {
  name: 'ButtonMenu',
  components: {
    IconMenu
  }
};
</script>

<style scoped src="./styles.scoped.css" />
