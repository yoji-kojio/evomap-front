<template>
  <div class="pt-5">
    <PageHeader
      :career-name="careerData.name"
      :progress="progressValue"
      description="Sala de Estudos"
    />
    <b-progress :max="progressMax" height="35px" class="study-room__progress-bar mb-5" show-progress animated>
      <b-progress-bar :value="progressValue">
        Your progress: <strong>{{ progressValue.toFixed(2) }} / {{ progressMax }}</strong>
      </b-progress-bar>
    </b-progress>
    <b-container>
      <b-row align-h="between">
        <b-card
          v-for="(content, index) in recommendedContents"
          :key="index"
          :title="content.name"
          :img-src="content.image_url"
          :img-alt="content.name"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
        >
          <b-card-text>
            Este curso ensina o básico sobre Curso Exemplo
          </b-card-text>

          <b-button href="#" class="study-room__button">Acessar</b-button>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import EvomapApi from '~/services/evomap-api.js';
import PageHeader from '~/components/page-header.vue';
import { mapState } from 'vuex';

export default {
  layout: 'evomap',
  components: {
    PageHeader,
  },
  computed: {
    ...mapState('page', {
      careerData: state => state.careerData,
      recommendedContents: state => state.recommendedContents,
      requirementsData: state => state.requirementsData,
    }),
    progressValue() {
      const { requirementsData: { finished_requirements, all_requirements } } = this;

      const progress = (finished_requirements.length / all_requirements.length) * 100;
      return progress;
    },
    progressMax() {
      return 100;
    },
  },
  async fetch({ store, error, params, app: { $axios } }) {
    try {
      const userService = new EvomapApi($axios, 'users');
      const username = params.username;

      const career = await userService.getUserCareerByUsername(username);
      const recommendedContents = await userService.getUserRecommendedContents(username);
      const requirements = await userService.getUserRequirementsByUsername(username);

      store.dispatch('page/assign', {
        careerData: career.data,
        recommendedContents: recommendedContents.data,
        requirementsData: requirements.data,
      });
    } catch (err) {
      if (process.server) {
        console.error('study-room.vue', err.message);
        console.error(err.stack);
      }
      console.log(err);
      error({ statusCode: 500 });
    }
  },
}
</script>

<style lang="postcss">

.study-room__jumbotron {
  background-color: rgb(27, 25, 25);
  color: #3acaca;
}

.study-room__progress-bar {
  border-radius: 0;
}

.study-room__progress-bar .progress-bar {
  background-color: #3acaca;
}

.study-room__button {
  background-color: #3acaca;
}

</style>