<template lang="pug">
.word-card 
    | {{word}}
    .indicator(:class="cardType")
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import {CardType} from "../model/cards";

export default defineComponent({
    props: {
        word: String,
        cardType: {
            required: false,
            type: String
        }
    },
})
</script>

<style lang="scss" scoped>
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
    .indicator {
        position: absolute;
        right: 0;
        width: 1em;
        height: 100%;
        &.black {
            background-color: darkslategray;
        }
        &.brown {
            background-color: burlywood;
        }
        &.green {
            background-color: greenyellow;
        }
    }
}
</style>