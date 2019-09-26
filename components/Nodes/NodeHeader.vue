<template>
    <div class="node-header"
         @click="$emit('click')"
    >

        <drop-up-down-button
                class="node-list-icon"
                :opened="opened"
                @click="$emit('toggle-display-child')"
                :style="{visibility: isDropDownVisible}"/>

        <div  class="node-body">
            <div class="node-name">
                {{name}}
            </div>


            <color-maker
                    class="node-color"
                    :color="color"/>
        </div>


    </div>
</template>

<script>
  import DropUpDownButton from "../Button/DropUpDownButton.vue";
  import ColorMaker from "../ColorMarker/ColorMaker.vue";

  export default {
    name: "NodeHeader",
    components: { ColorMaker, DropUpDownButton },
    props: {
      opened: {
        type: Boolean,
        default: function () {
          return false;
        }},
      hasChild: {
        type: Boolean,
        default: function () {
          return false;
        }
      },

      showHideBimObject: {
        type: Boolean,
        default: function () {
          return false
        }
      },

      name: {
        type: String,
        default: function () {
          return "UNKNOWN NAME"
        }
      },

      color: {
        type: String,
        default: function () {
          return ""
        }
      }
    },
    computed: {
      isDropDownVisible: function () {
        if (!this.hasChild) {
          return "hidden";
        }
        return "";
      }
    }
  }
</script>

<style scoped>

    .node-header {
        position: relative;
        width: 100%;
        height: 36px;
        padding: 9px 6px 6px 13px;

    }

    .node-header:hover {
        background-color: rgba(0, 0, 0, 0.3);
        cursor: pointer;
    }

    .node-list-icon {
        position: absolute;
        left: 0;
        top: 7px;
        width: 21px;
        user-select: none;
        -moz-user-select: none;

    }

    .node-name {
        position: absolute;
        left: 26px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: calc(100% - 77px);
    }


    .node-color {
        position: absolute;
        right: 0;
    }
</style>
