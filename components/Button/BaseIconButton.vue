<template>
    <base-icon-button-in
            @click="$emit('click')"
            v-if="buttonInfo.icon_type === 'in'"
            :icon="buttonInfo.icon"
            :tool-tip="buttonInfo.toolTip"
            tool-tip-delay="300"
            :tool-tip-direction="toolTipDirection"
    />
    <base-icon-button-class
            @click="$emit('click')"
            v-else-if="buttonInfo.icon_type === 'class'"
            :icon="buttonInfo.icon"
            :tool-tip="buttonInfo.toolTip"
            tool-tip-delay="300"
            :tool-tip-direction="toolTipDirection"
    />
    <base-icon-button-src
            @click="$emit('click')"
            v-else
            :icon="buttonInfo.icon"
            :tool-tip="buttonInfo.toolTip"
            tool-tip-delay="300"
            :tool-tip-direction="toolTipDirection"
    />

</template>

<script>
    import BaseIconButtonClass from "./BaseIconButtonClass.vue";
    import BaseIconButtonIn from "./BaseIconButtonIn.vue";
    import BaseIconButtonSrc from "./BaseIconButtonSrc.vue";

    export default {
        name: "BaseIconButton",
        components: {BaseIconButtonSrc, BaseIconButtonIn, BaseIconButtonClass},
        props: {
            buttonInfo: {
                type: Object,
                required: true,
                validator: function (button) {

                    return button.hasOwnProperty("backgroundColor")
                        && button.hasOwnProperty('fontColor')
                        && button.hasOwnProperty('icon')
                        && button.hasOwnProperty("toolTip")
                        && button.hasOwnProperty('icon_type');
                }
            },
            toolTipDirection: {
                type: String,
                default: "right"
            }
        },

    }
</script>

<style scoped>

</style>