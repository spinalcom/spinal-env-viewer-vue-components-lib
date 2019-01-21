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
    <div>
        <label>{{title}}: </label>

        <spinal-icon-button
                v-if="!open"
                v-on:click="open = !open"
                :icon="defaultIcon"
                :tool-tip="defaultToolTip"/>
        <spinal-icon-button
                v-else
                v-for="(icon, index) in icons"
                :key="index"
                v-on:click="setSelectedIcon(icon)"
                :icon="icon"/>

    </div>

</template>

<script>
  import { SpinalIconButton } from '../Button'


  export default {
    name: "IconSelector",
    components: { SpinalIconButton },


    data: function () {
      return {
        selectedIcon: '',
        empty: '',
        open: false
      }
    },

    props: {
      icons: {
        type: Array,
        default: function () {
          return []
        }
      },
      title: {
        type: String,
        default: function (){
          return 'Chose an icon'
        }

      }
    },
    computed: {
      defaultIcon: function () {
        if (this.selectedIcon === '')
          return 'add_circle_outline';
        return this.selectedIcon;
      },
      defaultToolTip: function () {
        if (this.selectedIcon === '')
          return 'add icon';
        return 'change icon'
      }
    },
    methods: {
      setSelectedIcon: function ( icon ) {
        this.selectedIcon = icon;
        this.$emit( 'icon-selected', this.selectedIcon );
        this.open = !this.open;
      }
    }
  }
</script>

<style>
    .md-menu-content {
        z-index: 10;
    }
</style>