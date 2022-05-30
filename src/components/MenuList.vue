<template>
    <div class="menu-list-wrapper" :class="{menuMini: openMenuItem !== false}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:'menu-list',
    props:{
        openMenuItem:{

        }
    },
    data() {
        return{

        }
    },
}
</script>