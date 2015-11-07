import React from 'react';
import Actions from './todo.action.js';
import Store from './todo.store.js';

var TodoItem = React.createClass({
    getDefaultProps: function(){
        return {
            data: {
                id: 'xxxx',
                name: 'xxxx',
                done: false,
            }
        }
    },
    render: function(){
        var task = this.props.data, 
            task_style = task.done ? { 'textDecoration': 'line-through' } : null;
        return (
            <li>
                <label>
                    <input type="checkbox" onChange={this._onCheckBoxChange} checked={task.done} />
                    <span style={task_style}>{task.name}</span>
                </label>
            </li>
        )
    },
    _onCheckBoxChange: function(e){
        Actions.taskUpdated({
            id: this.props.data.id,
            done: !this.props.data.done
        });
    }
});

var TodoPanel = React.createClass({
    getInitialState: function(){
        return {
            new_task_name: '',
            task_list: [],
        }
    },
    componentDidMount: function(){
        this.storeListeners = Store.listen({
            'getTaskData': this._onChange,
            'taskUpdated': this._onTaskUpdated,
        });
        Actions.getTaskData();
    },
    componentWillUnmount: function(){
        Store.listenOff(this.storeListeners);
    },
    _onChange: function(data){
        this.setState({task_list: data});
    },
    _getTaskData: function(){
        Actions.getTaskData();   
    },
    _onTaskUpdated: function(task_info){
        Actions.updateTaskStatus(task_info);
    },
    _addTask: function(){
        var name = this.state.new_task_name.trim();
        if(name){
            Actions.addTask(name); //这里是同步代码，所以，下面就那样写了
            this.setState({
                new_task_name: '',
            });
        }
    },
    _onTaskInputChange: function(e){
        this.setState({new_task_name: e.target.value});
    },
    _clearAllTask: function(){
        Actions.clearAll();
    },
    render: function(){
        var list = this.state.task_list.map(function(n){
            return <TodoItem key={n.id} data={n} />;
        });
        //console.log(hello);
        return (
            <div>
                <h2>Todos</h2>
                <div>
                    <input type="text" value={this.state.new_task_name} onChange={this._onTaskInputChange} />&nbsp;
                    <button onClick={this._addTask}>add</button>
                </div>
                <p></p>
                <ol>
                {list}
                </ol>
                <p style={{'display': list.length ? 'block' : 'none'}}>
                    <button onClick={this._clearAllTask}>clear all</button>
                </p>
            </div>
        );
    }
});

export default TodoPanel;
