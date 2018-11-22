<template>
    <div class="tool-bar">
        <spinal-badge-icon-button
                :background-color="b.button.backgroundColor"
                :font-color="b.button.fontColor"
                :icon="b.button.icon"
                :icon_type="b.button.icon_type"
                :tool-tip="b.button.toolTip"
                :tool-tip-direction="b.button.toolTip"
                :badge_background_color="b.badge_content.backgroundColor"
                :badge_font_color="b.badge_content.fontColor"
                :badge_label="b.badge_content.label"
                @click="b.button.action(option)"
        />
    </div>
</template>

<script>


    import SpinalBadgeIconButton from "../Button/SpinalBadgeIconButton";

    export default {
        name: "ToolsBar",
        components: {SpinalBadgeIconButton},
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
    .tool-bar {
        min-width: 30px;
        min-height: 30px;
    }
</style>