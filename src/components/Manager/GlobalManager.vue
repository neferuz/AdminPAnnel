<template>
    <div>
        <div class="container">
            <div class="analizing">
                <h1>Все жалобы</h1>
                <div class="poisk-con">
                    <input v-model="searchQuery" @input="filterUsers" placeholder="Поиск" type="text">
                    <img src="@/assets/notifications_none.svg" alt="">
                    <img class="admin-logo" :src="currentUser.photo" alt="">
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID пользователя</th>
                        <th>Имя пользователя</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in paginatedUsers" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td >
                            <!-- Заменяем кнопку на ссылку и передаем имя пользователя -->
                            <router-link class="chat-open" :to="{ name: 'PageChat', params: { id: user.id, name: user.name } }">Открыть
                                чат</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination">
                <button @click="previousPage">&lt;</button>
                <button v-for="pageNumber in totalPages" :key="pageNumber" :class="{ active: currentPage === pageNumber }" @click="changePage(pageNumber)">
                    {{ pageNumber }}
                </button>
                <button @click="nextPage">&gt;</button>
            </div>
        </div>
    </div>
</template>

<script>
import './GlobalManager.css';
import { mapGetters } from 'vuex';

export default {
    name: 'GlobalManager',
    data() {
        return {
            users: [],
            searchQuery: '',
            currentPage: 1,
            pageSize: 10 // Количество пользователей на странице
        };
    },
    mounted() {
        this.fetchUsers();
    },
    computed: {
        filteredUsers() {
            const query = this.searchQuery.toLowerCase();
            return this.users.filter(user => {
                return (
                    user.name.toLowerCase().includes(query)
                );
            });
        },
        totalPages() {
            return Math.ceil(this.filteredUsers.length / this.pageSize);
        },
        paginatedUsers() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.filteredUsers.slice(startIndex, endIndex);
        },
        ...mapGetters(['currentUser'])
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                this.users = data.map(user => ({
                    id: user.id,
                    name: user.name,
                    complaint: `Жалоба на ${user.name}`
                }));
            } catch (error) {
                console.error('Ошибка при загрузке жалоб:', error);
            }
        },
        filterUsers() {
            // Метод фильтрации пользователей остается таким же
            this.currentPage = 1; // При каждом новом поиске переключаемся на первую страницу
        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
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
        }
    }
};
</script>
