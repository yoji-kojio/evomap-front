<template>
  <img :src="images.logo" />
</template>

<script>

import logo from '~/assets/evomap-logo.png';

export default {
  data() {
    return {
      images: {
        logo,
      },
    };
  },
};
</script>
