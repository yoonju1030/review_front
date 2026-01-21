<template>
  <div class="auth-page">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="6" lg="4">
          <v-card class="auth-card mx-auto px-6 py-8">
            <div class="d-flex align-center mb-2">
              <v-icon class="mr-2" color="primary" icon="mdi-login"></v-icon>
              <div class="text-h6 font-weight-bold">Welcome back</div>
            </div>
            <div class="text-body-2 text-medium-emphasis mb-6">
              로그인하여 계속하세요.
            </div>

            <v-form v-model="form" @submit.prevent="logIn">
              <v-text-field
                v-model="id"
                :readonly="loading"
                :rules="[required]"
                class="mb-3"
                label="Id"
                prepend-inner-icon="mdi-account"
                clearable
              ></v-text-field>

              <v-text-field
                v-model="password"
                :readonly="loading"
                :rules="[required]"
                class="mb-3"
                type="password"
                label="Password"
                prepend-inner-icon="mdi-lock"
                placeholder="Enter your password"
                clearable
              ></v-text-field>

              <v-btn
                :disabled="!form"
                :loading="loading"
                color="primary"
                size="large"
                type="submit"
                variant="flat"
                block
              >
                Sign In
              </v-btn>
            </v-form>

            <v-divider class="my-6"></v-divider>

            <v-btn
              color="secondary"
              size="large"
              variant="outlined"
              block
              @click="move"
            >
              <v-icon class="mr-2" icon="mdi-account-plus"></v-icon>
              Sign Up
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-overlay
      :model-value="overlay"
      class="align-center justify-center"
      :persistent="true"
    >
      <v-progress-circular
        color="primary"
        size="64"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from "vue-router";
import { logInUser } from '@/api/users';
import { useStore } from "vuex";

export default defineComponent({
    setup() {
        const router = useRouter()
        const form = ref(false)
        const id = ref(null)
        const password = ref(null)
        const loading = ref(false)
        const store = useStore()
        const overlay = ref(false)
        const onSubmit = () => {
            if (!this.form) {return}
            this.loading = true
            setTimeout(() => (this.loading = false), 2000)
        }
        const required = (v) => {
            return !!v || 'Field is required'
        }
        
        const move = () => {
          router.push('/signup')
        }

        const logIn = async () => {
          overlay.value = true
          const result = await logInUser({id: id.value, password: password.value})
          if (result.token) {
            store.commit("userStore/setStatus", {login: true, id: id.value})
            store.commit("userStore/setToken", result.token)
          }
          overlay.value = false
          router.go(0)
        } 
        return {
            form,
            id,
            password, 
            loading,
            onSubmit,
            required,
            move,
            logIn,
            overlay
        }
    },
})
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  padding: 24px 0;
}

.auth-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 26, 51, 0.72);
  backdrop-filter: blur(10px);
}
</style>
