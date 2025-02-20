# **Busca**

## Descrição

Um componente padrão para busca com container de sugestão de busca. Este componente possui recurso de preenchimento da pesquisa por microfone, porém é necessário configurar essa opção via prop, alguns navegadores pode não suportar esse recurso. Garanta também que as permissoes estão ativas, acesso por http é bloqueado o recurso de microfone pelos navegadores.

## Instalação

    npm install @wapstore/busca

## Estilização

Para a estilização, basta inserir os estilos sem escopos no componente pai ou em um arquivo CSS separado dentro de static/css/packages-styles/ com o nome do mesmo como nome do arquivo, utilizando sempre de um ID ou classe específica na tag do componente inserido para que em outras chamadas o estilo não influencie. Caso o estilo seja para várias chamadas do componente é recomendado a inserção dos estilos em um arquivo CSS separado. Para estilos em arquivos separados, utilizar o `import` no componente pai do componente correspondente ao estilo.

## Modulo da store

### **Busca**

Para seu perfeito funcionamento, este componente contém um módulo próprio na `$store` que deve ser vinculado a mesma, para isso basta inserir o trecho a seguir no arquivo `index.js` da pasta `store`:

      import busca from '@wapstore/busca/store/busca.module.js';

      export const modules = {
        // ...
        busca
      };

## Dependências

### **Store**

- **screenWidth**

  - **Tipo:** Variável da `$store`.

  - **Uso:** `$store.state.screenWidth`.

  - **Descrição:** Variável encontrada no módulo principal da `$store`, responsável por conter o valor atualizado da largura da tela.

## Recursos

### **Props**

- **closeOnMobile**

  - **Descrição:** Ativa/desativa a ocultação da busca no mobile.

  - **Tipo:** `Boolean`

  - **Valor padrão:** `true`

- **sugestoes** `1.2.0`

  - **Descrição:** Ativa/desativa o box de sugestões.

  - **Tipo:** `Boolean`

  - **Valor padrão:** `false`

- **textPlaceholder** 

  - **Descrição:** Texto da barra de pesquisa.

  - **Tipo:** `String`

  - **Valor padrão:** "Texto da barra de pesquisa"

- **sugestoesDefaultBusca** `1.2.0`

  - **Descrição:** Array que recebe dados de produto para exibir nas sugestões quando não houver nada no box de pesquisa.

  - **Tipo:** `Array`

- **limit** `1.2.0`

  - **Descrição:** Limite de itens que a sugestão terá.

  - **Tipo:** `Number`

  - **Valor padrão:** `5`

- **isRecordCapture** `1.2.1`

  - **Descrição:** Ativa o recurso de busca por microfone.

  - **Tipo:** `Boolean`

  - **Valor padrão:** `false`

- **verTodos** `1.4.0`

  - **Descrição:** Ativa o botão para ver todos os produtos da busca, no box de sugestões.

  - **Tipo:** `Boolean`

  - **Valor padrão:** `false`

- **txtVerTodos** `1.4.0`

  - **Descrição:** Texto para o botão de ver todos do box de sugestões.

  - **Tipo:** `String`

  - **Valor padrão:** "Ver todos os resultados"

- **showPrecoDe** `1.4.0`

  - **Descrição:** Ativa/desativa preço de nos produtos do box de sugestões.

  - **Tipo:** `Boolean`

  - **Valor padrão:** `false`

- **descricao** `1.5.0`

  - **Descrição:** Ativa/desativa descrição nos itens da sugestão da busca.

  - **Tipo:** `Boolean`

  - **Valor padrão:** `false`

- **closeButtonSugestoes** `1.6.0`

  - **Descrição:** Ativa/desativa botão fechar das sugestões de busca.

  - **Tipo:** `Boolean`

  - **Valor padrão:** `false`
  
- **showPrecoPor** `1.6.1`

  - **Descrição:** Define se será usado o preço vista ou preço por. Por padrão é exibido o preço vista

  - **Tipo:** `Boolean`

  - **Valor padrão:** `false`

<br />

---

<br />

### **Slots**

- **Botão de busca**

  - **Descrição:** Slot para alteração do conteúdo do botão de busca.

  - **Name:** `contentBtBusca`

  - **Exemplo de uso:**

        <busca>
          <template #contentBtBusca>
            <span>Buscar</span>
            <img src="icone.png" alt="Busca">
          </template>
        </busca>

- **Botão de microfone** `1.2.1`

  - **Descrição:** Slot para alteração do conteúdo do botão de microfone.

  - **Name:** `contentBtBusca`

  - **Exemplo de uso:**

        <busca>
          <template #contentBtBuscaMic>
            /*..*/
          </template>
        </busca>

- **Título da sugestão** `1.6.0`

  - **Descrição:** Titulo do box de sugestões do termo buscado.

  - **Name:** `labelSugestaoT1`

  - **Exemplo de uso:**

        <busca>
          <template #labelSugestaoT1>
            /*..*/
          </template>
        </busca>
