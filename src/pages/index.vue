<template>
    <div id="Index">

        <div class="chat-list">
            <div class="chat-item" v-for="item in list">

                <div class="chat-name">
                    [{{item.name}}]：
                    <div class="chat-time">
                        {{item.time}}
                    </div>
                </div>
                <div class="chat-msg">
                    {{item.msg}}
                </div>
            </div>
        </div>
        <div class="hat-tool">
            <el-input rows="1" autosize v-model="msg" @keydown.enter.native="send">
                <el-button slot="append" @click="send">
                    <span>send
                        <div class="state state-success" v-if="isOpen"></div>
                        <div class="state state-close" v-if="!isOpen"></div>
                    </span>
                </el-button>
            </el-input>
        </div>

    </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>