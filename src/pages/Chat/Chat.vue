<template>
  <div id="Chat">
    <div class="chat-body clearfix">
      <transition-group :name="isMe" tag="div">
        <template v-for="(item,i) in list">
          <chat-card v-if="item.type=='msg'" :info="item" :key="item.id" @on-remove="remove(item,i)"></chat-card>
          <div class="time-box" v-if="item.type=='time'" :info="item" :key="item.id">
            <div class="time">
              {{item.msg}}
            </div>
          </div>
        </template>
      </transition-group>
    </div>
    <div class="chat-input-box">
      <van-uploader :after-read="onRead" style="margin-right:8px">
        <van-icon name="photograph" class="img-icon" />
      </van-uploader>
      <input type="text" id="msgInput" @keydown.enter="send" v-model="msg">
      <button class="button" @click="send">发送</button>
    </div>

  </div>
</template>
<script src="./Chat.js"></script>
<style lang="scss" scoped>
@import "Chat.scss";
</style>