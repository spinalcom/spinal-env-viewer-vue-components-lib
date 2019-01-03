<!--
  - Copyright 2019 SpinalCom - www.spinalcom.com
  -
  -  This file is part of SpinalCore.
  -
  -  Please read all of the following terms and conditions
  -  of the Free Software license Agreement ("Agreement")
  -  carefully.
  -
  -  This Agreement is a legally binding contract between
  -  the Licensee (as defined below) and SpinalCom that
  -  sets forth the terms and conditions that govern your
  -  use of the Program. By installing and/or using the
  -  Program, you agree to abide by all the terms and
  -  conditions stated or referenced herein.
  -
  -  If you do not agree to abide by these terms and
  -  conditions, do not demonstrate your acceptance and do
  -  not install or use the Program.
  -  You should have received a copy of the license along
  -  with this file. If not, see
  -  <http://resources.spinalcom.com/licenses.pdf>.
  -->

<template>
    <div class="child-inspector">
        <h1 class="child-inspector-name">
            {{name}}
        </h1>

        <md-field v-if="relationNames.length > 0 && displayRelationName">
            <label for="relationNames">Relations</label>
            <md-select id="relationNames" name="relationName" v-model="relationName">
                <md-option :key="index" :value="name" v-for="(name, index) in relationNames">{{name}}</md-option>
            </md-select>
        </md-field>

        <div :key="index" class="child-inspector-child" v-for="(info, index) in childInfo">

            <div class="child-inspector-child-name">
                <h2>
                    {{info.name.get()}}
                </h2>
            </div>

            <div class="child-inspector-child-delete-buttons">

                <spinal-icon-button
                        :icon="deleteForEvenerIcon"
                        class="child-inspector-remove-child-from-graph"
                        icon_type="src"
                        tool-tip="remove child from graph"
                        v-on:click="$emit('delete-node',  info.id)"
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
          return "";
        }
      },
      relationNames: {
        type: Array,
        default: function () {
          return [];
        }
      },
      displayRelationName: {
        type: Boolean,
        default: function () {
          return false;
        }
      }
    },
    data: function () {
      return {
        relationName: this.defaultRelationName,
        deleteForEvenerIcon: deleteForEvener
      }
    },
    watch: {
      relationName: {
        handler: function ( newValue ) {
          if (newValue !== "")
            this.$emit( 'get-children', newValue );
        }
      }
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