<template>
  <div class="container">
    <div class="analizing">
      <h1>Водители</h1>
      <div class="poisk-con">
        <input v-model="searchQuery" placeholder="Поиск" type="text">
        <img src="@/assets/notifications_none.svg" alt="">
        <img class="admin-logo" :src="currentUser.photo" alt="">
      </div>
    </div>

    <div class="filter">
      <img src="@/assets/filter.svg" alt="" />
      <h4>Фильтр</h4>
      <div class="filter-item">
        <div class="dropdown">
          <button class="burger-icon" @click="openModal('gender')">Пол</button>
        </div>
      </div>
      <div class="filter-item">
        <div class="dropdown">
          <button class="burger-icon" @click="openModal('tariff')">Тариф</button>
        </div>
      </div>
      <div class="filter-item">
        <div class="dropdown">
          <button class="burger-icon" @click="openModal('status')">Статус</button>
        </div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Имя/Фамилия</th>
          <th>Пол</th>
          <th>Статус</th>
          <th>Тариф</th>
          <th>Возраст</th>
          <th>Номер телефона</th>
          <th>Номер машины</th>
          <th>Марка машины</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="driver in paginatedDrivers" :key="driver.id" @click="openDriverDetailsPage(driver.id)">
          <td class="user-info">
            <img :src="currentUser.photo" alt="" class="avatar" />
            <div>
              <div>{{ driver.name }}</div>
            </div>
          </td>
          <td>{{ driver.gender }}</td>
          <td>{{ driver.status }}</td>
          <td>{{ driver.tariff }}</td>
          <td>{{ driver.age }}</td>
          <td>{{ driver.phoneNumber }}</td>
          <td>{{ driver.carNumber }}</td>
          <td class="income">{{ driver.carModel }}</td>
        </tr>
      </tbody>
    </table>
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

    <!-- Модальное окно -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h4>Выберите параметры фильтра</h4>
        <div v-if="currentFilter === 'gender'">
          <label><input type="checkbox" v-model="selectedGender" value="женский" />
            Женский</label>
          <label><input type="checkbox" v-model="selectedGender" value="мужской" />
            Мужской</label>
        </div>
        <div v-if="currentFilter === 'tariff'">
          <label><input type="checkbox" v-model="selectedTariff" value="комфорт" />
            Комфорт</label>
          <label><input type="checkbox" v-model="selectedTariff" value="старт" />
            Старт</label>
          <label><input type="checkbox" v-model="selectedTariff" value="бизнес" />
            Бизнес</label>
        </div>
        <div v-if="currentFilter === 'status'">
          <label><input type="checkbox" v-model="selectedStatus" value="активные" />
            Активные</label>
          <label><input type="checkbox" v-model="selectedStatus" value="неактивные" />
            Неактивные</label>
        </div>
        <button class="closeModal" @click="closeModal">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import "./Driverspanel.css";
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      searchQuery: "",
      selectedGender: [],
      selectedTariff: [],
      selectedStatus: [],
      genderDropdownOpen: false,
      tariffDropdownOpen: false,
      statusDropdownOpen: false,
      drivers: [], // Для хранения загруженных водителей
      filteredDrivers: [],
      isModalOpen: false, // Состояние для модального окна
      currentFilter: "", // Для хранения текущего типа фильтра
      currentPage: 1,
      pageSize: 10 // Количество водителей на странице
    };
  },
  methods: {
    openDriverDetailsPage(driverId) {
      // Перенаправление на новую страницу с передачей ID водителя в качестве параметра
      router.push({ name: "driver-details", params: { id: driverId } });
    },
    toggleDropdown(dropdown) {
      if (dropdown === "gender") {
        this.genderDropdownOpen = !this.genderDropdownOpen;
        this.tariffDropdownOpen = false;
        this.statusDropdownOpen = false;
      } else if (dropdown === "tariff") {
        this.tariffDropdownOpen = !this.tariffDropdownOpen;
        this.genderDropdownOpen = false;
        this.statusDropdownOpen = false;
      } else if (dropdown === "status") {
        this.statusDropdownOpen = !this.statusDropdownOpen;
        this.genderDropdownOpen = false;
        this.tariffDropdownOpen = false;
      }
    },
    openModal(filterType) {
      this.isModalOpen = true;
      this.currentFilter = filterType;
      this.closeAllDropdowns();
      this[`${filterType}DropdownOpen`] = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.currentFilter = "";
      this.closeAllDropdowns();
    },
    closeAllDropdowns() {
      this.genderDropdownOpen = false;
      this.tariffDropdownOpen = false;
      this.statusDropdownOpen = false;
    },
    filterContent() {
      this.updateFilteredContent();
    },
    updateFilteredContent() {
      this.filteredDrivers = this.drivers.filter((driver) => {
        return (
          driver.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          (this.selectedGender.length === 0 ||
            this.selectedGender.includes(driver.gender)) &&
          (this.selectedTariff.length === 0 ||
            this.selectedTariff.includes(driver.tariff)) &&
          (this.selectedStatus.length === 0 ||
            this.selectedStatus.includes(driver.status))
        );
      });
    },
    fetchDrivers() {
      axios
        .get("https://jsonplaceholder.typicode.com/users") // Замените на ваш API endpoint
        .then((response) => {
          const data = response.data;
          this.drivers = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          this.updateFilteredContent();
        })
        .catch((error) => {
          console.error("Ошибка при загрузке водителей:", error);
        });
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
    }
  },
  watch: {
    searchQuery: "filterContent",
    selectedGender: "filterContent",
    selectedTariff: "filterContent",
    selectedStatus: "filterContent",
    currentPage: "updateFilteredContent"
  },
  computed: {
    ...mapGetters(['currentUser']),
    totalPages() {
      return Math.ceil(this.filteredDrivers.length / this.pageSize);
    },
    paginatedDrivers() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredDrivers.slice(startIndex, endIndex);
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
    this.fetchDrivers();
  },
  
};
</script>

<style>
.pagination button.ellipsis {
  cursor: default;
}
.pagination button.active {
  font-weight: bold;
}
</style>
