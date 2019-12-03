<template>
  <div>
    <b-container class="career-badges p-4">
      <h2 class="home__badges-title mb-4 text-center">Minhas recompensas</h2>
      <b-row align-h="center">
        <b-col class="mb-3 col-6 col-md-2">
          <b-img v-if="progress >= 20" :src="images.badge1" v-b-tooltip.hover title="Brilha brilha estrelinha!" class="home__badge-item" alt="Badge 1"></b-img>
          <b-img v-else :src="images.locked" class="home__badge-item" alt="Badge Locked"></b-img>
        </b-col>
        <b-col class="mb-3 col-6 col-md-2">
          <b-img v-if="progress >= 40" :src="images.badge2" v-b-tooltip.hover title="Fechadao com a Carreira" class="home__badge-item" alt="Badge 2"></b-img>
          <b-img v-else :src="images.locked" class="home__badge-item" alt="Badge Locked"></b-img>
        </b-col>
        <b-col class="mb-3 col-6 col-md-2">
          <b-img v-if="progress >= 60" :src="images.badge3" v-b-tooltip.hover title="Vale mais que Diamante" class="home__badge-item" alt="Badge 3"></b-img>
          <b-img v-else :src="images.locked" class="home__badge-item" alt="Badge Locked"></b-img>
        </b-col>
        <b-col class="mb-3 col-6 col-md-2">
          <b-img v-if="progress >= 80" :src="images.badge4" v-b-tooltip.hover title="Ricaço" class="home__badge-item" alt="Badge 3"></b-img>
          <b-img v-else :src="images.locked" class="home__badge-item" alt="Badge Locked"></b-img>
        </b-col>
        <b-col class="mb-3 col-6 col-md-2">
          <b-img v-if="progress >= 100" :src="images.badge5" v-b-tooltip.hover title="Rei de todos!" class="home__badge-item" alt="Badge 3"></b-img>
          <b-img v-else :src="images.locked" class="home__badge-item" alt="Badge Locked"></b-img>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import badge1 from '~/assets/badges/cracha.png';
import badge2 from '~/assets/badges/shield.png';
import badge3 from '~/assets/badges/diamond.png';
import badge4 from '~/assets/badges/recompensa.png';
import badge5 from '~/assets/badges/coroa.png';
import locked from '~/assets/badges/locked.png';

export default {
  name: 'CareerBadges',
  data() {
    return {
      images: {
        badge1,
        badge2,
        badge3,
        badge4,
        badge5,
        locked,
      },
    };
  },
  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="postcss">

.career-badges {
  background-color: rgb(27, 25, 25);
  border-radius: 5px;
}

</style>