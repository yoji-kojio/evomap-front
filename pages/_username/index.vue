<template>
  <div class="pt-5">
    <PageHeader
      :career-name="careerData.name"
      :description="careerData.description"
      :progress="progressValue"
    />
    <b-progress :max="progressMax" height="35px" class="home__progress-bar mb-5" show-progress animated>
      <b-progress-bar :value="progressValue">
        Your progress: <strong>{{ progressValue.toFixed(2) }} / {{ progressMax }}</strong>
      </b-progress-bar>
    </b-progress>
    <b-container>
      <b-row>
        <b-col cols="12" md="6" class="mb-3">
          <FinishedRequirementsCard
            :finished-requirements-list="finishedRequirements"
            :career-name="careerData.name"
            :user-level="userCurrentLevel"
          />
        </b-col>
        <b-col cols="12" md="6" class="mb-3">
          <CareerBadges :progress="progressValue" />
          <ActivitiesCall
            :user-level="userCurrentLevel"
            :progress="progressValue"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import EvomapApi from '~/services/evomap-api.js';
import ActivitiesCall from '~/components/activities-call.vue';
import CareerBadges from '~/components/career-badges.vue';
import PageHeader from '~/components/page-header.vue';
import FinishedRequirementsCard from '~/components/finished-requirements-card.vue';
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
  components: {
    ActivitiesCall,
    CareerBadges,
    FinishedRequirementsCard,
    PageHeader,
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