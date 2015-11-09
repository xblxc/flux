# flux
基于facebook官方flux模型，进行了一些整理和加工，隐藏了dispatcher，简化了flux的操作流程；


<img src="./docs/my_flux.png" style="width: 100%;" />


# Quick start
### Action
create your action:

```

var Action = Flux.createAction( function(resolve){
    return {
        do_soming: function(){
            return webutils.xxx.done(function(data){
                resolve(data);
            });
        },
        ...
    };
});

```

### Store
create your store:

```
var Store = Flux.createStore( function(){
    return {
        do_soming: function(data){
            //processing..
            return data;
        },
        ...
    };
});

```

### React
in your component:

```
var Test = React.createClass({
...
componentDidMount: function(){
    this.storeListeners = Store.listen({
        'do_soming': this.onDone
    });
},
componentWillUnmount: function(){
    Store.listenOff(this.storeListeners);
},
onDone: function(data){
    //now is your choice
}
...
})

```
### tips
打开控制台，或许能帮到你！

# Examples
Basic example: [TodoMVC](https://github.com/xblxc/flux/tree/master/example)
