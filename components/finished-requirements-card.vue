<template>
  <b-card
    v-if="finishedRequirementsList && finishedRequirementsList.length"
    header="Habilidades concluídas"
  >
    <p class="card-text mt-2">
      <strong>Uau!</strong> Parece que você já começou a investir na sua carreira como {{ careerName }}!
      Atualmente você pode ser considerado um
      <span class="home__featured-text">{{ userLevel }}</span>
    </p>
    <b-list-group>
      <b-list-group-item
        v-for="requirement in finishedRequirementsList"
        :key="requirement.id"
      >
        {{ requirement.name }}
      </b-list-group-item>
    </b-list-group>
  </b-card>

  <b-card v-else>
    <p class="card-text mt-2">
      Você sabia que o que te separa da carreira de <span class="home__featured-text">{{ careerName }}</span>
      é muita dedicação e estudo? Sabemos disso e separamos algumas coisas pra você na nossa
      <b-link :to="{name: 'username-study-room'}" class="home__link">Sala de Estudos</b-link>.
    </p>
  </b-card>
</template>

<script>
export default {
  name: 'FinishedRequirementsCard',
  props: {
    finishedRequirementsList: {
      type: Array,
      required: true,
    },
    careerName: {
      type: String,
      required: true,
    },
    userLevel: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="postcss">

.home__featured-text {
  color: #31afaf;
  font-weight: bold;
}

</style>