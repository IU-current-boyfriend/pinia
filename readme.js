/**
 *
 * 重写$patch方法的注意事项：
 *
 * 对于defineStore来说，因为$patch这些方法都是存放在store实例对象上的，
 * 所以在创建store的时候，我们就想直接挂载到store对象上。
 *    按照这种思路的话：
 *       就会有这种代码store.$patch = function() {}出现在defineStore方法内部，
 *       但是这样写的话就太乱了，我们并不想这样写。
 *
 *    我们想在创建store对象的时候，就能够把这些方法挂在到store上。无论是defineStore方法
 * 的参数是setup形式还是options。有些靓仔可能要问，store对象里面不是要收集很多东西吗？为什么方法
 * 可以在创建store的时候就能挂载呢？实际上是因为方法都是静态的，不像那些需要收集的依赖是动态的，
 * 所以可以直接挂载。
 *
 *
 * 响应式数据的问题，就是options形式的时候，直接通过state()函数调用，
 * 返回的对象是普通对象，而不是响应式数据，所以视图没有更新的问题。
 *
 *
 *
 * store.$patch({
 *  count: 100
 * });
 *
 * store.$patch((state) => {
 *  state.count = 100;
 * });
 *
 *
 *
 *
 *
 *
 *
 * $reset api的重写：
 *    通过建立一个新的状态对象，将store重设为初始状态。
 *
 * 原生的pinia：
 *    在pinia实例对象中的store属性保存的store对象，其实都存在
 *    $reset方法，只不过是在setup形式时调用该函数将会抛出异常。
 *    所以野sir的写法，就是在setup形式时不设置$reset方法。
 *
 *
 * 那么野sir的解决方式是什么呢？在合并store时候，通过判断是否存在state属性，
 * 如果存在state属性，说明defineStore方法传入的参数是options，否则就是setup形式，
 * 如果是setup形式的话，就不需要设置$reset方法。
 *
 *
 * $reset思路：
 *    reset方法需要接受初始值，因为reset内部使用的就是patch方法，
 * 更新为初始值。
 *
 */
