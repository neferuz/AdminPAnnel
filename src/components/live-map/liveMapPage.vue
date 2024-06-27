<template>
  <div class="container">
    <div class="analizing">
      <h1>Live Map</h1>
      <div class="poisk-con">
        <input v-model="searchQuery" @input="filterUsers" placeholder="Поиск" type="text">
        <img src="@/assets/notifications_none.svg" alt="">
        <img class="admin-logo" :src="currentUser.photo" alt="">
      </div>
    </div>
    <div class="fleet">
      <l-map class="map-container" :zoom="zoom" :center="center">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker v-for="(car, index) in cars" :key="index" :lat-lng="car.position" :icon="car.icon"
                  @click="showDriverInfo(car)">
        </l-marker>
      </l-map>
    </div>
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Информация о водителе</h2>
        <p><strong>Водитель:</strong> {{ selectedCar.driver }}</p>
        <p><strong>Маршрут:</strong> {{ selectedCar.route }}</p>
        <p><strong>Координаты:</strong> {{ selectedCar.position }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import './liveMapPage.css';
import { ref, onMounted } from 'vue'; // Импортируем необходимые функции из Vue 3
import { LMap, LTileLayer, LMarker } from 'vue3-leaflet';
import L from 'leaflet';
import { mapGetters } from 'vuex';
export default {
  name: 'liveMapPage',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  setup() {
    const zoom = ref(12); // Настраиваем уровень масштабирования для Ташкента
    const center = ref([41.311081, 69.240562]); // Координаты центра Ташкента
    const url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

    const carIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/171/171239.png',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const cars = ref([
      { position: [41.311081, 69.240562], icon: carIcon, driver: 'Водитель 1', route: 'Ташкент - Самарканд' },
      { position: [41.321081, 69.250562], icon: carIcon, driver: 'Водитель 2', route: 'Ташкент - Бухара' }
    ]);

    const isModalOpen = ref(false);
    const selectedCar = ref(null);

    const showDriverInfo = (car) => {
      selectedCar.value = car;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      selectedCar.value = null;
    };

    const moveCars = () => {
      cars.value = cars.value.map(car => {
        return {
          ...car,
          position: [
            car.position[0] + (Math.random() - 0.5) * 0.001,
            car.position[1] + (Math.random() - 0.5) * 0.001
          ]
        };
      });
    };

    onMounted(() => {
      setInterval(moveCars, 2000);
    });

    return { zoom, center, url, cars, isModalOpen, selectedCar, showDriverInfo, closeModal };
  },
  computed: {
        ...mapGetters(['currentUser'])
    }
}
</script>

<style>
.fleet {
  height: 70vh;
  border-radius: 20px;
  overflow: hidden; /* Для корректного отображения закругленных углов */
}

.map-container {
  height: 100%;
  border-radius: 30px; /* Закругление углов карты */
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000; /* Убедитесь, что модальное окно отображается поверх карты */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
