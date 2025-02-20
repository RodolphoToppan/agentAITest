<!--
  Extending RouterLink
  doc: https://router.vuejs.org/guide/advanced/extending-router-link
 -->
<template>
  <span v-if="!link.link">
    <slot />
  </span>

  <a
    v-else-if="link.tipo === 'personalizado'"
    :href="link.link"
    :target="link.target"
    :class="{ 'disabled-links': prevent }"
  >
    <slot />
  </a>

  <NuxtLink
    v-else
    v-slot="{ navigate, href, isActive }"
    :to="{ path: link.rota.path, query: link.rota.query }"
    custom
  >
    <a
      v-if="!prevent"
      role="link"
      :href="href"
      :target="link.target"
      :class="{
        'base-link-active': isActive
      }"
      @click="navigate"
    >
      <slot />
    </a>
    <a
      v-else
      role="link"
      :target="link.target"
      :href="href"
      :class="{
        'base-link-active': isActive
      }"
      @click.prevent="(event) => $emit('click', event)"
    >
      <slot />
    </a>
  </NuxtLink>
</template>

<script>
export default {
  name: 'BaseLink',
  props: {
    link: {
      type: Object,
      required: true
    },
    prevent: {
      type: Boolean,
      default: false
    }
  }
};
</script>
