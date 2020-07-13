import { types } from 'mobx-state-tree';

/**
 * LoadWacher 用来描述加载过程的model对象, 其字段根据注入参数自动生成
 * @method getModel
 */
function LoadWatcherModel<T extends { [action: string]: boolean }>(loadMap: T) {
    /**
     *  loadWatcher better practice
     *  1. Http Method: GET | POST
     *    当Action使用GET|POST方法去查询数据时，我们在使用时关心的是响应数据，并且会缓存响应数据，
     *    loadWatcher getModel的参数应该与最终响应返回数据存储在Store中的字段相同.
     *    @example:
     *    const TodoList = types.model({
     *      todoList: types.array(Todo),
     *      loadWatcher: loadWatcherType.getModel({
     *        todoList: false,
     *      })
     *    })
     *    .views(self =>({))
     *    .actions(self => {
     *      const getTodoListAsync = flow(function* getTodoListAsync(){
     *       try {
     *        self.loadWatcher.set(todoList, true)
     *        response = yield sendRequest()
     *        self.todoList = response
     *       }finally{
     *        self.loadWatcher.set(todoList, false)
     *       }
     *      })
     *    })
     *  2. Http Method: POST | PUT | DELETE
     *  当Action使用POST| PUT | DELETE 方法去增加、修改、删除数据时，我们关心的重点是方法是否执行完，而非响应数据(1.不一定有返回数据 2.增删改的结果没有缓存的必要),
     *  loadWatcher getModel的参数应该与Action方法本身名称相同.
     *    @example:
     *    const TodoList = types.model({
     *      todoList: types.array(Todo),
     *      loadWatcher: loadWatcherType.getModel({
     *        todoList: false,
     *        setTodoItemAsync: false
     *      })
     *    })
     *    .views(self =>({))
     *    .actions(self => {
     *      const getTodoListAsync = flow(function* getTodoListAsync(){
     *       try {
     *         self.loadWatcher.set('todoList', true)
     *         response = yield sendRequest()
     *         self.todoList = response
     *       }finally{
     *         self.loadWatcher.set('todoList', false)
     *       }
     *      })
     *      const setTodoItemAsync = flow(function* setTodoItemAsync(){
     *        try {
     *          self.loadWatcher.set('setTodoItemAsync', true)
     *        }finally{
     *          self.loadWatcher.set('setTodoItemAsync', false)
     *        }
     *      })
     *    })
     */
    return types.optional(types.map(types.boolean), loadMap);
}

export default LoadWatcherModel;
