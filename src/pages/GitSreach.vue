<template>
	<div> <!--class 属性通常用于指向样式表的类-->
		<Search/>  <!--编写组件标签(使用)-->
		<List/>
	</div>
</template>

<script>
	import Search from './Search' //引入Search组件
	import List from './List'	//引入List组件
	export default {
		name:'GitSreach', 
		components:{Search,List}  //去注册这些组件
	}
</script>