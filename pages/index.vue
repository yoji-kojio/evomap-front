<template>
  <div :style="`box-shadow: inset 0 0 0 100vmax rgba(0,0,0,.8); background-image: url(${images.backgroundImage}); background-size: cover;`">
    <div class="container">
      <div>
        <logo />
        <h1 class="title">
          Evomap
        </h1>
        <h2 class="subtitle">
          Se aventure em sua próxima carreira
        </h2>
        <div class="links">
          <a
            href="/yojikojio"
            class="button--green"
          >
            Frontend
          </a>
          <a
            href="/kazukojio"
            class="button--green"
          >
            Backend
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backgroundImage from '~/assets/cover-background.gif';
import Logo from '~/components/Logo.vue'

export default {
  data() {
    return {
      images: {
        backgroundImage,
      },
    };
  },
  components: {
    Logo,
  },
}
</script>

<style>

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  display: block;
  font-size: 70px;
  color: #3acaca;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 24px;
  color: #FFF;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

@media (min-width: 640px) {
  .title {
    font-size: 100px;
  }

  .subtitle {
    font-size: 42px;
  }
}
</style>
