<template>
  <div :class="['chat-card',{right:isMe}]" v-if="info">
    <slot>
      <div class="chat-user-info">
        <div class="user-head">
          <img src="@/assets/user.jpg" alt="">
        </div>
      </div>
      <div class="chat-msg">
        <div class="user-name">{{info.userName}}</div>
        <div class="chat-msg-box">
          <div class="chat-msg-content">{{info.msg}}</div>
          <div class="chat-time">{{info.time}}
            <div class="tool">
              <mu-menu cover :open.sync="open">
                <van-icon name="ellipsis" v-if="!isMe" />
                <mu-list slot="content">
                  <mu-list-item button @click="remove">
                    <mu-list-item-title>删除</mu-list-item-title>
                  </mu-list-item>
                </mu-list>
              </mu-menu>
            </div>
          </div>
        </div>
      </div>
    </slot>

  </div>
</template>
<script src="./ChatCard.js"></script>
<style lang="scss" scoped>
@import "ChatCard.scss";
</style>