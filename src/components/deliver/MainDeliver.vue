<template>
    <div class="container">
      <div class="analizing">
        <h1>Все курьеры</h1>
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
            <button class="burger-icon" @click="openModal('region')">Регион</button>
          </div>
        </div>
        <div class="filter-item">
          <div class="dropdown">
            <button class="burger-icon" @click="openModal('transport')">Транспорт</button>
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
            <th>Регион</th>
            <th>Транспорт</th>
            <th>Статус</th>
            <th>Возраст</th>
            <th>Номер телефона</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="courier in paginatedCouriers" :key="courier.id" @click="openModalDetails(courier)">
            <td class="user-info">
              <img :src="currentUser.photo" alt="" class="avatar" />
              <div>
                <div>{{ courier.name }}</div>
              </div>
            </td>
            <td>{{ courier.region }}</td>
            <td>{{ courier.transport }}</td>
            <td>{{ courier.status }}</td>
            <td>{{ courier.age }}</td>
            <td>{{ courier.phoneNumber }}</td>
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
  
      <!-- Модальное окно для деталей курьера -->
      <div v-if="isModalDetailsOpen" class="modal-overlay" @click="closeModalDetails">
        <div class="modal-content modal-details" @click.stop>
          <h4>Детали курьера</h4>
          <div class="user-info">
            <img :src="selectedCourier.photo" alt="" class="avatar" />
            <div>
              <div><strong>Имя/Фамилия:</strong> {{ selectedCourier.name }}</div>
              <div><strong>Регион:</strong> {{ selectedCourier.region }}</div>
              <div><strong>Транспорт:</strong> {{ selectedCourier.transport }}</div>
              <div><strong>Статус:</strong> {{ selectedCourier.status }}</div>
              <div><strong>Возраст:</strong> {{ selectedCourier.age }}</div>
              <div><strong>Номер телефона:</strong> {{ selectedCourier.phoneNumber }}</div>
              <div><strong>Общее количество доставок:</strong> {{ selectedCourier.deliveries }}</div>
            </div>
          </div>
          <button class="closeModal" @click="closeModalDetails">Закрыть</button>
        </div>
      </div>
  
      <!-- Модальное окно для фильтра -->
      <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <h4>Выберите параметры фильтра</h4>
          <div v-if="currentFilter === 'region'">
            <label><input type="checkbox" v-model="selectedRegion" value="Северный" /> Северный</label>
            <label><input type="checkbox" v-model="selectedRegion" value="Южный" /> Южный</label>
            <label><input type="checkbox" v-model="selectedRegion" value="Центральный" /> Центральный</label>
          </div>
          <div v-if="currentFilter === 'transport'">
            <label><input type="checkbox" v-model="selectedTransport" value="велосипед" /> Велосипед</label>
            <label><input type="checkbox" v-model="selectedTransport" value="мотоцикл" /> Мотоцикл</label>
            <label><input type="checkbox" v-model="selectedTransport" value="автомобиль" /> Автомобиль</label>
          </div>
          <div v-if="currentFilter === 'status'">
            <label><input type="checkbox" v-model="selectedStatus" value="активные" /> Активные</label>
            <label><input type="checkbox" v-model="selectedStatus" value="неактивные" /> Неактивные</label>
          </div>
          <button class="closeModal" @click="closeModal">Закрыть</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        searchQuery: "",
        selectedRegion: [],
        selectedTransport: [],
        selectedStatus: [],
        couriers: [],
        filteredCouriers: [],
        isModalOpen: false,
        isModalDetailsOpen: false,
        currentFilter: "",
        currentPage: 1,
        pageSize: 10,
        selectedCourier: null
      };
    },
    methods: {
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
      openModalDetails(courier) {
        this.selectedCourier = courier;
        this.isModalDetailsOpen = true;
      },
      closeModalDetails() {
        this.isModalDetailsOpen = false;
        this.selectedCourier = null;
      },
      closeAllDropdowns() {
        this.regionDropdownOpen = false;
        this.transportDropdownOpen = false;
        this.statusDropdownOpen = false;
      },
      filterContent() {
        this.updateFilteredContent();
      },
      updateFilteredContent() {
        this.filteredCouriers = this.couriers.filter((courier) => {
          return (
            courier.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
            (this.selectedRegion.length === 0 || this.selectedRegion.includes(courier.region)) &&
            (this.selectedTransport.length === 0 || this.selectedTransport.includes(courier.transport)) &&
            (this.selectedStatus.length === 0 || this.selectedStatus.includes(courier.status))
          );
        });
      },
      fetchCouriers() {
        axios
          .get("https://jsonplaceholder.typicode.com/users")
          .then((response) => {
            const data = response.data;
            this.couriers = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
              deliveries: Math.floor(Math.random() * 100) + 1 // Генерация случайного количества доставок
            }));
            this.updateFilteredContent();
          })
          .catch((error) => {
            console.error("Ошибка при загрузке курьеров:", error);
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
      selectedRegion: "filterContent",
      selectedTransport: "filterContent",
      selectedStatus: "filterContent",
      currentPage: "updateFilteredContent"
    },
    computed: {
      ...mapGetters(['currentUser']),
      totalPages() {
        return Math.ceil(this.filteredCouriers.length / this.pageSize);
      },
      paginatedCouriers() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.filteredCouriers.slice(startIndex, endIndex);
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
      this.fetchCouriers();
    }
  };
  </script>