<template>
    <div class="child-inspector">
        <div class="child-inspector-name">
            <h1>
                {{name}}
            </h1>
        </div>


        <div class="child-inspector-child"
             v-for="(info, index) in childInfo"
             :key="index">
            <div class="child-inspector-child-name">
                <h2>
                    {{info.name}}
                </h2>
            </div>


            <spinal-icon-button
                    class="child-inspector-delete-child"
                    icon="delete"
                    tool-tip="suppress child"
            />
        </div>


    </div>
</template>

<script>
    import NodeHeader from "./NodeHeader";
    import SpinalIconButton from "../Button/SpinalIconButton";

    export default {
        name: "ChildInspector",
        components: {SpinalIconButton, NodeHeader},
        props: {
            name: {
                type: String,
                required: true
            },
            childInfo: {
                type: Array,
                default: function () {
                    return [
                        {name: "child 1"},
                        {name: "child 2"},
                        {name: "child 3"},
                        {name: "child 4"}
                    ];
                }
            },
            defaultRelationName: {
                type: String,
                default: function () {
                    return ""
                }
            }
        },
        data: function () {
            return {
                relationName: "hah"
            }
        },
        mounted() {
            this.relationName = this.defaultRelationName;
        }

    }
</script>

<style scoped>

    .child-inspector-name {
        height: 30px;
    }

    .child-inspector-child-name {
        height: 55px;
    }

    .child-inspector-child {
        border: 1px solid #979797;
        position: relative;
        width: 100%;
        height: 55px;
    }

    .child-inspector-delete-child {
        position: absolute;
        right: 0;
        top: 5px;
    }


</style>