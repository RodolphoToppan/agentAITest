<template>
  <Component :is="is" class="base-anchor" v-bind="anchorAttributes">
    <slot />
  </component>
</template>

<script>

export default {
  props: {
    link: {
      type: String,
      required: true
    },
    wrapper: {
      type: String,
      required: true
    }
  },
  computed: {
    is () {
      if (!this.link) {
        return this.wrapper;
      }
      return this.isInternalLink() ? 'nuxt-link' : 'a';
    },
    anchorAttributes () {
      return this.getAnchorAttributes();
    }
  },
  methods: {
    isInternalLink () {
      const siteUrl = this.$store.state.siteUrl;
      
      const isCheckoutAndMyAccount = this.link.includes('minha-conta') || this.link.includes('checkout');

      if (isCheckoutAndMyAccount) return false;

      return this.link.includes(siteUrl) || 
      this.link.includes(siteUrl.replace('https://wwww.', '')) ||
      this.link.includes(siteUrl.replace('https://', '')) || 
      this.link.includes(siteUrl.replace('www.', '')) || 
      !this.link.includes('.');
    },
    formatExternalLink () {
      if (this.link.includes('https') && this.link.includes('www')) return this.link;
      if (!this.link.includes('https') && !this.link.includes('www')) return `https://www.${this.link}`;
      if (this.link.includes('www') && !this.link.includes('https')) return `https://${this.link}`;
      return this.link;
    },
    getAnchorAttributes () {
      const isCheckoutAndMyAccount = this.link.includes('minha-conta') || this.link.includes('checkout');
      if (this.is === 'a') {
        return { href: this.formatExternalLink(this.link), target: isCheckoutAndMyAccount ? '_self' : '_blank' };
      }
      if (this.is === 'nuxt-link') {
        return { to: this.link.replace(this.$store.state.siteUrl, '') };
      }
      return {};
    }
  }
};
</script>
