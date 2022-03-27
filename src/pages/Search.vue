<template>
	<section class="jumbotron">  <!--这里有关jumpbotron的是bootstrap的css文件 但是我没有-->
		<h3>Search Github Users</h3>  <!--编写搜索栏的结构-->
		<div>
			<input 
				type="text" 
				placeholder="enter the name you search" 
				v-model="keyWord"
			/>&nbsp; <!--input框 同时双向绑定keyWord-->
			<button @click="searchUsers">Search</button> 
			<!--Search按钮 一点击就触发searchUsers事件-->
		</div>
	</section>
</template>

<script>
	import axios from 'axios' //用axios来解决ajax跨越问题 发请求
	export default {
		name:'Search',
		data(){
			return {
				keyWord:''
			}
		},
		methods:{
			searchUsers(){
				//请求前更新List的数据 一按button就开始
				this.$bus.$emit('updateListData',{isLoading:true,errMsg:'',users:[],isFirst:false})
				axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
					response => {
						console.log('请求成功了')
						//请求成功后更新List的数据
						this.$bus.$emit('updateListData',{isLoading:false,errMsg:'',users:response.data.items})
					},
					error => {
						//请求后更新List的数据
						this.$bus.$emit('updateListData',{isLoading:false,errMsg:error.message,users:[]})
					}
				)
			}
		},
	}
</script>
