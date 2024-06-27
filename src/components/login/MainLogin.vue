<template>
  <div class="container3">
    <div class="content">
      <div class="img_content">
        <img src="./login-foto.svg" alt="">
      </div>
      <div class="text_content">
        <div class="image_wrapper">
          <img src="./logo-new2.svg" alt="">
        </div>
        <h1>Вход в админ панель</h1>
        <div>
          <p>Логин</p>
          <input v-model="phone" placeholder="Введите логин" type="text">
        </div>
        <div>
          <p>Пароль</p>
          <input v-model="password" placeholder="Введите пароль" type="password">
        </div>
        <button @click="handleLogin">Войти</button>
      </div>
    </div>
  </div>
</template>

<script>
import './MainLogin.css';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MainLogin',
  data() {
    return {
      phone: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters(['isAdmin', 'isCeo']),
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      const user = { login: this.phone, password: this.password };
      const success = await this.login(user);
      if (success) {
        if (this.isAdmin) {
          this.$router.push({ name: 'home' }); // Переход на панель администратора
        } else if (this.isCeo) {
          this.$router.push({ name: 'Billing' }); // Переход на страницу биллинга для CEO
        } else {
          this.$router.push({ name: 'Users' }); // Переход на страницу пользователя
        }
      } else {
        alert('Неправильный логин или пароль');
      }
    },
  },
};
</script>
