<template>
    <li>
		<label>
			<input class="a" type="checkbox" :checked='todo.done' @change="handleCheck(todo.id)"/>
			<!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
			<!-- <input type="checkbox" v-model="todo.done"/> -->
			<span v-show="!todo.isEdit">{{todo.title}}</span>
			<input
				v-show="todo.isEdit" 
				type="text" 
				:value="todo.title" 
				@blur="handleBlur(todo,$event)" 
				ref="inputTitle"   
			><!-- $event是这个input框事件 ref是vue提供的拿到标签的方法(直接操作DOM，替代原生的getid)-->
		</label>
		<button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
		<button class="btn btn-edit" @click="handleEdit(todo)">编辑</button>
	</li>
</template>



<script>
export default {
    name:'MyItem',
	props:['todo'], //接收todos里的每一项（todo）
	methods:{
		handleCheck(id){
			//this.checkTodo(id)  id此时的值传到App里让App自己处理 勾选的时候传id
			this.$bus.$emit('checkTodo',id) //用全局事件总线触发App上的checkTodo方法并把id带过去
		},
		handleDelete(id){
			if(confirm('确定删除吗？')){
				//this.deleteTodo(id)  删除的时候传id
				this.$bus.$emit('deleteTodo',id)  //用全局事件总线触发App上的deleteTodo方法并把id带过去
			}
		},
		handleEdit(todo){ //编辑功能
			if(Object.prototype.hasOwnProperty.call(todo, "isEdit")){ //如果身上已经有IsEdit就不再加一次了
				todo.isEdit = true
			}else{
				this.$set(todo,'isEdit',true) //$set是往todo身上添加一个属性 并且该属性拥有get，set
			}
			this.$nextTick(function(){
				this.$refs.inputTitle.focus() //通过ref对input框进行DOM操作
			})	
		},
		handleBlur(todo,e){
			todo.isEdit = false
			if(!e.target.value.trim()) return alert('输入不能为空')
			this.$bus.$emit('updateTodo',todo.id,e.target.value)
		}
	}
}
</script>



<style scoped>
    /*item*/
	li {
		list-style: none;
		height: 36px;
		line-height: 36px;
		padding: 0 5px;
		border-bottom: 1px solid #ddd(209, 208, 208);
	}

	li label {
		float: left;
		cursor: pointer;
	}

	li label li input {
		vertical-align: middle;
		margin-right: 6px;
		position: relative;
		top: -1px;
	}

	li button {
		float: right;
		display: none;
		margin-top: 3px;
	}

	li:before {
		content: initial;
	}

	li:last-child {
		border-bottom: none;
	}

	li:hover{
		background-color: #ddd;
	}
	
	li:hover button{
		display: block;
		transition: all .5s;
	}

	.a{
		margin-right :10px;
		vertical-align: middle;
	}
</style>