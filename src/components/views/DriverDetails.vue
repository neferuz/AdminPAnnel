<template>
  <div class="container">
    <button class="go-back" @click="goBack"> Назад</button>
    <div class="global_block">
      <div class="photo_name">
        <img src="https://splendorous-granita-f826c7.netlify.app/profile.svg" alt="">
        <!-- <img :src="driver.avatarUrl" alt="Фото водителя"> -->
      </div>
      <div class="content_blocka">
        <div class="info_block">
          <div>
            <p class="label">Имя:</p>
            <p class="value1">{{ driver.name }}</p>
          </div>
          <div>
            <p class="label">Пол:</p>
            <p class="value1">{{ driver.gender }}</p>
          </div>
          <div>
            <p class="label">Статус:</p>
            <p class="value1">{{ driver.status }}</p>
          </div>
          <div>
            <p class="label">Тариф:</p>
            <p class="value1">{{ driver.tariff }}</p>
          </div>
          <div>
            <p class="label">Возраст:</p>
            <p class="value1">{{ driver.age }}</p>
          </div>
        </div>
        <div class="info_block">
          <div>
            <p class="label">Номер телефона:</p>
            <p class="value1">{{ driver.phoneNumber }}</p>
          </div>
          <div>
            <p class="label">Номер машины:</p>
            <p class="value1">{{ driver.carNumber }}</p>
          </div>
          <div>
            <p class="label">Марка машины:</p>
            <p class="value1">{{ driver.carModel }}</p>
          </div>
          <div>
            <p class="label">Номер В/У:</p>
            <p class="value1">{{ driver.drivingLicenseNumber }}</p>
          </div>
          <div>
            <p class="label">Рейтинг:</p>
            <p class="value1">{{ driver.rating }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import './viewsGlobal.css';

export default {
  data() {
    return {
      driver: {}
    };
  },
  created() {
    // Получение ID водителя из параметров маршрута
    const driverId = this.$route.params.id;

    // Отправка запроса к новому API для получения данных о водителе
    axios.get(`https://jsonplaceholder.typicode.com/users/${driverId}`)
      .then(response => {
        this.driver = response.data;
      })
      .catch(error => {
        console.error('Error fetching driver details:', error);
      });
  },
  methods: {
    goBack() {
      // Переход на предыдущую страницу
      this.$router.go(-1);
    }
  }
};
</script>
