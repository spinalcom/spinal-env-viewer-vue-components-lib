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
    <div class="list-item">
        <div class="item-header">
            <drop-up-down-button
                    v-if="children.length > 0"
                    class="node-list-icon"
                    @click="opened = !opened"
                    :style="{visibility: isDropDownVisible}"
                    :opened="opened"
            >

            </drop-up-down-button>

            <div @click="onClick" :class="{active: isActive()}">
                {{item.name}}
            </div>
        </div>
        <spinal-list-item
                class="list-item-child"
                v-if="opened"
                v-for="(child, index) in children"

                :parent-active="active"
                :item="child"
                :value="child.value"
                :parent="{value, parent}"

                @selected="onChildClick"
        />
    </div>
</template>

<script>
  import SpinalList from "./SpinalList.vue";
  import DropUpDownButton from "../Button/DropUpDownButton.vue";

  export default {
    name: "SpinalListItem",
    components: { DropUpDownButton, SpinalList },
    props: {
      parent: { parent: null, value: null },
      item: {},
      value: '',
      parentActive: false
    },
    data: function () {
      return {
        opened: false,
        active: false,
      }
    },
    computed: {
      children: function () {
        if (this.item.hasOwnProperty( 'children' )) {
          return this.item.children;
        }
        return []
      }
    },
    methods: {
      onClick: function () {
        this.active = !this.active;
        this.$emit( 'selected', { value: {id:this.item.id, value: this.value},
          parent:
          this.parent
        } )
      },
      onChildClick: function ( event ) {
        this.active = false;

        this.$emit( 'selected', event )
      },
      isActive: function () {
        return this.active && !this.parentActive
      }
    }
  }
</script>

<style scoped>
    .item-header {
        display: flex;
    }

    .list-item-child {
        padding-left: 18px;
    }

    .active {
        color: #365bab;
    }
</style>