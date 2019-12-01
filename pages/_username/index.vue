<template>
  <div>
    <b-jumbotron header-level="5" :header="careerData.name" :lead="careerData.description" class="home__jumbotron mb-0" fluid />
    <b-progress :max="progressMax" height="35px" class="home__progress-bar mb-5" show-progress animated>
      <b-progress-bar :value="progressValue">
        Your progress: <strong>{{ progressValue.toFixed(2) }} / {{ progressMax }}</strong>
      </b-progress-bar>
    </b-progress>
    <b-container>
      <b-row>
        <b-col>
          <b-card header="Finished Requirements">
            <p class="card-text mt-2">
              Uau! Parece que você já começou a investir na sua carreira como {{ careerData.name }}!
              Atualmente você pode ser considerado um
              <span class="home__user-level">{{ userCurrentLevel }}</span>
            </p>
            <b-list-group>
              <b-list-group-item
                v-for="requirement in finishedRequirements"
                :key="requirement.id"
              >
                {{ requirement.name }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
        <b-col>
          <img :src="images.studySvg" class="home__image" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import EvomapApi from '~/services/evomap-api.js';
import { mapState } from 'vuex';
import studySvg from '~/assets/svg/study.svg';

export default {
  layout: 'evomap',
  data() {
    return {
      images: {
        studySvg,
      },
    };
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

.home__user-level {
  color: #31afaf;
  font-weight: bold;
}

</style>