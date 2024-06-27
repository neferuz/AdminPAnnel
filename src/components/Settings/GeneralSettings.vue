<template>
  <div class="container">
    <div class="analizing">
          <h1>Настройки</h1>
          <div class="poisk-con">
            <input v-model="searchQuery" placeholder="Поиск" type="text">
            <img src="@/assets/notifications_none.svg" alt="">
            <img class="admin-logo" :src="currentUser.photo" alt="">
          </div>
        </div>
    <div class="seti">
      <!-- Profile Card -->
      <div class="card3">
        <div class="background-image"></div>
        <div class="profile-info">
          <div class="profile-image">
            <img :src="currentUser.photo" alt="Profile Image" @click="triggerFileInput">
            <div class="upload-icon" @click="triggerFileInput">
              <img :src="currentUser.photo" alt="Upload Icon">
            </div>
          </div>
          <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;">
          <h2>{{ currentUser.login }}</h2>
          <p>{{ currentUser.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './generalsettings.css';
import { mapGetters } from 'vuex';

export default {
  name: 'NotificationSettings',
  computed: {
    ...mapGetters(['currentUser']),
  },

  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.$store.dispatch('updateUserPhoto', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
};
</script>
