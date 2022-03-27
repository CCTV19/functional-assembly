<template>
	<div class="todo-header">
		<input 
			type="text" 
			placeholder="请输入你的任务名称，按回车键确认" 
			v-model="title"  
			@keyup.enter="add"
		/>
	</div>
</template>



<script>
	// eslint-disable-next-line
	import {nanoid} from 'nanoid'
	export default {
		name:'MyHeader',
		//props:['addTodo'],//一开始从App拿到是空的
		data(){
			return{
				title:''
			}
		},
		methods:{
			add(){
				if(!this.title.trim()) return alert('输入不能为空')  //输入为空弹窗
				const todoObj = {id:nanoid(),title:this.title,done:false}  //数据{id,title,done}
				//this.addTodo(todoObj)//然后把数据从addTodo传回去给App
				this.$emit('addTodo',todoObj)  //子传父通过$emit
				this.title = ''
			}
		}
	}
</script>



<style scoped>
    /*header*/
	.todo-header input {
		width: 560px;
		height: 28px;
		font-size: 14px;
		border: 3px solid #ccc;
		border-radius: 4px;
		padding: 4px 7px;
	}

	.todo-header input:focus {
		outline: none;
		border-color: rgba(134, 193, 238, 0.8);
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
	}
</style>