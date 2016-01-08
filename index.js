/**
 * This is just a mix of Dispatcher, EventEmmiter , and some optimization
 * for a better encoding and debugg experience;
 */

var Dispatcher = require('./lib/dispatcher');
var Store = require('./lib/store');
var Util = require('./lib/util');

function Flux(opts) {
  this.dev = opts ? opts.dev : this.isDev();
  this.trace = opts && opts.trace;

  this.dispatcher = new Dispatcher();

  this.actions = []; //多action，单store设计
  this.store = null;
}

Flux.prototype = {
  logIn: function(type, data) {
    //动态监测的好处：可以运行时更新调整配置
    if (this.dev) {
      var _log = this.trace ? console.trace : console.log;
      _log.call(console, '%c--->', this.getLogStyle(data), type + ':', data);
    }
  },

  logOut: function(type, data) {
    if (this.dev) {
      var _log = this.trace ? console.trace : console.log;
      _log.call(console, '%c<---', this.getLogStyle(data), type + ':', data);
    }
  },

  resolve: function(type, data) {
    //var type = arguments.callee.caller.name;
    this.logIn(type, data);
    this.dispatcher.dispatch({
      type: type,
      data: data
    });
  },

  createAction: function(initFunc) {
    var _this = this;

    var Action = {};
    var action_map = initFunc();
    Object.keys(action_map).forEach(function(ac) {
      Action[ac] = initFunc(_this.resolve.bind(_this, ac))[ac];
    });
    this.actions.push(Action);
    return Action;
  },

  /**
   * @param: { [[ store1, store2, ...]] , storeHandlers }
   */
  createStore: function() {
    var _this2 = this;

    var arg0 = arguments[0];
    var storeHandlers = null;
    //继承其他store
    if (Util.isArray(arg0)) {
      storeHandlers = arguments[1]();
      arg0.forEach(function(s) {
        invariant(s && s.dispatchToken, 'Illegal store!! please check the stores you want to inherit..');
        _this2.destroyStore(s);
        storeHandlers = Util.assign(s._handlers, storeHandlers);
      });
    } else {
      storeHandlers = arg0();
    }

    //清除上一个Store
    if (this.store) {
      this.destroyStore(this.store);
    }

    var store = new Store(this, storeHandlers);
    this.store = store; //存储一下应用，便于查看
    return store;
  },

  destroyStore: function(store) {
    if (!store._destroyed) {
      this.dispatcher.unregister(store && store.dispatchToken);
      store._destroyed = true;
    }
  },

  isDev: function() {
    return location.hostname == 'localhost' || location.hostname == '127.0.0.1';
  },

  getLogStyle: function(data) {
    //data 为空时，给出红色提醒
    var green = '#4EE695';
    var red = 'red';
    return 'font-weight: bold;color:' + (data ? green : red);
  }
};

module.exports = Flux;
