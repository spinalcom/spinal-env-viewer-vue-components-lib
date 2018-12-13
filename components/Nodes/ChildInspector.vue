<template>
    <div class="child-inspector">
        <h1 class="child-inspector-name">
                {{name}}
            </h1>

        <div :key="index" class="child-inspector-child" v-for="(info, index) in childInfo">

            <div class="child-inspector-child-name">
                <h2>
                    {{info.name.get()}}
                </h2>
            </div>

            <div class="child-inspector-child-delete-buttons">

                <spinal-icon-button
                        class="child-inspector-delete-child"
                        icon="delete"
                        tool-tip="suppress child"
                        v-on:click="emit('remove-from-parent', {'node-info': info, inspectedNodeId})"
                />

                <spinal-icon-button
                        :icon="deleteForEvenerIcon"
                        class="child-inspector-remove-child-from-graph"
                        icon_type="src"
                        tool-tip="remove child from graph"
                        v-on:click="emit('delete-node', {'node-info': info, inspectedNodeId})"
                />

            </div>

        </div>


    </div>
</template>

<script>
  import NodeHeader from "./NodeHeader.vue";
  import SpinalIconButton from "../Button/SpinalIconButton.vue";
  import deleteForEvener from './remove-forever.svg'

  export default {
    name: "ChildInspector",
    components: { SpinalIconButton, NodeHeader },
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
        relationName: "hah",
        deleteForEvenerIcon: deleteForEvener
      }
    },

    mounted() {
      this.relationName = this.defaultRelationName;
    }

  }
</script>

<style scoped>


    .child-inspector-name {
        text-align: center;
        height: 30px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: calc(100% - 77px);


    }

    .child-inspector-child-name {
        height: 55px;
        padding-left: 5%;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: calc(100% - 77px);
    }

    .child-inspector-child {
        border: 1px solid #979797;
        position: relative;
        width: 100%;
        height: 55px;
    }

    .child-inspector-child-delete-buttons {
        position: absolute;
        right: 0;
        top: 5px;
        display: flex;

    }

</style>