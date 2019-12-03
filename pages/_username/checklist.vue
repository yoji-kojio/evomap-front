<template>
  <div class="pt-5">
    <PageHeader
      :career-name="careerData.name"
      :progress="progressValue"
      description="Checklist! Anote todo as habilidades que você domina!"
    />
    <b-progress :max="progressMax" height="35px" class="study-room__progress-bar mb-5" show-progress animated>
      <b-progress-bar :value="progressValue">
        Your progress: <strong>{{ progressValue.toFixed(2) }} / {{ progressMax }}</strong>
      </b-progress-bar>
    </b-progress>

    <b-container>
      <b-row>
        <b-col cols="12" order="2" md="6" order-md="1">
          <b-card title="Habilidades incompletas" sub-title="Clique para completar">
            <b-list-group>
              <b-list-group-item
                button
                v-for="requirement in unfinishedUserRequirements"
                :key="requirement.id"
                @click="finishRequirement(requirement.id, requirement)"
              >
                {{ requirement.requirement_name }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
        <b-col cols="12" order="1" md="6" order-md="2" class="mb-3">
          <b-card title="Habilidades completas" sub-title="Clique para cancelar">
            <b-list-group>
              <b-list-group-item
                button
                v-for="requirement in finishedUserRequirements"
                :key="requirement.id"
                active
                @click="finishRequirement(requirement.id, requirement)"
              >
                {{ requirement.requirement_name }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import EvomapApi from '~/services/evomap-api.js';
import PageHeader from '~/components/page-header.vue';
import axios from 'axios'
import { mapState } from 'vuex';
import completedSvg from '~/assets/svg/completed.svg';

export default {
  layout: 'evomap',
  data() {
    return {
      images: {
        completedSvg,
      },
      username: this.$route.params.username,
    };
  },
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
    unfinishedUserRequirements() {
      return this.requirementsData.user_requirements.filter ((uc) => {
        return !uc.finished;
      });
    },
    finishedUserRequirements() {
      return this.requirementsData.user_requirements.filter ((uc) => {
        return uc.finished;
      });
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
  methods: {
    async finishRequirement(userRequirementId, userobject) {
      const userRequirementService = new EvomapApi(axios, 'user_requirements');
      const response = await userRequirementService.finishRequirement(userRequirementId);
      userobject.finished = !userobject.finished;
    },
  },
}
</script>