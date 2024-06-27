<template>
  <div id="app" class="app-container">
    <!-- Показываем боковую панель, только если текущий маршрут не является страницей логина -->
    <Sidebar v-if="!isLoginPage" />
    <div class="content-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "./MainSidebar.vue";

export default {
  name: "App",
  components: {
    Sidebar,
  },
  computed: {
    // Проверяем текущий маршрут
    isLoginPage() {
      return this.$route.name === 'Login';
    }
  }
};
</script>

<style>
.app-container {
  display: flex;
  height: 100vh;
  background-color: #000056;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
  padding-right: 20px;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.content-container {
  flex-grow: 1;
  padding: 20px;
  background-color: #f5f6fa;
  border-radius: 20px;
  overflow-y: auto;
  box-sizing: content-box;
}
</style>
