<template>
    <div class="container">
      <button class="go-back" @click="goBack">Назад</button>
      <div class="global_block">
        <div class="photo_name">
          <!-- Проверяем наличие свойства avatarUrl в объекте user -->
          <img v-if="user && user.avatarUrl" :src="user.avatarUrl" alt="Фото пользователя" />
        </div>
        <div class="content_blocka">
          <div class="info_block">
            <div>
              <p class="label">Имя:</p>
              <p class="value1">{{ user && user.name }}</p>
            </div>
            <div>
              <p class="label">Email:</p>
              <p class="value1">{{ user && user.email }}</p>
            </div>
            <div>
              <p class="label">Номер телефона:</p>
              <p class="value1">{{ user && user.phone }}</p>
            </div>
            <div>
              <p class="label">Статус:</p>
              <p class="value1">{{ user && 'active' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  import router from '@/router';
  
  export default {
    data() {
      return {
        user: null
      };
    },
    created() {
      // Получение ID пользователя из параметров маршрута
      const userId = this.$route.params.id;
  
      // Отправка запроса к API для получения данных о пользователе
      axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    },
    methods: {
      goBack() {
        // Переход на предыдущую страницу
        router.go(-1);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Добавьте стили для элементов в вашем шаблоне */
  </style>
  