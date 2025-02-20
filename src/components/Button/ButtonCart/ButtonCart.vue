<template>
  <a
    class="button-cart"
    title="Abrir carrinho lateral"
    aria-label="Abrir carrinho lateral"
    :href="`${$store.state.siteUrl}/checkout/carrinho`"
  >
    <IconCart class="button-cart__icon" />

    <p
      v-if="quantityOfItems > 0"
      class="button-cart__number"
    >
      {{ quantityOfItems }}
    </p>
  </a>
</template>

<script>
import IconCart from '~/static/icons/IconCart.vue';

export default {
  name: 'ButtonCart',
  components: {
    IconCart
  },
  computed: {
    quantityOfItems () {
      return this.$store.getters['carrinhoFrete/quantityOfItems'];
    }
  },
  methods: {
    openCart () {
      this.$store.commit('carrinhoFrete/toggleCarrinho', true);
    }
  }
};
</script>

<style scoped src="./styles.scoped.css" />
