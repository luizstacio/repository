class Repository {
  constructor (config) {
    this.options = config.options;
    this.EventManager = new EventManager();
    this.plugAdapter(config.adapter);

    this.EVENT_BEFORE = ':before';
    this.EVENT_AFTER = ':after';
  }

  plugAdapter (Adapter) {
    if (Array.isArray(Adapter)) {
      return Adapter.forEach((item) => this.plugAdapter(item));
    }
    this.createWrapperMethods(Adapter);
  }

  createWrapperMethods (Adapter) {
    Object.keys(Adapter).forEach((method) => {
      this.addMethodEvent(method, Adapter);
      this.insertMethodOnRepository(method);
    });
  }

  addMethodEvent (method, Adapter) {
    var adapterMethod = Adapter[method];

    this.EventManager.on(method + this.EVENT_BEFORE, adapterMethod);
    this.EventManager.on(method, adapterMethod);
    this.EventManager.on(method + this.EVENT_AFTER, adapterMethod);
  }

  insertMethodOnRepository (method) {
    this[method] = (data) => {
      this.executeMethodEvent(method, data);
    }
  }

  executeMethodEvent(method, data) {
    var parameters = [data, this.options];

    this.EventManager.emit(method + this.EVENT_BEFORE, parameters);
    this.EventManager.emit(method, parameters);
    this.EventManager.emit(method + this.EVENT_AFTER, parameters);
  }

  static create (config) {
    return new Repository(config);
  }
}