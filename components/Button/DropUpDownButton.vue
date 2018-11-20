<template>
    <div @click="$emit('click')">
        <i class="material-icons">
            {{icon}}
        </i>
    </div>
</template>

<script>
    import BaseIconButton from "./BaseIconButton.vue";

    export default {
        name: "DropUpDownButton",
        components: {BaseIconButton},
        props: {
            opened: {
                type: Boolean,
                default: function () {
                    return false;
                }
            }
        },
        watch: {
            opened: {
                handler: function (value) {
                    this.icon = value ? "arrow_drop_up" : "arrow_drop_down";
                },
                immediate: true
            }
        },
        data: function () {
            return {
                icon: "arrow_drop_down"
            }
        }
    }
</script>

<style scoped>

</style>