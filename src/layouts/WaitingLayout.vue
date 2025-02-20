<template>
  <div class="wait-screen">
    <div>
      <img
        v-if="maintenanceSettings.arquivo.length"
        :src="maintenanceSettings.arquivo"
        width="314"
        height="54"
      >
      <IconLogoMobiis v-else class="wait-screen__logo" />

      <p class="wait-screen__message">
        {{ maintenanceSettings.mensagem }}
      </p>
    </div>

    <div class="wait-screen-footer">
      <a
        href="https://uappi.com.br/"
        target="_blank"
        class="wait-screen-footer__logo"
      >
        <UappiLogoIcon />
      </a>
    </div>
  </div>
</template>
<script>
import IconLogoMobiis from '~/static/icons/IconLogoMobiis.vue';
import UappiLogoIcon from '~/static/icons/IconLogoUappi.vue';

export default {
  components: {
    IconLogoMobiis,
    UappiLogoIcon
  },
  computed: {
    storeSettings () {
      return this.$store.state.config;
    },
    maintenanceSettings () {
      return this.storeSettings.sistema.paginaAguarde;
    }
  }
};
</script>
<style scoped>
.wait-screen {
  display: grid;
  place-items: center;
  height: 100vh;
  padding: 32px 16px;
}
.wait-screen__message {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: #6D6D6B;
}
.wait-screen > div {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}
.wait-screen__logo {
  max-width: 255px;
}
.wait-screen-footer {
  position: absolute;
  bottom: 56.6px;
  left: 50%;
  transform: translateX(-50%);
}
.wait-screen-footer__logo > svg {
  width: 100%;
  max-width: 120px;
}
</style>
