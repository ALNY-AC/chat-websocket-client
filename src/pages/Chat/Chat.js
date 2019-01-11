export default {
    name: 'Chat',
    data() {
        return {
            msg: '',
            ws: null,
            isOpen: false,
            list: [],
            name: this.$route.query.userName,
            RoomId: this.$route.query.RoomId,
        };
    },
    methods: {
        // 用于初始化一些数据
        init() {
         this.ws = new WebSocket('ws://106.15.187.65:12138');
        //  this.ws = new WebSocket('ws://127.0.0.1:12138');
         this.ws.onopen = this.onopen;
         this.ws.onclose = this.onclose;
         this.ws.onerror = this.onerror;
         this.ws.onmessage = this.onmessage;
        },
        onopen() {
            this.isOpen = true;
            let msg = {
                type: 'addRoom',//类型
                roomId: this.RoomId,//房间号
                data: {},//扩展参数
                userInfo: {
                    userId: '',
                    userName: this.name,
                },
                message: '',//发来的消息
            }
            msg = JSON.stringify(msg);
            this.ws.send(msg);
        },
        onclose() {
            this.isOpen = false;
            this.$notify({
                title: '提示',
                message: '服务器关闭'
            });
        },
        onerror() {
            this.isOpen = false;
            this.$notify({
                title: '提示',
                message: '连接出错'
            });
        },
        send() {
            let msg = {
                type: 'send',//类型
                roomId: this.RoomId,//房间号
                data: {},//扩展参数
                userInfo: {
                    userId: '',
                    userName: this.name,
                },
                message: this.msg,//发来的消息
            }
            msg = JSON.stringify(msg);
            this.ws.send(msg);
            this.msg = '';
        },
        onmessage(e) {
            this.list.push(JSON.parse(e.data));
            this.$nextTick(() => {
                var ele = document.querySelector('.chat-list');
                ele.scrollTop = ele.scrollHeight;
            });
        },
    },
    // 计算属性
    computed: {},
    // 包含 Vue 实例可用过滤器的哈希表。
    filters: {},
    // 在实例创建完成后被立即调用
    created() { },
    // 在挂载开始之前被调用：相关的 render 函数首次被调用。
    beforeMount() { },
    // el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
    mounted() {
        this.init();
        this.$nextTick(() => { });
    },
    // 数据更新时调用，发生在虚拟 DOM 打补丁之前。
    beforeUpdate() { },
    // keep-alive 组件激活时调用。
    activated() { },
    // keep-alive 组件停用时调用。
    deactivated() { },
    // 实例销毁之前调用。在这一步，实例仍然完全可用。
    beforeDestroy() { },
    //Vue 实例销毁后调用。
    destroyed() { },
    // 当捕获一个来自子孙组件的错误时被调用。此
    errorCaptured() { },
    // 包含 Vue 实例可用指令的哈希表。
    directives: {},
    // 一个对象，键是需要观察的表达式，值是对应回调函数。
    watch: {},
    // 组件列表
    components: {},
};