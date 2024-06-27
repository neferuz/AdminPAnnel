<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="user-block">
        <div class="user-avatar">
          <img :src="currentUser.photo" alt="User Avatar" />
          <div class="avatar-border"></div>
        </div>
        <div class="user-info">
          <div class="user-name">{{ currentUser.login }}</div>
        </div>
      </div>
    </div>
    <ul class="menu">
      <li v-for="item in visibleMenuItems" :key="item.name" :class="{ active: isActive(item.name) }" @click="navigateTo(item)">
        <div class="menu-item">
          <img :src="isActive(item.name) ? item.activeIconUrl : item.iconUrl" alt="Icon" class="menu-icon" />
          <span class="menu-label">{{ item.label }}</span>
        </div>
      </li>
    </ul>
    <!-- Logout Button and Confirmation Modal -->
    <button class="logout-button" @click="confirmLogout">Выйти с аккаунта</button>
    <div v-if="showConfirmModal" class="modal">
      <div class="modal-content">
        <h5>Вы уверены, что хотите выйти?</h5>
        <div>
          <button class="confirm-button" @click="logout">Да, выйти</button>
          <button class="cancel-button" @click="cancelLogout">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['currentUser', 'isAdmin', 'isCeo']),
    visibleMenuItems() {
      const allMenuItems = [
        {
          name: "Home",
          label: "Главная панель",
          iconUrl: "https://splendorous-granita-f826c7.netlify.app/home.svg",
          activeIconUrl: "https://splendorous-granita-f826c7.netlify.app/home-a.svg",
        },
        {
          name: "Drivers",
          label: "Водители",
          iconUrl: "https://splendorous-granita-f826c7.netlify.app/drivers.svg",
          activeIconUrl: "https://splendorous-granita-f826c7.netlify.app/edit.svg",
        },
        {
          name: "MainDeliver",
          label: "Курьеры",
          iconUrl: "https://splendorous-granita-f826c7.netlify.app/drivers.svg",
          activeIconUrl: "https://splendorous-granita-f826c7.netlify.app/edit.svg",
        },
        {
          name: "Users",
          label: "Пользователи",
          iconUrl: "https://splendorous-granita-f826c7.netlify.app/chart.svg",
          activeIconUrl: "https://splendorous-granita-f826c7.netlify.app/chart-a.svg",
        },
        {
          name: "Billing",
          label: "Биллинг",
          iconUrl: "https://splendorous-granita-f826c7.netlify.app/tatif.svg",
          activeIconUrl: "https://splendorous-granita-f826c7.netlify.app/check.svg",
        },
        {
          name: "clients",
          label: "Поездки",
          iconUrl: "https://splendorous-granita-f826c7.netlify.app/notification-status.svg",
          activeIconUrl: "https://splendorous-granita-f826c7.netlify.app/sit-a.svg",
        },
        {
          name: "live-map",
          label: "Live Map",
          iconUrl: "https://splendorous-granita-f826c7.netlify.app/wallet-20.svg",
          activeIconUrl: "https://splendorous-granita-f826c7.netlify.app/wallet-2.svg",
        },
        {
          name: "ModeratorsPage",
          label: "Модераторы",
          iconUrl: "https://splendorous-granita-f826c7.netlify.app/drivers.svg",
          activeIconUrl: "https://splendorous-granita-f826c7.netlify.app/edit.svg",
        },
        {
          name: "Payments",
          label: "Авто парк",
          iconUrl: "https://splendorous-granita-f826c7.netlify.app/autopark.svg",
          activeIconUrl: "https://splendorous-granita-f826c7.netlify.app/user-square.svg",
        },
        {
          name: "GlobalManager",
          label: "Жалобы",
          iconUrl: "https://splendorous-granita-f826c7.netlify.app/drivers.svg",
          activeIconUrl: "https://splendorous-granita-f826c7.netlify.app/edit.svg",
        },
        {
          name: "Settings",
          label: "Настройки",
          iconUrl: "https://splendorous-granita-f826c7.netlify.app/notification-status.svg",
          activeIconUrl: "https://splendorous-granita-f826c7.netlify.app/sit-a.svg",
        },
      ];

      // Определяем, какие элементы меню отображать в зависимости от роли пользователя
      if (this.isAdmin) {
        return allMenuItems; // Администратору показываем все пункты меню
      } else if (this.isCeo) {
        return allMenuItems.filter(item => item.name === "Billing"); // CEO показываем только "Billing"
      } else {
        // Для остальных пользователей скрываем "live-map", "Home", "Billing" и "ModeratorsPage"
        return allMenuItems.filter(item => item.name !== "live-map" && item.name !== "Home" && item.name !== "Billing" && item.name !== "ModeratorsPage");
      }
    },
  },
  data() {
    return {
      showConfirmModal: false, // Показывать ли модальное окно подтверждения
    };
  },
  methods: {
    isActive(section) {
      return this.$route.name === section;
    },
    navigateTo(item) {
      this.$router.push({ name: item.name });
    },
    confirmLogout() {
      this.showConfirmModal = true;
    },
    cancelLogout() {
      this.showConfirmModal = false;
    },
    logout() {
      localStorage.removeItem('__asc_accessIDToken');
      this.$router.push('/login');
      this.showConfirmModal = false; // Скрыть модальное окно после логаута
    },
  },
};
</script>



<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.sidebar {
  width: 100%;
  max-width: 250px;
  height: 100vh;
  color: #ecf0f1;
  overflow-y: auto;
}

.sidebar-header {
  padding: 20px;
  text-align: center;
}

.menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menu li {
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
  margin-top: 10px;
  font-weight: 500;
}

.menu-item {
  display: flex;
  align-items: center;
}

.menu-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.menu-label {
  font-size: 16px;
}

.menu li.active .menu-label {
  color: #5459ea;
}

.menu li:not(.active) .menu-label {
  color: #ecf0f1;
}

.menu li.active::before,
.menu li.active::after {
  --border-radius: 1rem;
  content: "";
  position: absolute;
  width: var(--border-radius);
  height: var(--border-radius);
  right: 0rem;
}

.menu li.active::before {
  border-radius: 0 0 var(--border-radius);
  top: calc(var(--border-radius) * -1);
  box-shadow: 10px 10px 0 10px #f5f6fa;
}

.menu li.active::after {
  border-radius: 0 var(--border-radius) 0 0;
  bottom: calc(var(--border-radius) * -1);
  box-shadow: 10px -10px 0 10px #f5f6fa;
}

.active {
  background-color: #f5f6fa;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-weight: 600;
}

.logo {
  width: 100px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.user-block {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px;
  padding: 10px;
}

.user-avatar {
  position: relative;
}

.user-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #ecf0f1;
}

.avatar-border {
  position: absolute;
  top: -3px;
  left: -3px;
  width: 56px;
  height: 56px;
  border: 2px solid #dfe0eb;
  border-radius: 50%;
}

.user-info {
  text-align: center;
  margin-top: 10px;
}

.user-name {
  font-weight: 500;
  font-size: 18px;
}

.logout-button {
  background-color: #444;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin: 20px;
  width: calc(100% - 40px);
}

.logout-button:hover {
  background-color: #555;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    max-width: 100%;
    display: none;
  }

  .menu-label {
    display: none;
  }

  .user-avatar img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #ecf0f1;
  }
}

/* Стили модального окна */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 300px;
  text-align: center;
}

.modal-content p {
  margin-bottom: 10px;
}

.modal-content button {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-button {
  background-color: #28a745;
  color: #fff;
  border: none;
}

.cancel-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
}
</style>
