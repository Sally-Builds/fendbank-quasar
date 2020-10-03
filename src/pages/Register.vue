<template>
<q-page padding>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    <div>
    <q-card bordered class="bg-white my-card q-pt-md" >
      <q-card-section>
        <div class="text-h6 text-center">Register</div>
      </q-card-section>

      <q-separator class="q-mb-md" inset />

    <q-form
      @submit="onSubmit"
    >
        <div class="row q-pa-sm">
          <div class="col">
            <q-input
              rounded
              outlined
              v-model="formData.name"
              label="Full name"
              hint="first name and surname"
              lazy-rules
              clearable
              :rules="[val => !!val || 'Field is Required']"
            />
          </div>
        </div>
        <div class="row q-pa-sm">
          <div class="col">
            <q-input
              rounded
              outlined
              v-model="formData.email"
              label="Email"
              hint="email you registered with"
              lazy-rules
              :rules="[isValidEmailAddress]"
            />
          </div>
        </div>

        <div class="row q-pa-sm">
          <div class="col">
            <q-input
              rounded
              outlined
              type="password"
              v-model="formData.password"
              label="Password"
              lazy-rules
              :rules="[
                val => val.length >= 8 || 'please your password must be atleast 8 characters'
              ]"
            />
          </div>
        </div>

        <div class="row q-pa-sm">
          <div class="col">
            <q-input
            rounded
            outlined
            type="password"
            v-model="formData.confirmPassword"
            label="Confirm Password"
            lazy-rules
            :rules="[
              val => val === formData.password || 'passwords dont match'
            ]"
          />
          </div>
        </div>

          <div class="row justify-center">
          <q-toggle v-model="accept" class="col-12-sm q-px-sm" label="I accept the license and terms" />
          
          <div class="text-center">
            <q-btn @click="terms = true" class="col-12-sm q-px-sm" label="view License" flat color="primary"/>
          </div>
          </div>
          <div class="text-center q-pa-sm">
            <q-btn label="Register" type="submit" color="primary"/>
          </div>

          <div class="text-center q-pt-sm">
            <span>already have an account?
              <q-btn flat to="/" color="primary" size="md" label="Login" />
            </span>
          </div>
          
      </q-form>
    </q-card>

    <q-dialog v-model="terms">
      <q-card>
        <q-card-section class="text-center">
          <div class="text-h6">License and Terms</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>
        </q-card-section>
        <q-separator />
          <q-card-actions align="right" class="bg-white text-red">
            <q-btn flat label="Close" v-close-popup />
          </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
  </transition>
  </q-page>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },

      accept: false,
      terms: false
    }
  },
  methods: {
    ...mapActions('auth', ['signup']),
    async onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        const data = {
          name: this.formData.name,
          email: this.formData.email,
          password: this.formData.password,
          confirmPassword: this.formData.confirmPassword,
        }
        this.signup(data)
      }
    },
    isValidEmailAddress(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
}
</script>


<style>
.my-card {
        max-width: 500px;
        margin: 0 auto;
    }
</style>