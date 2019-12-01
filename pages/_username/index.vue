<template>
  <div>
    <div class="container">
      {{ careerData }}
      {{ requirementsData }}
    </div>
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
      requirementsData: state => state.requirementsData,
    }),
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