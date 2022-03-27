<template>
	<div id="root">
		<div class="todo-container">
			<div class="todo-wrap">
				<MyHeader @addTodo='addTodo'/>  <!-- 子传父 组件自定义事件 @ = v-on-->
				<MyList :todos='todos'/>  <!-- 父传子 props接收-->
				<MyFooter :todos='todos' @checkAllTodo='checkAllTodo' @clearAllTodo='clearAllTodo'/>
			</div>
		</div>
	</div>
</template>



<script>
  import MyHeader from './MyHeader'
  import MyList from './MyList'
  import MyFooter from './MyFooter'

export default {
	name: 'TodoList',
	components: {
		MyHeader,MyList,MyFooter
	},
	data(){
		return {
			todos:JSON.parse(localStorage.getItem('todos')) || []  
		}//解决刷新数据消失 存到本地 json.parse解析json字符串为对象进行操作
	},
	methods:{
		//添加 MyHeader
		addTodo(todoObj){
			this.todos.unshift(todoObj)
		},
		//勾选或取消勾选一个todo MyItem
		checkTodo(id){
			this.todos.forEach((todo)=>{  //去一整个todos里找id相等的 改done值
				if(todo.id === id) todo.done = !todo.done
			})
		},
		//更新 MyItem
		updateTodo(id,title){
			this.todos.forEach((todo)=>{
				if(todo.id === id) todo.title = title
			})
		},
		//删除一个todo MyItem
		deleteTodo(id){
			this.todos = this.todos.filter((todo)=>{  //filter不改变原数组 所以要加this
				return todo.id != id
			})
		},
		//全选或者取消全选 MyFooter
		checkAllTodo(done){
			this.todos.forEach((todo)=>{
				todo.done = done
			})
		},
		//删除所有勾选的选项 MyFooter
		clearAllTodo(){
			if(confirm("确定删除全部吗？")){
				this.todos = this.todos.filter((todo)=>{
					return !todo.done
				})
			}
		}
	},
	watch:{ //watch监控todos的变化 将todos放入本地 解决数据刷新消失问题 并可以对todos进行操作 
		todos:{
			deep:true, //深度监视开启 可看到数组里对象的变化 默认是浅监视只看第一层
			handler(value){
				localStorage.setItem('todos',JSON.stringify(value))//在浏览器监视里通过json.stringify转换为json字符串
			}
		}
	},
	mounted(){
		this.$bus.$on('checkTodo',this.checkTodo)//事件总线绑定 Item组件给App组件传递值
		this.$bus.$on('deleteTodo',this.deleteTodo)
		this.$bus.$on('updateTodo',this.updateTodo)
	},
	beforeDestroy(){
		this.$bus.$off('checkTodo')//解绑
		this.$bus.$off('deleteTodo')
		this.$bus.$off('updateTodo')
	}
}
</script>



<style>
	/*base*/
	body {
		background: #fff;
	}
	.btn {
		display: inline-block;
		padding: 4px 12px;
		margin-bottom: 0;
		font-size: 14px;
		line-height: 20px;
		text-align: center;
		vertical-align: middle;
		cursor: pointer;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
		border-radius: 4px;
	}
	.btn-danger {
		color: #fff;
		background-color: #da4f49;
		border: 1px solid #bd362f;
	}
	.btn-edit {
		color: #fff;
		background-color: skyblue;
		border: 1px solid rgb(74, 114, 129);
		margin-right: 5px;
	}
	.btn-danger:hover {
		color: #fff;
		background-color: #bd362f;
	}
	.btn:focus {
		outline: none;
	}
	.todo-container {
		width: 600px;
		margin: 0 auto;
	}
	.todo-container .todo-wrap {
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
	}
</style>
