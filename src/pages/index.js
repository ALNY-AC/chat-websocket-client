export default {
    name: 'index',
    data() {
        return {
            msg: '',
            ws: null,
            isOpen: false,
            list: [],
            name: '',
        };
    },
    methods: {
        // 用于初始化一些数据
        init() {
            this.$prompt('', '请定义一个昵称', {
                confirmButtonText: '确定',
                showClose: false,
                showCancelButton: false,
                closeOnClickModal: false,
            }).then(({ value }) => {
                this.ws = new WebSocket('ws://106.15.187.65:12138');
                this.name = value;
                this.ws.onopen = this.onopen;
                this.ws.onclose = this.onclose;
                this.ws.onerror = this.onerror;
                this.ws.onmessage = this.onmessage;
            });
        },
        onopen() {
            this.isOpen = true;
            this.$notify({
                title: '提示',
                message: '连接服务器成功'
            });
            var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
            let msg = {
                time: time,
                name: this.name,
                msg: '上线'
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

            var time = new Date().Format("yyyy-MM-dd hh:mm:ss");

            let msg = {
                time: time,
                name: this.name,
                msg: this.msg
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