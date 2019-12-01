<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand>
        <img :src="logoIcon" class="d-inline-block align-top" alt="Kitten">
        Evomap
      </b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{name: 'username'}">Home</b-nav-item>
          <b-nav-item :to="{name: 'username-study-room'}">Study Room</b-nav-item>
          <b-nav-item :to="{name: 'username-badges'}">Badges</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <nuxt />
  </div>
</template>

<script>
import logoIcon from '~/assets/logo-icon.png';

export default {
  data() {
    return {
      logoIcon,
    };
  },
}
</script>