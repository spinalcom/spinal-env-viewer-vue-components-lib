<template>
    <div class="child-inspector">
        <div class="child-inspector-name">
            {{name}}
        </div>
        <div class="child-inspector-children"
             v-for="(info, index) in childInfo"
             :key="index"
        >
            {{info.name}}
            <base-icon-button
                    :button-info="{
             icon_type: 'in',
             backgroundColor: '#FFFFFF',
             fontColor: '#FFFFFF',
             icon: 'delete',
             tooltip: 'suppress child'
             }">

            </base-icon-button>
        </div>
    </div>
</template>

<script>
    import NodeHeader from "./NodeHeader";
    import BaseIconButton from "../Button/BaseIconButton";

    export default {
        name: "ChildInspector",
        components: {BaseIconButton, NodeHeader},
        props: {
            name: {
                type: String,
                required: true
            },
            childInfo: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },

    }
</script>

<style scoped>

</style>