<template>
    <div @click="onClick">
        <i class="material-icons">
            {{icon}}
        </i>
    </div>
</template>

<script>

    export default {
        name: "DropUpDownButton",
        computed: {
            icon: function () {
                return this.opened ? "arrow_drop_down" : "arrow_right" ;
            }
        },
        data: function () {
            return {
                opened: false
            }
        },
        methods: {
            onClick: function () {
                this.opened = !this.opened;
                this.$emit('click', this.opened);
            }
        }
    }
</script>

<style scoped>

</style>