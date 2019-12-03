<template>
  <div class="page-header pt-5" fluid>
    <b-container>
      <b-row class="px-3">
        <b-col col-12 col-md-8>
          <b-row>
            <h1>
              {{ careerName }}
            </h1>
          </b-row>
          <b-row class="mt-3">
            {{ description }}
          </b-row>
        </b-col>
        <b-col col-12 col-md-4 class="text-center mb-4">
          <b-img
            v-if="progress >= 100"
            :src="images.star"
            v-b-tooltip.hover
            title="Carreira finalizada!"
            alt="Sucesso"
            class="page-header__icon"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import star from '~/assets/badges/star.png';

export default {
  name: 'PageHeader',
  data() {
    return {
      images: {
        star,
      },
    };
  },
  props: {
    careerName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="postcss">

.page-header {
  background-color: rgb(27, 25, 25);
  color: #3acaca;
  min-height: 200px;
}

.page-header__icon {
  width: 100px;
}

</style>