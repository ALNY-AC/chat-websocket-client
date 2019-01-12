class Component {
    constructor(callback = new Function()) {
        this.update = callback;
    }
}

export default Component;