<template>
  <div class="auth-page">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="6" lg="4">
          <v-card class="auth-card mx-auto px-6 py-8">
            <div class="d-flex align-center mb-2">
              <v-icon class="mr-2" color="secondary" icon="mdi-account-plus"></v-icon>
              <div class="text-h6 font-weight-bold">Create account</div>
            </div>
            <div class="text-body-2 text-medium-emphasis mb-6">
              아이디와 비밀번호를 입력해 회원가입을 완료하세요.
            </div>

            <v-form v-model="form" @submit.prevent="signup">
              <v-text-field
                v-model="id"
                :readonly="loading"
                :rules="[required, checkIdValidation]"
                class="mb-3"
                label="Id"
                prepend-inner-icon="mdi-account"
                clearable
              ></v-text-field>

              <v-text-field
                v-model="password"
                :readonly="loading"
                :rules="[required, checkValidPassword]"
                class="mb-3"
                type="password"
                label="Password"
                prepend-inner-icon="mdi-lock"
                placeholder="영문+숫자 8자리 이상"
                clearable
              ></v-text-field>

              <v-text-field
                v-model="password2"
                :readonly="loading"
                :rules="[required, checkSamePassword]"
                class="mb-2"
                type="password"
                label="Password check"
                prepend-inner-icon="mdi-lock-check"
                placeholder="비밀번호를 다시 입력"
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
                Sign Up
              </v-btn>
            </v-form>

            <v-alert
              v-model="alert"
              class="mt-5"
              border="start"
              close-label="Close Alert"
              :color="alertColor"
              :title="title"
              variant="tonal"
              closable
            >
              {{ resultMessage }}
            </v-alert>
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
  import { checkDuplicatedId, signUpUser } from "../api/users";
  
  export default defineComponent({
      setup() {
          const form = ref(false)
          const id = ref(null)
          const password = ref(null)
          const password2 = ref(null)
          const loading = ref(false)
          const overlay = ref(false)
          const alert = ref(false)
          const resultMessage = ref(null)
          const title = ref(null)
          const alertColor = ref(null)
          const onSubmit = () => {
              if (!this.form) {return}
              this.loading = true
              setTimeout(() => (this.loading = false), 2000)
          }
          const required = (v) => {
              return !!v || 'Field is required'
          }

          const checkValidPassword = (v) => {
            const reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
            if (!reg.test(v)) {
                return "영문, 숫자 조합 8자리 이상 입력해주세요"
            }
          }

          const checkSamePassword = (v) => {
            if (password.value !== v) {
                return "비밀번호가 일치해야 합니다."
            }
          }

          const checkIdValidation = async (v) => {
            if (v.length < 8) {
                return "id는 8자 이상 필요합니다."
            } else {
                const unique = await checkDuplicatedId({id: v})
                if (unique === false){
                    return "중복된 Id 입니다."
                }
            }
          }

          const signup = async () => {
            overlay.value = !overlay.value
            // const encryptedPassword = await commonObj.encryptData(password.value)
            const encryptedPassword = password.value
            console.log(encryptedPassword)
            const requestParams = {id: id.value, password: password.value}
            const insertedId = await signUpUser(requestParams)
            overlay.value = !overlay.value
            alert.value = true
            password.value = null
            password2.value = null
            if (insertedId === false) {
              title.value = "Fail"
              alertColor.value = "orange-accent-4"
              resultMessage.value = `${id.value} 회원가입 실패`
            } else {
              title.value = "Success"
              alertColor.value = "deep-purple-accent-4"
              resultMessage.value = `${id.value} 회원가입 완료`
            }
            id.value = null           
          }
  
          return {
              form,
              id,
              password, 
              password2,
              loading,
              onSubmit,
              required,
              checkSamePassword,
              checkIdValidation,
              checkValidPassword,
              overlay,
              signup,
              alert,
              resultMessage,
              title,
              alertColor
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
  