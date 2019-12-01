<template>
  <div class="container">
    {{ careerData }}
    {{ recommendedContents }}
  </div>
</template>

<script>
import EvomapApi from '~/services/evomap-api.js';
import { mapState } from 'vuex';

export default {
  layout: 'evomap',
  computed: {
    ...mapState('page', {
      careerData: state => state.careerData,
      recommendedContents: state => state.recommendedContents,
    }),
  },
  async fetch({ store, error, params, app: { $axios } }) {
    try {
      const userService = new EvomapApi($axios, 'users');
      const username = params.username;

      const career = await userService.getUserCareerByUsername(username);
      const recommendedContents = await userService.getUserRecommendedContents(username);

      if (!career || !career.data || !recommendedContents || !recommendedContents.data) {
        return error({ statusCode: 500 })
      }

      store.dispatch('page/assign', {
        careerData: career.data,
        recommendedContents: recommendedContents.data
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