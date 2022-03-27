<template>
	<div class="todo-footer" v-show="total"><!--v-show拿到的值也是布尔值 total值为0不显示 0以外的值显示-->
		<label>
			<!-- <input type="checkbox" :checked="isAll" @change="checkAll"/> -->
			<input type="checkbox" v-model="isAll"/>
		</label>
		<span>
			<span>已完成{{doneTotal}}</span> / 全部{{total}}
		</span>
		<button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
	</div>
</template>



<script>
export default {
    name:'MyFooter',
	props:['todos'],
	computed:{
		total(){  //统计todos的长度
			return this.todos.length
		}, 
		doneTotal(){  //统计被勾选的todos
			/* return this.todos.reduce((pre,todo)=> pre + (todo.done ? 1 : 0),0) */ //也可用forEach方法
			return this.todos.filter((todo) => {
				return todo.done 
			}).length;
		},
		isAll:{
			get(){
				return this.doneTotal === this.total && this.total > 0
			},
			set(value){
				//this.checkAllTodo(value)
				this.$emit('checkAllTodo',value)
			}
		}
	},
	methods:{
		clearAll(){
			//this.clearAllTodo()
			this.$emit('clearAllTodo')
		}
	}
}
</script>



<style scoped>
    /*footer*/
	.todo-footer {
		height: 40px;
		line-height: 40px;
		padding-left: 6px;
		margin-top: 5px;
	}

	.todo-footer label {
		display: inline-block;
		margin-right: 20px;
		cursor: pointer;
	}

	.todo-footer label input {
		position: relative;
		top: -1px;
		vertical-align: middle;
		margin-right: 5px;
	}

	.todo-footer button {
		float: right;
		margin-top: 5px;
	}
</style>