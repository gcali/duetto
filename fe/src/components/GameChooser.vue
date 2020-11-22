<template lang="pug">
form.game-chooser(@submit.prevent="start")
    label Password
    input(type="text",v-model="password")
    label Player
    .player-choices
        label
            input(type="radio" value="A" v-model="player")
            | A
        label
            input(type="radio" value="B" v-model="player")
            | B
    label Suggestions
    input(type="number",v-model="suggestions")
    label Language
    .language-choices
        label
            input(type="radio" value="italian" v-model="language")
            | Italiano
            input(type="radio" value="english" v-model="language")
            | English
    .start
        input(type="submit", :disabled="!canStart", value="Start")
</template>

<script lang="ts">
import { Player } from '@/model/player';
import { defineComponent } from 'vue'
export type StartArgument = {
    password: string;
    player: Player; 
    suggestions: number;
    language: "italian" | "english";
};
export default defineComponent({
    data() {
        return {
            password: "",
            player: "A" as Player,
            suggestions: 9,
            language: "italian" as "italian" | "english"
        };
    },
    computed: {
        canStart(): boolean {
            if (this.password && this.password.length > 0) {
                return true;
            }
            return false;
        }
    },
    methods: {
        start() {
            const startArg: StartArgument = {
                password: this.password,
                player: this.player, 
                suggestions: this.suggestions,
                language: this.language
            };
            this.$emit("start", startArg);
        }
    }
})
</script>

<style lang="scss">
.game-chooser {
    display: grid;
    grid-template-columns: repeat(2, auto);
    column-gap: 1em;
    > label {
        justify-self: start;
    }
    .start {
        grid-column-end: span 2;
    }
}
</style>