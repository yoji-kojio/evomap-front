<template>
  <div>
    <div class="container">
      HOME
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
      careers: state => state.careers,
    }),
  },
  async fetch({ store, error, params, app: { $axios } }) {
    try {
      const careerService = new EvomapApi($axios, 'careers');
      const careers = await careerService.get();

      store.dispatch('page/assign', {
        careers: careers,
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