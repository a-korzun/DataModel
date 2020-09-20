export type Raw<T, K = keyof T, V = T[keyof T]> = Array<{ type: K; payload: V }>;

export function buildProxy<T>(target: any) {
  return new Proxy(target, {
    get(target, prop: keyof T, reciever) {
      if (prop in target) {
        return Reflect.get(target, prop, reciever);
      }

      const index = target.__dataIndex[prop];
      const data = Reflect.get(target.__data, index, reciever);

      if (data) {
        return data.payload;
      };
    },
    set(target, prop: keyof T, value, reciever) {
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

export class ModelProxy<T> {
  private __data: Raw<T> = [];
  private __dataIndex: Record<keyof T, number> = {} as Record<keyof T, number>;

  construct(data: Raw<T>) {
    this.__data = data;
    this.updateIndex();

    return buildProxy(this);
  }

  updateIndex() {
    const index = {} as Record<keyof T, number>;

    this.__data.forEach((el, i) => {
      index[el.type] = i;
    });

    this.__dataIndex = index;
  }

  raw() {
    return this.__data;
  }
}

export function applyProxy(model: Function) {
  const props = Object.getOwnPropertyNames(ModelProxy.prototype);

  props.forEach(name => {
    Object.defineProperty(
      model.prototype,
      name,
      Object.getOwnPropertyDescriptor(ModelProxy.prototype, name)!
    );
  });
}