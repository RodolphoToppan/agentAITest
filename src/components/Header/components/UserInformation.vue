<template>
  <a
    :href="`${$store.state.siteUrl}/minha-conta/pedido`"
    :title="getAriaLabel"
    :aria-label="getAriaLabel"
    class="user-information"
  >
    <IconPerson class="user-information__icon" />

    <div
      v-if="!isMobile"
      class="user-information-texts"
    >
      <p class="user-information-texts__name">
        Olá! <strong>{{ userFirstName }}!</strong>
      </p>

      <p
        v-if="userAddress"
        class="user-information-texts__button"
      >
        {{ userAddress }}
      </p>
    </div>
  </a>
</template>

<script>
import IconPerson from '~/static/icons/IconPerson.vue';

export default {
  name: 'UserInformation',
  components: {
    IconPerson
  },
  data () {
    return {};
  },
  computed: {
    isMobile () {
      return this.$store.state.screenWidth < 1024;
    },
    user () {
      return this.$store.state.user;
    },
    userFirstName () {
      const nomeRazao = 'Teste';
      return nomeRazao;
      // return this.user.nomeRazao.trim().split(' ')[0];
    },
    userAddress () {
      const address = 'Rua Teste, 123';
      const mainAddress = 'Rua Teste, 123';
      // const address = this.user.endereco;
      // const mainAddress = this.user.endereco.principal;

      if (Object.keys(mainAddress).length > 0) {
        return `${mainAddress.cidade} - CEP: ${mainAddress.cep}`;
      }

      return `CEP: ${address.cep}`;
    },
    hasUserLogged () {
      return this.user?.logado;
    },
    getAriaLabel () {
      if (this.hasUserLogged) {
        return this.showDialogUser ? 'Fechar opções da minha conta' : 'Abrir opções da minha conta';
      }
      return this.showDialogUser ? 'Fechar formulário de login' : 'Abrir formulário de login';
    }
  }
};
</script>

<style scoped>

.user-information {
  display: flex;
  align-items: center;
  gap: 16px;
}
.user-information__icon {
  max-width: 30px;
}
.user-information__icon >>> path {
  transition: 250ms;
}
.user-information-texts__name {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #585757;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-information-texts__name strong {
  font-weight: 700;
}
.user-information-texts__button {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #585757;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media(min-width: 1024px) {
  .user-information-texts {
    min-width: 104px;
  }
  .user-information:hover .user-information__icon >>> path {
    fill: #2391E1;
  }
}

</style>
