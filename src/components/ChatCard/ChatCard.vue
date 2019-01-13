<template>
  <div :class="['chat-card',{right:isMe}]" v-if="info">
    <div class="chat-user-info">
      <div class="user-head">
        <img src="@/assets/user.jpg" alt="">
        <div class="tool">
          <mu-menu cover :open.sync="open">
            <van-icon name="ellipsis" />
            <mu-list slot="content">
              <mu-list-item button @click="remove">
                <mu-list-item-title>删除</mu-list-item-title>
              </mu-list-item>
            </mu-list>
          </mu-menu>
        </div>

      </div>
    </div>
    <div class="chat-msg">
      <div class="user-name">{{info.userName}}</div>
      <div class="chat-msg-box">
        <div class="chat-msg-content" v-if="info.msgType=='text'">
          <span>{{info.msg}}</span>
        </div>
        <img :src="info.msg" v-if="info.msgType=='image'" class="img" @click="showImg=true">
      </div>

    </div>

    <van-popup v-model="showImg" v-if="info.msgType=='image'" >
            <img :src="info.msg" class="img-p" >
    </van-popup>

  </div>
</template>
<script src="./ChatCard.js"></script>
<style lang="scss" scoped>
@import "ChatCard.scss";
</style>