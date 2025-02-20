<template>
  <!-- ROTA COM SUBMENU -->
  <nuxt-link
    v-if="validaRota(item.rota) && item.sub.length > 0"
    :id="`menuPrincipal-itens-item-${item.label.replace(/\s/g, '')}`"
    class="menu__nav-item-text"
    :to="item.rota.route"
  >
    <slot name="label">
      {{ item.label }}
    </slot>
    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" fill="none"><path fill="#585757" fill-rule="evenodd" d="M.231 9.769a.79.79 0 0 1 0-1.117L3.884 5 .23 1.348A.79.79 0 0 1 1.348.23l4.21 4.21a.79.79 0 0 1 0 1.117l-4.21 4.21a.79.79 0 0 1-1.117 0Z" clip-rule="evenodd" /></svg>
  </nuxt-link>

  <!-- APENAS ROTA -->
  <nuxt-link
    v-else-if="validaRota(item.rota)"
    :id="`menuPrincipal-itens-item-${item.label.replace(/\s/g, '')}`"
    class="menu__nav-item-text"
    :to="item.rota.route"
  >
    <slot name="label">
      {{ item.label }}
    </slot>
  </nuxt-link>

  <!-- APENAS LINK -->
  <a v-else-if="validaRota(item.link)" href="#" class="menu__nav-item-text">
    <slot name="label">
      {{ item.label }}
    </slot>
  </a>

  <!-- SEM ROTA, SEM LINK MAS TEM SUBMENU -->
  <button
    v-else-if="item.sub.length > 0"
    class="menuPrincipal-openSub menu__nav-item-text"
    @click="openSub()"
  >
    <slot name="label">
      {{ item.label }}
    </slot>
    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" fill="none"><path fill="#585757" fill-rule="evenodd" d="M.231 9.769a.79.79 0 0 1 0-1.117L3.884 5 .23 1.348A.79.79 0 0 1 1.348.23l4.21 4.21a.79.79 0 0 1 0 1.117l-4.21 4.21a.79.79 0 0 1-1.117 0Z" clip-rule="evenodd" /></svg>
  </button>

  <!-- APENAS TEXTO -->
  <span v-else class="menu__nav-item-text">
    <slot name="label">
      {{ item.label }}
    </slot>
  </span>
</template>

<script>
export default {
  name: 'LinkManager',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    validaRota (rota) {
      // Valida qual o tipo de dado na variável para capturar o seu tamanho
      const tamanhoRota =
        typeof rota === 'string' ? rota.length : Object.keys(rota).length;
      // Valida e retorna se há rota e sub-itens
      return (
        tamanhoRota > 0 &&
        (this.item.sub.length === 0 || this.$store.state.screenWidth >= 1024)
      );
    },
    openSub () {
      this.$emit('openSub');
    }
  }
};
</script>
