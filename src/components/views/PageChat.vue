<template>
    <div class="container">
        <button class="go-back" @click="goBack">Назад</button>
        <div class="chat_cod">
            <div class="phone">
                <div v-if="user">
                    <h3>Чат с {{ user.fullName }}</h3>
                    <div class="messages">
                        <div v-for="message in messages" :key="message.id" class="message">
                            <span>{{ message.sender }}: </span>{{ message.text }}
                        </div>
                    </div>
                    <div class="send_whrite">
                        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Введите сообщение" />
                        <button @click="sendMessage">Отправить</button>
                    </div>
                </div>
            </div>
            <div class="hot_responses">
                <button v-for="response in hotResponses" :key="response.id" @click="addHotResponse(response.text)">{{
            response.text }}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageChat',
    data() {
        return {
            user: null,
            messages: [],
            newMessage: '',
            hotResponses: [
                { id: 1, text: 'Спасибо!' },
                { id: 2, text: 'Принято!' },
                { id: 3, text: 'Хорошо!' },
                // Добавьте здесь другие готовые ответы по вашему выбору
            ]
        };
    },
    created() {
        const userId = this.$route.params.id;
        this.loadUserData(userId);

        // Загрузка сообщений из localStorage при создании компонента
        const storageKey = `chatMessages-${userId}`;
        const storedMessages = localStorage.getItem(storageKey);
        if (storedMessages) {
            this.messages = JSON.parse(storedMessages);
        }
    },
    methods: {
        async loadUserData(userId) {
            try {
                const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                const userData = await userResponse.json();
                this.user = {
                    id: userData.id,
                    fullName: userData.name,
                    complaint: userData.complaint
                };

                const messagesResponse = await fetch(`API_URL/messages/${userId}`);
                const messagesData = await messagesResponse.json();
                this.messages = messagesData.map(message => ({
                    id: message.id,
                    sender: message.sender,
                    text: message.text
                }));
            } catch (error) {
                console.error('Ошибка при загрузке данных пользователя или сообщений:', error);
            }
        },
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                const newMessage = { id: Date.now(), sender: 'Вы', text: this.newMessage };
                this.messages.push(newMessage);
                this.newMessage = '';

                // Сохранение сообщений только для текущего пользователя
                const storageKey = `chatMessages-${this.user.id}`;
                localStorage.setItem(storageKey, JSON.stringify(this.messages));

                // Дополнительно отправляем сообщение на сервер через API
            }
        },
        addHotResponse(response) {
            this.newMessage += response + ' ';
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped>
.messages {
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 10px;
}

.message {
    margin-bottom: 5px;
}

input {
    width: calc(100% - 22px);
    padding: 10px;
    margin-right: 10px;
}

button {
    padding: 10px;
}

.chat_cod {
    display: grid;
    justify-content: center;
    align-items: center;
}

.chat_cod h3 {
    text-align: center;
}

.send_whrite {
    display: flex;
    position: absolute;
    justify-content: center;
    bottom: 0;
    width: 95%;
    margin-bottom: 10px;
}

.send_whrite input {
    border-radius: 10px;
    border: 0.1 solid rgb(233, 230, 230);
}
.send_whrite button{
    border-radius: 10px;
    background-color: #3366FF;
    color: #FFFFFF;

}
.hot_responses {
    margin-top: 10px;
}

.hot_responses button {
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 10px;
    background-color: #FFFFFF;
    cursor: pointer;
}

.phone {
    position: relative;
    /* Необходимо для позиционирования абсолютного элемента внутри него */
    border: 1px solid;
    width: 350px;
    padding: 10px;
    height: 70vh;
    display: grid;
    border-radius: 10px;
}
</style>
