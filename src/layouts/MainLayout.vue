<template>
  <q-layout view="hHh lpR lFf" class="bg-brown-1">

    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          FendBank Plc
        </q-toolbar-title>
        <q-chip v-if="isLoggedIn">
          <q-avatar>
            <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png"> -->
            <img :src="`/img/users/default.jpg`">
          </q-avatar>
          {{firstName}}
      </q-chip>
      <div class="logout">
      <q-btn flat label="logout" v-if="isLoggedIn" @click="logout" />
      </div>
      </q-toolbar>
    </q-header>

    <q-drawer 
      v-model="left" 
      elevated
      dense
      :width="200"
      side="left" 
      content-class="bg-brown-1"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
    >
        <!-- home route -->
        <q-item
          clickable
          to="/"
        >
        <q-item-section avatar>
          <q-icon color="primary" name="account_balance" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Home</q-item-label>
        </q-item-section>
      </q-item>

      <!-- deposit route -->
        <q-item
          clickable
          @click="showDialog({show:true, name: 'deposit'})"
        >
        <q-item-section avatar>
          <q-icon color="primary" name="payment" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Deposit Funds</q-item-label>
        </q-item-section>
      </q-item>

      <!-- Withdrawal route -->
        <q-item
          clickable
          @click="showDialog({show:true, name: 'withdrawal'})"
        >
        <q-item-section avatar>
          <q-icon color="primary" name="attach_money" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Withdrawal</q-item-label>
        </q-item-section>
      </q-item>

      <!-- settings route -->
        <q-item
          to="/settings"
        >
        <q-item-section avatar>
          <q-icon color="primary" name="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Settings</q-item-label>
        </q-item-section>
      </q-item>

        <!-- logout route -->
      <q-item
         clickable v-if="isLoggedIn" @click="logout" class="logoutbig"
        >
        <q-item-section avatar>
          <q-icon color="primary" name="ion-power"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Logout</q-item-label>
        </q-item-section>
      </q-item>

    </q-drawer>
    <transactionModal v-if="user" :email="this.user.email" :name="this.user.name" />
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-primary text-white text-center">
      <q-toolbar>
        <q-toolbar-title>
          &copy; {{new Date().getFullYear()}}
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import {mapState,mapActions, mapGetters} from 'vuex'
export default {
  components: { 
    'transactionModal': require('src/components/Modal').default,
     },
  data () {
    return {
      left: false,
      miniState: true
    }
  },
  computed: {
    ...mapState('auth', ['isLoggedIn']),
    ...mapGetters('auth', ['user']),
    firstName() {
      return this.user.name.split(' ')[0]
    }
  },
  methods: {
    ...mapActions('auth', ['logout','getUser', 'test']),
    ...mapActions('transactions', ['showDialog'])
  },
    mounted() {
    this.getUser()
  },
}
</script>

<style>
  @media screen and (max-width: 768px){
    .logout {
      display: none
    }
  }
  @media screen and (min-width: 768px){
    .logoutbig {
      display: none
    }
  }
</style>

