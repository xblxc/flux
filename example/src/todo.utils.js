if(!window.localStorage){
    alert('This browser does NOT support localStorage');
    throw Error();
}

var Storage = {
    _DB: 'task',
    _index : 'task_index',
    get: function(){
        var data = localStorage.getItem(this._DB);
        if(data){
            return JSON.parse(data);
        }else{
            this.reset();
            return [];
        }
    },
    set: function(value){
        localStorage.setItem(this._DB, JSON.stringify(value));
    },
    getIndex: function(){
        return ~~localStorage.getItem(this._index);
    },
    setIndex: function(index){
        localStorage.setItem(this._index, index);
    },
    reset: function(){
        localStorage.setItem(this._index, 1);
        this.set([]);
    }
};

export default {
    get: function(){
        return Storage.get();
    },
    post: function(task_name){
        try{
            var task_data = this.get(),
                index = Storage.getIndex();
            task_data.push({
                id: index++,
                name: task_name,
                done: false
            });

            Storage.setIndex(index);
            Storage.set(task_data);
            return 0
        }catch(e){
            console.error(e);
            return 1;
        }
    },
    update: function(data){
        var task_data = this.get();
        for(var i=0,len=task_data.length; i<len; i++){
            if(task_data[i].id == data.id){
                task_data[i].done = data.done;
                Storage.set(task_data);
                return 0;
            }
        }
        return 1;
    },
    clear: function(){
        Storage.reset();
    }
}
