<template>
    <div id="Index">

        <div class="login-box">
            <div class="head">

            </div>
            <div class="logo-box">
                <i class="logo fa fa-lemon-o"></i>

            </div>
            <div class="login-panel">
                <mu-text-field full-width placeholder="user name" v-model="userName">
                    <i slot="prepend" class="fa fa-user-o" style="margin-right:10px"></i>
                </mu-text-field>
                <mu-text-field full-width placeholder="room id" v-model="roomId">
                    <i slot="prepend" class="fa fa-lemon-o" style="margin-right:10px"></i>
                </mu-text-field>
                <div class="btn-box">
                    <mu-button color="#38AC7F" full-width @click="join">join</mu-button>
                </div>
            </div>
        </div>
        <div class="app-name">- 柠檬 -</div>
    </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>