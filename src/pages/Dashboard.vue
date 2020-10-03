<template>
  <q-page padding>
    <!-- display account balance here -->
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    <q-banner class="bg-blue-grey-5 text-grey-2" v-if="user" rounded >
      <template v-slot:avatar>
        <q-icon name="account_balance_wallet" color="grey-3" />
      </template>
        <div v-if="user && currencyConverter">Account Balance: ${{accountBalance | toDollars}}</div>
        <div v-if="user && !currencyConverter">Account Balance: &#8358;{{accountBalance.toLocaleString()}}</div>
      <template v-slot:action>
        <q-btn flat color="grey-3" label="deposit funds" @click="showDialog({show:true, name: 'deposit'})" />
        <q-btn flat color="grey-3" label="request withdrawal" @click="showDialog({show:true, name: 'withdrawal'})" />
      </template>
    </q-banner>
  </transition>
  <transactionModal v-if="user" :email="this.user.email" :name="this.user.name"  />
  <!-- lists -->
  <transactionHistory v-if="user" :transactions="getTransactions" />

  </q-page>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  components: {
    'transactionHistory': require('src/components/TransactionHistory').default,
    'transactionModal': require('src/components/Modal').default,
  },
  data() {
    return {
      banner: true,
      tab: 'one',
      src: '',
    }
  },
  computed: {
    ...mapState('transactions', ['transactions','transactionDialog']),
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['accountBalance']),
    ...mapGetters('transactions', ['getTransactions']),
    ...mapState('settings', ['currencyConverter']),
  },
  methods: {
    ...mapActions('transactions', ['showDialog'])
  },  
  filters: {
    toDollars(value) {
      return (value / 385).toLocaleString()
    }
  },
}
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 250px
}
</style>
