<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import {mapActions, mapMutations} from 'vuex'
// import {channel} from 'boot/pusher'


export default {
  name: 'App',
  data() {
    return {
      user: '{}'
    }
  },
  mounted() {
    this.initialLoadCurrency()
  },
  methods: {
    ...mapActions('settings', ['initialLoadCurrency'])

  }

}
</script>
