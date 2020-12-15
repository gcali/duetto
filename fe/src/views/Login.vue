<template lang="pug">
#communication
    .whoami
        button(@click="whoAmI") Who am I?
    .login.form(v-if="!isLoggedIn")
        .input-line
            label Username
            input(v-model="username")
        .input-line
            label Password
            input(v-model="password")
        button(@click="login" v-if="username && password") Login
    .logout.form(v-else)
        button(@click="logout") Logout
    .communication(v-if="isLoggedIn").form
        .input-line
            label Game password
            input(v-model="gamePassword")
            button(@click="createGame" :disabled="!gamePassword") Create game
        .input-line
            label Join game
            button(@click="joinGame" :disabled="!gamePassword") Join game
        .send-message
            label Send message
            input(v-model="message")
            button(@click="sendMessage" :disabled="!gamePassword || !this.message") Join game
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {AuthService} from "../services/auth";
import { GameCommunication } from "../services/communication";

const auth = new AuthService();
const communication = new GameCommunication();

export default defineComponent({
    data() {
        return {
            username: "",
            password: "",
            isLoggedIn: false,
            gamePassword: "",
            message: ""
        };
    },
    methods: {
        async login() {
            const result = await auth.login(this.username, this.password);
            alert(result);
            this.isLoggedIn = result;
        },
        async logout() {
            this.isLoggedIn = false;
        },
        async whoAmI() {
            const result = await auth.whoAmI();
            this.isLoggedIn = (result !== null);
            if (result) {
                this.username = result;
            }
        },
        async createGame() {
            await communication.createGame(this.gamePassword);
            await communication.onReceiveMessage((message) => alert(message));
        },
        async joinGame() {
            await communication.joinGame(this.username, this.gamePassword);
        },
        async sendMessage() {
            await communication.sendMessage(this.username, this.gamePassword, this.message);
        }
    }
})
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .input-line {
        display: flex;
        flex-direction: row;
        label {
            flex-grow: 1;
        }
    }
}
</style>