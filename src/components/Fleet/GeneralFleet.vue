<template>
  <div class="container">
    <div class="analizing">
      <h1>Автопарк</h1>
      <div class="poisk-con">
        <input v-model="searchQuery" placeholder="Поиск" type="text">
        <img src="@/assets/notifications_none.svg" alt="">
        <img class="admin-logo" :src="currentUser.photo" alt="">
      </div>
    </div>
    <div class="user-content">
      <table class="user-table" v-if="paginatedUsers.length">
        <thead>
          <tr>
            <th>Юзер</th>
            <th>Общее количество поездок</th>
            <th>Всего завершено</th>
            <th>Город проживания</th>
            <th>Место работы</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id" @click="openModal(user)">
            <td>{{ user.name }}</td>
            <td>{{ user.totalTrips }}</td>
            <td>{{ user.completedTrips }}</td>
            <td>{{ user.city }}</td>
            <td>{{ user.workplace }}</td>
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
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Информация о пользователе</h2>
        <p><strong>Юзер:</strong> {{ selectedUser.name }}</p>
        <p><strong>Общее количество поездок:</strong> {{ selectedUser.totalTrips }}</p>
        <p><strong>Всего завершено:</strong> {{ selectedUser.completedTrips }}</p>
        <p><strong>Город проживания:</strong> {{ selectedUser.city }}</p>
        <p><strong>Место работы:</strong> {{ selectedUser.workplace }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import './generalfleet.css';
import { mapGetters } from 'vuex';

export default {
  name: 'GeneralFleet',
  data() {
    return {
      users: [],
      searchQuery: "", // Добавленное свойство для хранения запроса поиска
      showModal: false, // Добавленное свойство для отображения модального окна
      selectedUser: null, // Добавленное свойство для хранения выбранного пользователя
      currentPage: 1, // Текущая страница
      usersPerPage: 10 // Пользователей на странице
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
        this.users = response.data;
      } catch (error) {
        console.error('Ошибка при получении данных пользователей:', error);
      }
    },
    filterContent() {
      // Обновляем отображаемых пользователей при изменении поискового запроса
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    openModal(user) {
      this.selectedUser = user;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedUser = null;
    }
  },
};
</script>
