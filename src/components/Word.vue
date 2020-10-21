<template lang="pug">
.word-card(:class="[{['read-only']: readOnly}, wordCardClass]", @click="click")
    label.text {{word}}
    .indicator(:class="{[cardType]: cardType}")
    .choices    
        .brown(v-for="dir in brownDirections" :key="dir") 
            label {{dir}}
        .green(v-if="greenDirection")
            label {{greenDirection}}

</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import {CardState, CardType, mapDirections} from "../model/cards";

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
        },
        brownDirections(): string[] {
            if (this.state && this.state.type === "brown") {
                const directions = mapDirections(this.state.selectedBy);
                return directions;
            }
            return [];
        },
        greenDirection(): string | null {
            if (this.state && this.state.type === "green") {
                const [direction] = mapDirections(this.state.selectedBy);
                return direction;
            }
            return null;
        }
    }
})
</script>

<style lang="scss" scoped>
$green-color: greenyellow;
$black-color: darkslategray;
$brown-color: burlywood;
.word-card {
    min-width: 8em;
    padding: 0 1em;
    min-height: 3.5em;
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
    &.black {
        .indicator {
            display: none;
        }
        .text {
            color: transparent;
        }
    }
    &.green {
        .indicator {
            display: none;
        }
        .text {
            color: transparent;
        }
    }
    &:not(.read-only){
        cursor: pointer;
        &:hover {
            // outline: none;
            border-color: #9ecaed;
            box-shadow: 0 0 10px #9ecaed;
        }
    }
    .choices {
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        left: 0.5em;
        * {
            padding: 0.1em;
            min-width: 1.3em;
            min-height: 1.3em;
            text-align: center;
            vertical-align: middle;
            &:not(:last-child) {
                margin-bottom: 0.1em;
            }
        }
    }
}
.black {
    background-color: $black-color;
}
.brown {
    background-color: $brown-color;
    &.indicator {
        display: none;
    }
}
.green {
    background-color: $green-color;
}
</style>