import Flux     from './flux_app.js';
import WebUtils from './todo.utils.js';
export default Flux.createAction( function(resolve){
    return {
        taskUpdated: function(task){
            resolve(task);
        },
        getTaskData: function(){
            resolve(WebUtils.get());
        },
        addTask: function(info){
            if(!WebUtils.post(info)){
                this.getTaskData(); //更新成功后，刷新
            }
        },
        updateTaskStatus: function(task){
            if(!WebUtils.update(task)){
                this.getTaskData(); //更新成功后，刷新
            }
        },
        clearAll: function(){
            WebUtils.clear();
            this.getTaskData();
        }
    };
});
