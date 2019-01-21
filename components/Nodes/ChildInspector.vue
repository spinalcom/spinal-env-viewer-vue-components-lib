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
        <div class="child-inspector-name">
            {{name}}
        </div>
        <md-field v-if="relationNames.length > 0">
            <label for="relationNames">Relations</label>
            <md-select id="relationNames" name="relationName" v-model="relationName">
                <md-option :key="index" :value="name" v-for="(name, index) in relationNames">{{name}}</md-option>
            </md-select>
        </md-field>

        <div :key="index" class="child-inspector-child" v-for="(info, index) in childInfo">

            <div class="child-inspector-child-name">
                    {{info.name.get()}}
            </div>

            <div class="child-inspector-child-delete-buttons">
                <i class="material-icons"
                   v-on:click="$emit('remove-from-parent', info.id)"
                >
                    delete
                </i>

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

    .child-inspector{
        width: 50%;
    }

    .child-inspector-name {
        text-align: center;
        height: 30px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 28px;
    }

    .child-inspector-child-name {
        height: 15px;
        padding-left: 5%;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .child-inspector-child {
        border: 1px solid #979797;
        position: relative;
        width: 100%;
        height: 30px;
    }

    .child-inspector-child-delete-buttons {
        position: absolute;
        right: 0;
        top: 5px;
        display: flex;
    }

</style>