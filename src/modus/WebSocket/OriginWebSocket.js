class OriginWebSocket {
    constructor(host) {
        this.componentList = {};
        this.callbacks = {};
        this.host = host;
        this.ws = null;
    }
    open() {
        this.ws = new WebSocket(this.host);
        this.ws.onopen = (e) => this.onopen(e);
        this.ws.onclose = (e) => this.onclose(e);
        this.ws.onerror = (e) => this.onerror(e);
        this.ws.onmessage = (e) => this.onmessage(e);
    }
    on(name, callback) {
        this.callbacks['on' + name] = callback;
    }
    onopen(e) {
        this.callbacks['onopen']();
    }
    onclose() {
        this.callbacks['onclose']();
    }
    onerror() {
        this.callbacks['onerror']();
    }
    onmessage(e) {
        let data = JSON.parse(e.data)

        if (!data['component']) {
            console.warn("接口并未返回组件名：", data);
        } else {
            let component = data.component;
            if (!this.componentList[component]) {
                console.warn("未找到组件：" + component);
            } else {
                this.componentList[component].update(data.data);
            }
        }
        if (this.callbacks['onmessage']) {
            this.callbacks['onmessage'](data)
        }
    }
    send(path = '', component = '', data = {}) {
        let form = {
            path: path,
            data: data,
            component: component,
        }
        this.ws.send(JSON.stringify(form));
    }
    addComponent(name, component) {
        this.componentList[name] = component;
    }
}




export default OriginWebSocket;