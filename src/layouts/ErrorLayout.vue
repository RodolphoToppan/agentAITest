<template>
  <main id="errorComponent" class="error">
    <div v-if="error.statusCode == 404" class="error__404">
      <div v-if="!isMobile" class="error__404-illustration">
        <img src="~/static/img/illustration-error.png" width="350" height="350">
      </div>

      <div class="error__404-text-container">
        <div class="error__404__title">
          <span>Erro 404</span>
          <h1>Ops, não encontramos <br> nada aqui :(</h1>
        </div>
        <p class="error__404__text">
          A página que você procura não existe ou está em manutenção.
          <br>
          Você pode começar um novo caminho voltando para o nosso site.
        </p>

        <img
          v-if="isMobile"
          src="~/static/img/illustration-error.png"
          width="233"
          height="233"
          class="error__404-image"
        >

        <NuxtLink to="/" class="error__404--btn-home">
          Voltar para o site
        </NuxtLink>
      </div>
    </div>

    <div v-else class="errorComponent-mainContainer">
      <div class="errorComponent-errorIcon">
        <ErrorIcon width="90" height="90" fill="none" color="#535353" />
      </div>
      <div class="errorComponent-errorInfos">
        <template v-if="!error.api">
          <h1 v-if="error.statusCode" class="errorComponent-errorT1">
            {{ error.statusCode }}<span v-if="error.error">, {{ error.error }} :(</span>
          </h1>
          <h3 v-if="error.message" class="errorComponent-errorT3" v-html="error.message" />
          <!-- Exemplo de código -->
          <div v-if="error.exemple" class="">
            <div class="errorComponent-exemplo">
              <p>Exemplo de implementação com a(s) dependência(s):</p>
              <code v-html="error.exemple" />
            </div>
          </div>
          <!-- Acesso à documentação -->
          <p v-if="error.linkDoc" class="errorComponent-doc">
            Para saber mais acesse a <a :href="error.linkDoc" target="_blank">documentação</a>.
          </p>
        </template>
        <template v-else>
          <h1 class="errorComponent-errorT1">
            Erro de API:
            <template v-if="error.error">
              {{ error.error }}
            </template>
          </h1>
          <p v-if="error.endpoint">
            <b>Endpoint:</b> {{ error.endpoint }}
          </p>
          <br>
        </template>
      </div>
    </div>
  </main>
</template>

<script>
import ErrorIcon from '~/static/icons/IconError.vue';

export default {
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    ErrorIcon
  },
  mounted () {
    this.$nextTick(() => {
      this.$gtmGetData();
      this.$gtmSet404Page();
      this.$store.commit('changeLoader', false);
    });
  },
  computed: {
    isMobile () {
      return this.$store.state.screenWidth < 1024;
    }
  }
};
</script>

<style scoped>
.error__404{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column-reverse;
  flex: 1;
  margin: 38px 0;
  padding: 0 16px;
}

.error__404__title {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.error__404__title span {
  font-size: 18px;
  font-weight: 400;
  line-height: 27.24px;
  color: #373835;
  border-radius: 2px;
  max-width: fit-content;
}
.error__404__title h1 {
  text-align: left;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  color: #585757;
}
.error__404__title h1 br {
  display: none
}
.error__404__text {
  margin-top: 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #585757;
}
.error__404__text br {
  display: none;
}

.error__404--btn-home{
  margin: 13px auto 0 auto;
  display: flex;
  width: 100%;
  max-width: 246px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: #FFFFFF;
  background-color: #27348B;

  font-size: 16px;
  font-weight: 500;
  line-height: 19.44px;
  text-align: center;
  transition: 250ms;
}
.error__404-image {
  display: block;
  margin: 0 auto;
}
.error__404--btn-home svg path {
  transition: .8s;
}
.error__404--btn-home:hover {
  background-color: #0f195a;
  color: #fff;
}
.error__404--btn-home:hover svg path{
  stroke: var(--neutros_branco);
}
.error__404-text-container {
  width: 100%;
}
.error__404-sad-face {
  display: none;
}
@media (min-width: 1024px){
  .error__404{
    gap: 48px;
    flex-direction: row;
    margin: 65px 0;
  }
  .error__404__title {
    align-items: flex-start;
  }
  .error__404__title span {
    font-size: 16px;
    font-weight: 700;
    line-height: 36px;
    color: #585757;
  }
  .error__404__title h1 br {
    display: block
  }
  .error__404__text br {
    display: block;
  }
  #errorComponent .error__404{
    display: flex;
    max-width: 1126px;
  }
  .error__404--btn-home{
    width: 275px;
    font: var(--body_16_bold);
    margin: 24px 0 0;
  }
  #errorComponent .error__404-img-container{
    grid-area: a;
  }
  .error__404-text-container {
    max-width: 430px;
  }
  .error__404-sad-face {
    display: block;
  }
  .error__404-sad-face h3 {
    font-size: 200px;
    color: #306B72;
  }
}
</style>

<style media="screen">
#errorComponent {
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
}
.errorComponent-mainContainer {
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 860px;
}
.errorComponent-errorIcon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.errorComponent-errorT1{
  font-weight: 700;
  font-size: 24px;
  line-height: 20px;
  color: #535353;
  margin-bottom: 5px;
}
.errorComponent-errorT2{
  font-weight: 700;
  font-size: 24px;
  line-height: 20px;
  color: #535353;
  margin-bottom: 15px;
}
.errorComponent-errorT3{
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #535353;
}
.errorComponent-errorT3 a:hover{
  text-decoration: underline;
}
.errorComponent-doc{
  color: #737373;
  font-size: 14px;
}
.errorComponent-doc a{
  color: #0075ff;
  font-weight: bold;
  text-decoration: underline;
}

.errorComponent-exemplo{
  display: inline-flex;
  flex-direction: column;
  text-align: left;
}
.errorComponent-exemplo > p{
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
.errorComponent-exemplo > code{
  background-color: #ddd;
  border-radius: 5px;
  padding: 20px 15px;
  min-width: 500px;
  font-size: 16px;
}
.errorComponent-exemplo > code b{
  color: #f00;
}
.sugestao a{
  font-weight: bold;
  color: #0075ff;
}
.sugestao a:hover{
  text-decoration: underline;
}
</style>
