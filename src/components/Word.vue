<template lang="pug">
.word-card(:class="[{['read-only']: readOnly}, wordCardClass]", @click="click")
    | {{word}}
    .indicator(:class="{[cardType]: cardType}")
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import {CardState, CardType} from "../model/cards";

export default defineComponent({
    props: {
        word: String,
        cardType: {
            required: false,
            type: String as PropType<CardType>
        },
        readOnly: {
            required: false,
            type: Boolean
        },
        state: {
            required: false,
            type: Object as PropType<CardState>
        }
    },
    methods: {
        click(): void {
            if (!this.readOnly) {
                this.$emit("selected");
            }
        }
    },
    computed: {
        wordCardClass(): string {
            if (this.state) {
                if (this.state.type === "green") {
                    return "green";
                } else if (this.state.type === "black") {
                    return "black";
                }
            }
            return "";
        }
    }
})
</script>

<style lang="scss" scoped>
$green-color: greenyellow;
$black-color: darkslategray;
$brown-color: burlywood;
.black {
    background-color: $black-color;
}
.brown {
    background-color: $brown-color;
}
.green {
    background-color: $green-color;
}
.word-card {
    min-width: 8em;
    padding: 0 1em;
    min-height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 8px;
    background-color: white;
    position: relative;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    .indicator {
        position: absolute;
        right: 0.5em;
        width: 0.5em;
        height: 1em;
        top: 0em;
        border: 1px solid white;
        border-top: none;
        border-bottom-left-radius: 4px;;
        border-bottom-right-radius: 4px;;
    }
    &:not(.read-only){
        cursor: pointer;
        &:hover {
            // outline: none;
            border-color: #9ecaed;
            box-shadow: 0 0 10px #9ecaed;
        }
    }
}
</style>