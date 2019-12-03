<template>
  <div class="pt-5">
    <b-jumbotron header-level="5" :header="careerData.name" :lead="careerData.description" class="home__jumbotron mb-0" fluid />
    <b-progress :max="progressMax" height="35px" class="home__progress-bar mb-5" show-progress animated>
      <b-progress-bar :value="progressValue">
        Your progress: <strong>{{ progressValue.toFixed(2) }} / {{ progressMax }}</strong>
      </b-progress-bar>
    </b-progress>
    <b-container>
      <b-row>
        <b-col cols="12" order="2" md="6" order-md="1">
          <FinishedRequirementsCard
            :finished-requirements-list="finishedRequirements"
            :career-name="careerData.name"
            :user-level="userCurrentLevel"
          />
        </b-col>
        <b-col cols="12" order="1" md="6" order-md="2" class="mb-3">
          <img :src="images.studySvg" class="home__image" />
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="p-4 my-5 bg-dark">
      <h2 class="home__badges-title mb-4 text-center">Minhas recompensas</h2>
      <b-row align-h="center">
        <b-col class="mb-3 col-2">
          <b-img v-if="progressValue >= 20" :src="images.badge1" v-b-tooltip.hover title="Brilha brilha estrelinha!" class="home__badge-item" alt="Badge 1"></b-img>
          <b-img v-else :src="images.locked" class="home__badge-item" alt="Badge Locked"></b-img>
        </b-col>
        <b-col class="mb-3 col-2">
          <b-img v-if="progressValue >= 40" :src="images.badge2" v-b-tooltip.hover title="Fechadao com a Carreira" class="home__badge-item" alt="Badge 2"></b-img>
          <b-img v-else :src="images.locked" class="home__badge-item" alt="Badge Locked"></b-img>
        </b-col>
        <b-col class="mb-3 col-2">
          <b-img v-if="progressValue >= 60" :src="images.badge3" v-b-tooltip.hover title="Vale mais que Diamante" class="home__badge-item" alt="Badge 3"></b-img>
          <b-img v-else :src="images.locked" class="home__badge-item" alt="Badge Locked"></b-img>
        </b-col>
        <b-col class="mb-3 col-2">
          <b-img v-if="progressValue >= 80" :src="images.badge4" v-b-tooltip.hover title="Ricaço" class="home__badge-item" alt="Badge 3"></b-img>
          <b-img v-else :src="images.locked" class="home__badge-item" alt="Badge Locked"></b-img>
        </b-col>
        <b-col class="mb-3 col-2">
          <b-img v-if="progressValue >= 100" :src="images.badge5" v-b-tooltip.hover title="Rei de todos!" class="home__badge-item" alt="Badge 3"></b-img>
          <b-img v-else :src="images.locked" class="home__badge-item" alt="Badge Locked"></b-img>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import EvomapApi from '~/services/evomap-api.js';
import FinishedRequirementsCard from '~/components/finished-requirements-card.vue';
import { mapState } from 'vuex';
import studySvg from '~/assets/svg/study.svg';
import badge1 from '~/assets/badges/cracha.png';
import badge2 from '~/assets/badges/shield.png';
import badge3 from '~/assets/badges/diamond.png';
import badge4 from '~/assets/badges/recompensa.png';
import badge5 from '~/assets/badges/coroa.png';
import locked from '~/assets/badges/locked.png';

export default {
  layout: 'evomap',
  data() {
    return {
      images: {
        studySvg,
        badge1,
        badge2,
        badge3,
        badge4,
        badge5,
        locked,
      },
    };
  },
  components: {
    FinishedRequirementsCard,
  },
  computed: {
    ...mapState('page', {
      careerData: state => state.careerData,
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
    finishedRequirements() {
      return this.requirementsData.finished_requirements;
    },
    userCurrentLevel() {
      const { requirementsData: { finished_requirements, all_requirements } } = this;
      const progress = (finished_requirements.length / all_requirements.length) * 100;

      if(progress <= 30) {
        return 'Aspirante a Desenvolvedor';
      } else if(progress <= 70) {
        return 'Desenvolvedor Junior';
      } else if(progress <= 90) {
        return 'Desenvolvedor Pleno';
      } else {
        return 'Desenvolvedor Senior';
      }
    },
  },
  async fetch({ store, error, params, app: { $axios } }) {
    try {
      const userService = new EvomapApi($axios, 'users');
      const username = params.username;

      const career = await userService.getUserCareerByUsername(username);
      const requirements = await userService.getUserRequirementsByUsername(username);

      if (!career || !career.data || !requirements || !requirements.data) {
        return error({ statusCode: 500 })
      }

      store.dispatch('page/assign', {
        careerData: career.data,
        requirementsData: requirements.data
      });
    } catch (err) {
      if (process.server) {
        console.error('index.vue', err.message);
        console.error(err.stack);
      }
      console.log(err);
      error({ statusCode: 500 });
    }
  },
}
</script>

<style lang="postcss">

.home__jumbotron {
  background-color: rgb(27, 25, 25);
  color: #3acaca;
}

.home__progress-bar {
  border-radius: 0;
}

.home__progress-bar .progress-bar {
  background-color: #3acaca;
}

.home__image {
  width: 100%;
}

.home__badges-title {
  color: #3acaca;
  font-weight: 600;
}

.home__badge-item {
  max-width: 100px;
}

</style>