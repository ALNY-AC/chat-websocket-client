<template>
    <div id="Index">

        <div class="login-box">
            <div class="logo-box">
                <img class="logo" src="@/assets/ctos.png" alt="">
            </div>
            <mu-text-field full-width label="userName" v-model="userName"></mu-text-field>
            <mu-text-field full-width label="roomId" v-model="roomId"></mu-text-field>
            <mu-button full-width @click="join">join</mu-button>
        </div>

    </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>