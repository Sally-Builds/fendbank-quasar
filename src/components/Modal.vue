<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- <q-btn label="Maximized" color="primary" @click="dialog = true" /> -->

    <q-dialog
      v-model="paymentDialog.dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="close" color="red" v-close-popup @click="showDialog({show: false, name: ''})">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section v-if="currencyConverter">
          <div v-if="user" class="text-h6 text-center">
            Account Balance: ${{accountBalance | toDollars}} <br />
            NB: All your Transactions will be done in Naira
            </div>
        </q-card-section>

        <q-card-section v-else>
          <div v-if="user" class="text-h6 text-center">Account Balance: &#8358;{{accountBalance.toLocaleString()}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none absolute-center">
            <q-card class="bg-grey-3" style="width: 300px">
              <q-card-section>
                <div class="text-h6 text-center text-primary">{{paymentDialog.name.toUpperCase()}}</div>
              </q-card-section>

              <q-card-section>
                <q-form @submit="submit">
                  <q-input
                    rounded
                    outlined
                    v-model.number="description"
                    type="text"
                    label="Description"
                    autofocus
                    hint="What is this transaction for?"
                  />
                  <q-input
                  class="q-pt-sm"
                    rounded
                    outlined
                    v-model.number="paymentData.amount"
                    type="Number"
                    label="Amount"
                    hint="enter amount you want to deposit"
                    lazy-rules
                    :rules="rules"
                  />
                  <div class="text-center q-pt-md">
                    <q-btn 
                    :label="paymentDialog.name === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds'" 
                    type="submit" color="primary"/>
                  </div>
                </q-form>
              </q-card-section>
              
            </q-card>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  props: {
    dialog: Boolean,
    email: String,
    name: String,
  },
  data () {
    return {
      description: '',
      maximizedToggle: true,
      transactionStatus: false,
      paymentData: {
        tx_ref: this.generateReference(),
        amount: '',
        currency: 'NGN',
        payment_options: 'card,ussd',
        redirect_url: '',
        meta: {
          counsumer_id: '7898',
          consumer_mac: 'kjs9s8ss7dd',
        },
        customer: {
          name: this.name,
          email: this.email,
          // phone_number: '081845***044',
        },
        customizations: {
          title: 'FendBank',
          description: 'Deposit funds to your FendBank account',
          logo: '/images/logo2.png',
        },
        callback: this.makePaymentCallback,
        onclose: this.closedPaymentModal,
      },
    }
  },
  computed: {
    ...mapState('transactions', ['paymentDialog']),
    ...mapGetters('auth', ['accountBalance', 'user']),
    ...mapState('settings', ['currencyConverter']),
    rules() {
      let rules = []
      if(this.paymentDialog.name) {
        let ruleA = val => typeof val == 'number' || 'please enter a number'
        rules.push(ruleA)
      }
      if(this.paymentDialog.name === 'withdrawal') {
        let ruleB = val => val * 1 < this.accountBalance * 1 || 'Insufficient funds'
        rules.push(ruleB)
      }
      return rules
    }

  },
  filters: {
    toDollars(value) {
      return (value / 385).toLocaleString()
    }
  },
  methods: {
    ...mapActions('transactions', ['showDialog', 'depositFunds']),
    submit() {
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you sure you want to ${this.paymentDialog.name}
        the sum of <span class="text-primary text-h6">&#8358;${this.paymentData.amount}?</span>`,
        html: true,
        cancel: true,
        persistent: true
      }).onOk (() => {
        if(this.paymentDialog.name === 'deposit'){
          this.payViaService()
        }
        if(this.paymentDialog.name === 'withdrawal') {
          this.depositFunds(
            {amount: this.paymentData.amount, 
            description: this.description, 
            name: this.paymentDialog.name,
            date: Date.now()}
          )
          this.$q.notify({
            color: 'green-5',
          textColor: 'white',
          icon: 'check',
          message: 'Payment Successful'
        })
          this.paymentData.amount = ''
          this.description = '' 
        }
      }).onCancel(() => {
      })
      
    },
    payViaService() {
      this.payWithFlutterwave(this.paymentData)
    },
    makePaymentCallback(response) {
      if(response.status === 'successful'){
        this.depositFunds({amount: response.amount, 
        description: this.description, 
        name: this.paymentDialog.name,
        date: Date.now()}
      )
        this.transactionStatus = true
        this.paymentData.amount = null
        this.description = ''
      }
    },
    closedPaymentModal() {
      if(this.transactionStatus === true) {
        this.$q.notify({
          color: 'green-5',
          textColor: 'white',
          icon: 'check',
          message: 'Payment Successful'
        })
      }else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'cancel',
          message: 'transaction not successful. Something went wrong'
        })
      }
    },
    generateReference() {
      const date = new Date()
      return date.getTime().toString()
    },
  }
}
</script>