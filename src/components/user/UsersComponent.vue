<template>
  <div class="container">
    <div class="analizing">
      <h1>Все пользователи</h1>
      <div class="poisk-con">
        <input v-model="searchQuery" placeholder="Поиск" type="text">
        <img src="@/assets/notifications_none.svg" alt="">
        <img class="admin-logo" :src="currentUser.photo" alt="">
      </div>
    </div>
    <div class="user-content">
      <table class="user-table" v-if="filteredUsers.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Юзер</th>
            <th>Имя</th>
            <th>Номер телефона</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id" @click="openUserDetailsPage(user.id)">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.status }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>Загрузка данных...</p>
    </div>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">&lt;</button>
      <button 
        v-for="pageNumber in paginationButtons" 
        :key="pageNumber" 
        :class="{ active: currentPage === pageNumber, ellipsis: pageNumber === '...'}" 
        @click="pageNumber !== '...' && changePage(pageNumber)">
        {{ pageNumber }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages">&gt;</button>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Информация о пользователе</h2>
        <p><strong>ID:</strong> {{ selectedUser.id }}</p>
        <p><strong>Юзер:</strong> {{ selectedUser.username }}</p>
        <p><strong>Имя:</strong> {{ selectedUser.name }}</p>
        <p><strong>Номер телефона:</strong> {{ selectedUser.phone }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';
import { mapGetters } from 'vuex';
import './userscomponent.css';

export default {
  name: 'UsersComponent',
  data() {
    return {
      users: [],
      searchQuery: "",
      currentPage: 1,
      pageSize: 10, // Количество пользователей на странице
      showModal: false,
      selectedUser: null
    };
  },
  computed: {
    ...mapGetters(['currentUser']),
    filteredUsers() {
      const query = this.searchQuery.toLowerCase();
      return this.users.filter(user => user.name.toLowerCase().includes(query));
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.pageSize);
    },
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredUsers.slice(startIndex, endIndex);
    },
    paginationButtons() {
      const buttons = [];
      buttons.push(1);
      if (this.currentPage > 3) {
        buttons.push('...');
      }
      if (this.currentPage > 2) {
        buttons.push(this.currentPage - 1);
      }
      if (this.currentPage !== 1 && this.currentPage !== this.totalPages) {
        buttons.push(this.currentPage);
      }
      if (this.currentPage < this.totalPages - 1 && this.currentPage + 1 < this.totalPages) {
        buttons.push(this.currentPage + 1);
      }
      if (this.currentPage < this.totalPages - 2) {
        buttons.push('...');
      }
      if (this.totalPages > 1) {
        buttons.push(this.totalPages);
      }
      return buttons.filter((v, i, a) => a.indexOf(v) === i); // Удаляем дубликаты
    }
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const usersData = response.data;

        this.users = usersData.map(user => ({
          id: user.id,
          username: user.username,
          name: user.name,
          phone: user.phone,
          status: "active" // Предположительно, статус статичен, так как API его не предоставляет
        }));
      } catch (error) {
        console.error('Ошибка при получении данных пользователей:', error);
      }
    },
    openUserDetailsPage(userId) {
      router.push({ name: 'user-details', params: { id: userId } });
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    changePage(pageNumber) {
      if (pageNumber !== '...') {
        this.currentPage = pageNumber;
      }
    },
    openModal(userId) {
      this.selectedUser = this.users.find(user => user.id === userId);
      this.showModal = true;
    },
    closeModal() {
      this.selectedUser = null;
      this.showModal = false;
    }
  }
};
</script>
