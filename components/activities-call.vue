<template>
  <div>
    <b-card :title="userLevel" class="mt-4">
      <template v-if="progress == 100">
        <div style="color: orange; font-size: 24px; font-weight: 600;">
          O QUE VOCÊ ESTÁ FAZENDO AQUI, MÁQUINA DE VENCER? VAI PROCURAR UM EMPREGO!!
        </div>
      </template>
      <template v-else>
        <b-card-text>Você sempre pode ir mais além! Já conhece a nossa sala de estudos?</b-card-text>
        <b-link :to="{name: 'username-study-room'}" class="card-link">Sala de Estudos</b-link>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'ActivitiesCall',
  props: {
    userLevel: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="postcss">

</style>