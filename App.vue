<template>
	<div id="root">
		<div class="todo-container">
			<div class="todo-wrap">
				<MyHeader @addTodo='addTodo'/>
				<MyList :todos='todos'/>
				<MyFooter :todos='todos' @checkAllTodo='checkAllTodo' @clearAllTodo='clearAllTodo'/>
			</div>
		</div>
	</div>
</template>



<script>
  import MyHeader from './components/MyHeader'
  import MyList from './components/MyList'
  import MyFooter from './components/MyFooter'

export default {
	name: 'app',
	components: {
		MyHeader,MyList,MyFooter
	},
	data(){
		return {
			todos:JSON.parse(localStorage.getItem('todos')) || []
		}
	},
	methods:{
		//添加
		addTodo(todoObj){
			this.todos.unshift(todoObj)
		},
		//勾选
		checkTodo(id){
			this.todos.forEach((todo)=>{
				if(todo.id === id) todo.done = !todo.done
			})
		},
		//更新
		updateTodo(id,title){
			this.todos.forEach((todo)=>{
				if(todo.id === id) todo.title = title
			})
		},
		//删除
		deleteTodo(id){
			this.todos = this.todos.filter((todo)=>{
				return todo.id != id
			})
		},
		//全选或者取消全选
		checkAllTodo(done){
			this.todos.forEach((todo)=>{
				todo.done = done
			})
		},
		//删除所有勾选的选项
		clearAllTodo(){
			this.todos = this.todos.filter((todo)=>{
				return !todo.done
			})
		}
	},
	watch:{
		todos:{
			deep:true,
			handler(value){
				localStorage.setItem('todos',JSON.stringify(value))//在浏览器监视里通过json.stringify来看到数据
			}
		}
	},
	mounted(){
		this.$bus.$on('checkTodo',this.checkTodo)//事件总线绑定
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
