import Flux from './flux_app.js';

var Store = Flux.createStore(function(){
    return {
        taskUpdated: function(data){
            return data;
        },
        getTaskData: function(data){
            return data;
        },
    };
});

export default Store;
