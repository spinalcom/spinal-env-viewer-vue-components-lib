<template>
    <div class="tool-bar">
        <spinal-badge-icon-button
                v-for="(b, index) in buttons"
                :key="index"
                :background-color="b.button.backgroundColor"
                :font-color="b.button.fontColor"
                :icon="b.button.icon"
                :icon_type="b.button.icon_type"
                :tool-tip="b.button.toolTip"
                :tool-tip-direction="b.button.toolTipDirection"
                :badge_background_color="b.badge_content.backgroundColor"
                :badge_font_color="b.badge_content.fontColor"
                :badge_label="b.badge_content.label"
                @click="b.button.action(option)"
        />
    </div>
</template>

<script>


    import SpinalBadgeIconButton from "../Button/SpinalBadgeIconButton.vue";

    export default {
        name: "ToolsBar",
        components: {SpinalBadgeIconButton},
        props: {
            buttons: {
                type: Array,
                required: true,
            },
            option: {
                type: Object,

            }
        }
    }
</script>

<style scoped>
    .tool-bar {
        min-width: 30px;
        min-height: 30px;
    }
</style>