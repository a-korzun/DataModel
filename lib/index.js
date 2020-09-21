"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelProxy = void 0;
class ModelProxy {
    constructor(data) {
        this.__data = [];
        this.__dataIndex = {};
        this.__data = data;
        this.updateIndex();
        return buildProxy(this);
    }
    updateIndex() {
        const index = {};
        this.__data.forEach((el, i) => {
            index[el.type] = i;
        });
        this.__dataIndex = index;
    }
    raw() {
        return this.__data;
    }
}
exports.ModelProxy = ModelProxy;
function buildProxy(target) {
    return new Proxy(target, {
        get(target, prop, reciever) {
            if (prop in target) {
                return Reflect.get(target, prop, reciever);
            }
            const index = target.__dataIndex[prop];
            const data = Reflect.get(target.__data, index, reciever);
            if (data) {
                return data.payload;
            }
            ;
        },
        set(target, prop, value, reciever) {
            if (prop in target) {
                return Reflect.set(target, prop, value, reciever);
            }
            const index = target.__dataIndex[prop];
            if (index === undefined) {
                target.__data.push({
                    type: prop,
                    payload: value,
                });
                target.updateIndex();
                return true;
            }
            target.__data[index].payload = value;
            return true;
        },
    });
}
