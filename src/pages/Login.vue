<template>
<q-page padding>

  <div class="q-pa-md absolute-center">
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">

    <q-card bordered rounded class="bg-white my-card" style="width: 300px">
      <q-card-section>
        <div class="text-h6 text-center">Login</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        rounded
        outlined
        v-model="email"
        label="Email"
        hint="email you registered with"
        lazy-rules
        :rules="[val => isValidEmailAddress(val) || 'Please enter a valid email address']"
      />

      <q-input
        rounded
        outlined
        type="password"
        v-model="password"
        label="Password"
        lazy-rules
        :rules="[
          val => val.length >= 8 || 'please your password must be atleast 8 characters'
        ]"
      />
      <div class="text-center">
        <q-btn label="Login" type="submit" color="primary"/>
      </div>
      
      <div class="text-center q-pt-sm">
        <span>dont have an account?
          <q-btn flat to="/register" color="primary" size="md" label="Register" />
        </span>
      </div>
    </q-form>
      </q-card-section>
    </q-card>
  </transition>
  </div>
</q-page>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      email: '',
      password: '',
      prompt: false,
      emailAddress: ''
    }
  },

  methods: {
    ...mapActions('auth', ['login']),
    onSubmit () {
      const data = {
        email: this.email,
        password: this.password
      }
      this.login(data)
    },
  isValidEmailAddress(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 650px
</style>