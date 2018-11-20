<template>
    <div class="tool-bar">
        <base-badge-icon-button
                class="icon-button"
                v-for="(b, index) in buttons"
                :key="index"
                :button="b.button"
                :badge_content="b.badge_content"
                @click="b.button.action(option)"/>
    </div>
</template>

<script>
    import BaseBadgeIconButton from "../Button/BaseBadgeIconButton.vue";

    export default {
        name: "ToolsBar",
        components: {BaseBadgeIconButton},
        props: {
            buttons: {
                type: Array,
                required: true,
            },
            option: {
                type: Object
            }
        }
    }
</script>

<style scoped>
    .icon-button{
        margin: 0;
    }
    .tool-bar {
        min-width: 30px;
        min-height: 30px;
    }
</style>