import OriginWebSocket from "../../modus/WebSocket/OriginWebSocket";
import Component from "../../modus/WebSocket/Component";

export default {
    name: 'Chat',
    data() {
        return {
            ws: null,
            isOpen: false,
            list: [],
            userName: this.$route.query.userName,
            roomId: this.$route.query.roomId,
            msg: '',
            scrollTimer: null,
            isMe: 'left',
            endTime: 0,
        };
    },
    methods: {
        // 用于初始化一些数据
        init() {
            let ws = new OriginWebSocket('ws://106.15.187.65:12138');
            // let ws = new OriginWebSocket('ws://127.0.0.1:12138');

            ws.on('open', this.onopen);
            ws.on('close', this.onclose);
            ws.on('error', this.onerror);
            ws.on('message', this.onmessage);

            ws.open();

            ws.addComponent('send', new Component((res) => {
                this.info(res);
            }));
            ws.addComponent('userExit', new Component((res) => {
                this.info(res);
            }));

            this.ws = ws;

        },
        onRead(f, c) {
            function compress(base64String, w, quality) {
                var getMimeType = function (urlData) {
                    var arr = urlData.split(',');
                    var mime = arr[0].match(/:(.*?);/)[1];
                    // return mime.replace("image/", "");
                    return mime;
                };
                var newImage = new Image();
                var imgWidth, imgHeight;

                var promise = new Promise(resolve => newImage.onload = resolve);
                newImage.src = base64String;
                return promise.then(() => {
                    imgWidth = newImage.width;
                    imgHeight = newImage.height;
                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");
                    if (Math.max(imgWidth, imgHeight) > w) {
                        if (imgWidth > imgHeight) {
                            canvas.width = w;
                            canvas.height = w * imgHeight / imgWidth;
                        } else {
                            canvas.height = w;
                            canvas.width = w * imgWidth / imgHeight;
                        }
                    } else {
                        canvas.width = imgWidth;
                        canvas.height = imgHeight;
                    }
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
                    var base64 = canvas.toDataURL(getMimeType(base64String), quality);
                    return base64;
                });
            }

            compress(f.content, 800, 0.5).then((val) => {
                this.ws.send('Room/send', 'send', {
                    roomId: this.roomId,
                    userName: this.userName,
                    msg: val,
                    type: 'msg',
                    msgType: 'image'
                });
            });

        },
        remove(item, i) {
            this.setIsMe(item.userName);
            this.$nextTick(() => {
                this.list.splice(i, 1);
            });
        },
        send() {
            if (this.msg.length <= 0) {
                this.$toast('消息不能为空！');
                return;
            }
            if (this.msg.length > 255) {
                this.ws.send('Room/send', 'send', {
                    type: 'msg',
                    msgType: 'text',
                    roomId: this.roomId,
                    userName: this.userName,
                    msg: this.msg.substr(0, 255)
                });
                this.ws.send('Room/send', 'send', {
                    type: 'msg',
                    msgType: 'text',
                    roomId: this.roomId,
                    userName: this.userName,
                    msg: this.msg.substr(255, this.msg.length - 255)
                });
            } else {
                this.ws.send('Room/send', 'send', {
                    type: 'msg',
                    msgType: 'text',
                    roomId: this.roomId,
                    userName: this.userName,
                    msg: this.msg
                });
            }

            this.msg = '';
            document.getElementById('msgInput').focus();


        },
        onopen() {
            this.isOpen = true;
            this.ws.send('Room/send', 'send', {
                type: 'msg',
                msgType: 'text',
                roomId: this.roomId,
                userName: this.userName,
                msg: '进入房间'
            });
        },
        onclose() {
            this.isOpen = false;
        },
        onerror() {
            this.isOpen = false;
        },
        info(res) {
            res.id = Math.random();
            // res.type = 'msg';

            // 判断是否显示时间
            if (res.uninxTime - this.endTime >= 30) {
                this.isMe = "fide";
                this.list.push({
                    type: 'time',
                    msg: res.time,
                    id: Math.random(),
                });
                this.endTime = res.uninxTime;
            }

            this.$nextTick(() => {
                this.setIsMe(res.userName);
                this.list.push(res);
            });
        },
        setIsMe(userName) {
            this.isMe = userName == this.userName ? 'right' : 'left'
        },
        onmessage(data) {
            this.updateView();
        },
        updateView() {
            const ScrollTop = (number = 0, time) => {
                if (!time) {
                    document.body.scrollTop = document.documentElement.scrollTop = number;
                    return number;
                }
                const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
                let spacingInex = time / spacingTime; // 计算循环的次数
                let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
                let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
                this.scrollTimer = setInterval(() => {
                    if (spacingInex > 0) {
                        spacingInex--;
                        ScrollTop(nowTop += everTop);
                    } else {
                        clearInterval(this.scrollTimer); // 清除计时器
                    }
                }, spacingTime);
            };

            this.$nextTick(() => {
                clearInterval(this.scrollTimer); // 清除计时器
                var ele = document.documentElement;
                ScrollTop(ele.scrollHeight, 700);
                // ele.scrollTop = ele.scrollHeight;
            });
        }
    },
    // 计算属性
    computed: {
    },
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