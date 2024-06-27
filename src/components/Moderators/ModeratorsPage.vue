<template>
  <div class="container">
    <div class="contacts">
      <h1>Модераторы</h1>
      <div class="date-bottom">{{ currentDate }}</div>
    </div>
    <div class="contact-list">
      <div 
        class="contact"
        v-for="(moderator, index) in moderators"
        :key="index"
        :class="moderator.class"
        :style="{ order: moderator.isLoggedIn ? -1 : index }"
      >
        <img :src="moderator.img" :alt="moderator.name" />
        <div class="contact-name">{{ moderator.name }}</div>
        <div class="last-login">Последний вход: {{ moderator.lastLogin }}</div>
      </div>
    </div>
    <div class="header">Сегодня, {{ currentWeekday }}</div>
    <div class="calendar">
      <div 
        class="day" 
        v-for="(day, index) in weekDays" 
        :key="index" 
        :class="{ active: day.date === currentDay }"
      >
        <div class="date">{{ day.date }}</div>
        <div class="weekday">{{ day.weekday }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import "./ModeratorsPage.css";

export default {
  name: "ModeratorsPage",
  data() {
    return {
      currentDate: '',
      currentWeekday: '',
      currentDay: '',
      weekDays: [],
      moderators: [
        {
          name: 'Ibrohim B.',
          img: 'https://splendorous-granita-f826c7.netlify.app/photo1.svg',
          lastLogin: '2024-06-05 14:22',
          class: 'contact1',
          isLoggedIn: false,
        },
        {
          name: 'Abdumalik F.',
          img: 'https://splendorous-granita-f826c7.netlify.app/photo2.svg',
          lastLogin: '2024-06-04 09:15',
          class: 'contact2',
          isLoggedIn: false,
        },
        {
          name: 'Fozil K.',
          img: 'https://splendorous-granita-f826c7.netlify.app/photo3.svg',
          lastLogin: '2024-06-03 18:05',
          class: 'contact3',
          isLoggedIn: false,
        },
        {
          name: 'Feruz X.',
          img: 'https://splendorous-granita-f826c7.netlify.app/photo4.svg',
          lastLogin: '2024-06-05 07:30',
          class: 'contact4',
          isLoggedIn: true, // Example logged-in user
        },
        {
          name: 'Sarvar F.',
          img: 'https://splendorous-granita-f826c7.netlify.app/photo5.svg',
          lastLogin: '2024-06-04 12:47',
          class: 'contact5',
          isLoggedIn: false,
        },
      ],
    };
  },
  methods: {
    openAddAdminModal() {
      const modal = document.getElementById("addAdminModal");
      modal.showModal();
    },
    closeAddAdminModal() {
      const modal = document.getElementById("addAdminModal");
      modal.close();
    },
    addAdmin() {
      const adminName = document.getElementById("adminName").value;
      console.log("Добавлен новый админ:", adminName);
      this.closeAddAdminModal();
    },
    getCurrentDate() {
      const today = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      this.currentDate = today.toLocaleDateString('ru-RU', options);
      this.currentWeekday = today.toLocaleDateString('ru-RU', { weekday: 'long' });
      this.currentDay = today.getDate();

      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
      this.weekDays = Array.from({ length: 7 }, (v, i) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        return {
          date: day.getDate(),
          weekday: day.toLocaleDateString('ru-RU', { weekday: 'short' }),
        };
      });
    },
  },
  mounted() {
    this.getCurrentDate();
  },
};
</script>
