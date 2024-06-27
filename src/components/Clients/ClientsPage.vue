<template>
  <div>
    <div class="container">
      <div class="user-content">
        <div class="analizing">
          <h1>Все поездки</h1>
          <div class="poisk-con">
            <input v-model="searchQuery" placeholder="Поиск" type="text">
            <img src="@/assets/notifications_none.svg" alt="">
            <img class="admin-logo" :src="currentUser.photo" alt="">
          </div>
        </div>
        <table class="user-table" v-if="paginatedUsers.length">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Все поездки</th>
              <th>Последняя поездка начало</th>
              <th>Последняя поездка конец</th>
              <th>Номер машины</th>
              <th>Тариф</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in paginatedUsers" :key="user.id" @click="openUserModal(user)">
              <td>{{ user.name }}</td>
              <td>
                <ul>
                  <li v-for="trip in user.trips" :key="trip.id">
                    {{ trip.startLocation }} ({{ trip.startTime }}) - {{ trip.endLocation }} ({{ trip.endTime }})
                    | Номер машины: {{ trip.carNumber }} | Тариф: {{ trip.fare }}
                  </li>
                </ul>
              </td>
              <td>{{ getLastTripStartTime(user) }}</td>
              <td>{{ getLastTripEndTime(user) }}</td>
              <td>{{ getLastTripCarNumber(user) }}</td>
              <td>{{ getLastTripFare(user) }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>Загрузка данных...</p>
      </div>
      <div class="pagination">
        <button @click="currentPage--" :disabled="currentPage === 1">&lt;</button>
        <button v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }" @click="currentPage = page">
          {{ page }}
        </button>
        <button @click="currentPage++" :disabled="currentPage === totalPages">&gt;</button>
      </div>
    </div>

    <!-- Модальное окно для детальной информации -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeUserModal">
      <div class="modal-content" @click.stop>
        <h2>{{ selectedUser.name }}</h2>
        <ul>
          <li v-for="trip in selectedUser.trips" :key="trip.id">
            {{ trip.startLocation }} ({{ trip.startTime }}) - {{ trip.endLocation }} ({{ trip.endTime }})
            | Номер машины: {{ trip.carNumber }} | Тариф: {{ trip.fare }}
          </li>
        </ul>
        <button class="closeModal" @click="closeUserModal">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import './ClientsPage.css';
import { mapGetters } from 'vuex';
export default {
  name: 'ClientsPage',
  data() {
    return {
      users: [],
      searchQuery: "", // Добавленное свойство для хранения запроса поиска
      currentPage: 1, // Текущая страница
      usersPerPage: 10, // Пользователей на странице
      isModalOpen: false, // Состояние модального окна
      selectedUser: null // Выбранный пользователь для модального окна
    };
  },
  computed: {
    filteredUsers() {
      // Приводим поисковой запрос к нижнему регистру для нечувствительного к регистру сравнения
      const query = this.searchQuery.toLowerCase();
      // Фильтруем пользователей по имени, если оно содержит поисковой запрос
      return this.users.filter(user => user.name.toLowerCase().includes(query));
    },
    // Вычисляемое свойство, чтобы вычислить индекс первого пользователя на текущей странице
    startIndex() {
      return (this.currentPage - 1) * this.usersPerPage;
    },
    // Вычисляемое свойство, чтобы получить пользователей для текущей страницы
    paginatedUsers() {
      return this.filteredUsers.slice(this.startIndex, this.startIndex + this.usersPerPage);
    },
    // Вычисляемое свойство, чтобы определить общее количество страниц
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.usersPerPage);
    },
    ...mapGetters(['currentUser'])
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        // Загружаем всех пользователей и добавляем для каждого пользователя массив поездок
        this.users = response.data.map(user => ({
          ...user,
          trips: this.generateFakeTrips() // Генерируем фейковые поездки для каждого пользователя
        }));
      } catch (error) {
        console.error('Ошибка при получении данных пользователей:', error);
      }
    },
    // Функция для генерации фейковых поездок
    generateFakeTrips() {
      const trips = [];
      const locations = ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Seattle'];
      const numTrips = Math.floor(Math.random() * 5) + 1; // Случайное количество поездок от 1 до 5
      for (let i = 0; i < numTrips; i++) {
        trips.push(this.generateFakeTrip(locations));
      }
      return trips;
    },
    // Функция для генерации фейковой поездки
    generateFakeTrip(locations) {
      const startTime = this.randomDate(new Date(2020, 0, 1), new Date());
      const endTime = new Date(startTime.getTime() + Math.random() * 3600 * 1000);
      const startLocation = locations[Math.floor(Math.random() * locations.length)];
      let endLocation = locations[Math.floor(Math.random() * locations.length)];
      // Ensure end location is different from start location
      while (endLocation === startLocation) {
        endLocation = locations[Math.floor(Math.random() * locations.length)];
      }
      const carNumber = `Car${Math.floor(Math.random() * 1000)}`; // Генерация случайного номера машины
      const fare = `${(Math.random() * 100).toFixed(2)} руб.`; // Генерация случайного тарифа
      return {
        startTime: startTime.toLocaleString(),
        endTime: endTime.toLocaleString(),
        startLocation,
        endLocation,
        carNumber,
        fare
      };
    },
    // Функция для генерации случайной даты в диапазоне
    randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    },
    // Метод для открытия модального окна с информацией о пользователе
    openUserModal(user) {
      this.selectedUser = user;
      this.isModalOpen = true;
    },
    // Метод для закрытия модального окна
    closeUserModal() {
      this.selectedUser = null;
      this.isModalOpen = false;
    },
    // Функция для получения времени начала последней поездки пользователя
    getLastTripStartTime(user) {
      if (user.trips && user.trips.length > 0) {
        return user.trips[user.trips.length - 1].startTime;
      }
      return 'Нет информации';
    },
    // Функция для получения времени конца последней поездки пользователя
    getLastTripEndTime(user) {
      if (user.trips && user.trips.length > 0) {
        return user.trips[user.trips.length - 1].endTime;
      }
      return 'Нет информации';
    },
    // Методы для получения последнего номера машины и тарифа
    getLastTripCarNumber(user) {
      if (user.trips && user.trips.length > 0) {
        return user.trips[user.trips.length - 1].carNumber;
      }
      return 'Нет информации';
    },
    getLastTripFare(user) {
      if (user.trips && user.trips.length > 0) {
        return user.trips[user.trips.length - 1].fare;
      }
      return 'Нет информации';
    }
  }
};
</script>

<style scoped>
/* Здесь могут быть ваши стили */
</style>
