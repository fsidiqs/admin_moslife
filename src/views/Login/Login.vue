<template>
  <div>
    <input type="text" name="email" id="" placeholder="email" v-model="email" />
    <input
      type="password"
      name="password"
      id=""
      placeholder="email"
      v-model="password"
    />
    <input type="button" value="Login" @click="loginHandler" />

  </div>
</template>

<script>
import { ApiPost } from '../../utils/httpRequests';
import { mapMutations } from 'vuex';
export default {
  name: 'Login',
  data() {
    return {
      email: 'test@test.com',
      password: '1234',
      birthdate: null, 
    };
  },
  computed: {},
  methods: {
    ...mapMutations(['setAccessToken']),

    async loginHandler() {
      const cred = {
        email: this.email,
        password: this.password,
      };
      let loginResponse;
      try {
        loginResponse = await ApiPost('/auth/login', cred);
        this.setAccessToken(loginResponse.data.data)
      } catch (err) {
          return err
      }

    },
  },
};
</script>

<style></style>
