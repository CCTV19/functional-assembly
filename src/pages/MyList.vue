<template>
    <ul class="todo-main">
		<MyItem 
			class="todo-empty"
			v-for="todoObj in todos" 
			:key="todoObj.id" 
			:todo='todoObj' 
		/><!--给MyItem todo-->
	</ul>
</template>



<script>
    import MyItem from './MyItem'
    export default {
        name:'MyList',
        components:{
            MyItem
        },
		props:['todos']
	}
</script>



<style scoped>
    /*main*/
	.todo-main {
		margin-left: 0px;
		border: 1px solid #ddd;
		border-radius: 2px;
		padding: 10px;
	}

	.todo-empty {
		height: 50px;
		line-height: 40px;
		border: 1px solid #ddd;
		border-radius: 2px;
		padding-left: 5px;
		margin-top: 10px;
	}
</style>