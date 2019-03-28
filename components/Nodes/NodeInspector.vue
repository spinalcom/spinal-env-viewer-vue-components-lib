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
    <div class="node-inspector">

        <div class="node-inspector-name">
            {{name}}
        </div>
        <md-field v-if="relationNames.length > 0">
            <label for="relationNames">Relations</label>
            <md-select id="relationNames" name="relationName"
                       v-model="relationName">
                <md-option :key="index" :value="name"
                           v-for="(name, index) in relationNames">{{name}}
                </md-option>
            </md-select>
        </md-field>
        <div class="node-inspector-children">
            <div :key="info.id.get()" class="node-inspector-child"
                 v-for="(info) in childInfo">

                <div class="node-inspector-child-name"
                     v-if="info.hasOwnProperty('name')">
                    {{info.name.get()}}
                </div>
                <div v-else>
                    Unnamed
                </div>

                <div class="node-inspector-child-delete-buttons">
                    <i class="material-icons"
                       v-on:click="$emit('remove-from-parent', info.id)">
                        delete
                    </i>

                </div>

            </div>
        </div>

    </div>
</template>

<script>
  import NodeHeader from "./NodeHeader.vue";
  import SpinalIconButton from "../Button/SpinalIconButton.vue";
  import deleteForEvener from './remove-forever.svg'

  export default {
    name: "NodeInspector",
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
    .node-inspector-name {
        text-align: center;
        height: 30px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 28px;
    }
    .node-inspector-children{
        overflow-y: auto;
        max-height: 40vh;
    }


    .node-inspector-children::-webkit-scrollbar {
        width: 4px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #121212;
    }

    .node-inspector-children::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
    .node-inspector-children::-webkit-scrollbar-thumb {
        outline: 1px solid slategrey;
        background-color: #737374;
    }


    .node-inspector-child {
        border: 1px solid #979797;
        position: relative;
        width: 100%;
        height: 30px;
        display: flex;
        padding: 4px;
    }

    .node-inspector-child-name {
        padding-left: 4%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .node-inspector-child-delete-buttons {
        position: absolute;
        right: 4%;
        display: flex;
    }

    .node-inspector{
        max-height: 70vh;
    }


</style>