<template>
    <div class="container">
        <div class="analizing">
            <h1>Главный Билинг</h1>
            <div class="poisk-con">
                <input v-model="searchQuery" placeholder="Поиск" type="text">
                <img src="@/assets/notifications_none.svg" alt="уведомления">
                <img class="admin-logo" :src="currentUser.photo" alt="">
            </div>
        </div>
        <div class="billing-page">
            <main>
                <div>
                    <section class="tariffs-section">
                        <div class="billing-tarif">
                            <div v-for="tariff in tariffs" :key="tariff.name" class="tariff">
                                <h3>{{ tariff.name }}</h3>
                                <p>Заработано за месяц: {{ tariff.earnings }} сум</p>
                                <p>Расходы за месяц: {{ tariff.expenses }} сум</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            tariffs: [
                { name: 'Старт', earnings: 3000, expenses: 1000 },
                { name: 'Комфорт', earnings: 5000, expenses: 2000 },
                { name: 'Бизнес', earnings: 7000, expenses: 3000 }
            ]
        }
    },
    computed: {
        ...mapGetters(['currentUser'])
    }
};
</script>

<style scoped>
.tariff {
    background-color: #f9f9f9;
    padding: 15px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 30px;
}

.billing-tarif {
    display: flex;
    justify-content: space-around;
}
</style>