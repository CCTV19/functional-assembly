<template>
	<div> <!--class 属性通常用于指向样式表的类-->
		<!-- 展示用户列表 -->
		<div class="card"
			v-show="info.users.length"  
			v-for="user in info.users" 
			:key="user.login"
		>
		<!--<div> 标签定义 HTML 文档中的一个分隔区块或者一个区域部分。
			<div>标签常用于组合块级元素，以便通过 CSS 来对这些元素进行格式化
			使用v-for需要给他配个key(唯一值) 用user身上的login(登录名)作为唯一值
		-->
			<a :href="user.html_url" 
				target="_blank"
			>
			<!--<a> 标签定义超链接，用于从一个页面链接到另一个页面。
				<a> 元素最重要的属性是 href 属性，它指定链接的目标
				这个a标签用来包img作为链接到github用户
			-->
				<img :src="user.avatar_url" 
					style='width: 100px'
				/>
			<!--
				img图片是通过avatar_url拿到的
			-->	
			</a>
			<p class="card-text">{{user.login}}</p>
			<!--<p>标签定义段落。
				<p>元素会自动在其前后创建一些空白。浏览器会自动添加这些空间，您也可以在样式表中规定-->
		</div>
		<!-- 展示欢迎词 -->
		<h1 v-show="info.isFirst">欢迎使用！</h1>
		<!-- 展示加载中 -->
		<h1 v-show="info.isLoading">加载中....</h1>
		<!-- 展示错误信息 -->
		<h1 v-show="info.errMsg">{{info.errMsg}}</h1>
	</div>
</template>

<script>
	export default {
		name:'List',
		data() {
			return {
				info:{
					isFirst:true,
					isLoading:false,
					errMsg:'',
					users:[]
				}
			}
		},
		mounted() {
			this.$bus.$on('updateListData',(dataObj)=>{ //监听当前实例上的自定义事件。事件可以由 vm.$emit 触发。回调函数会接收所有传入事件触发函数的额外参数。
				this.info = {...this.info,...dataObj}
			})
		},
	}
</script>

<style scoped>
	.album {
		min-height: 50rem; /* Can be removed; just added for demo purposes */
		padding-top: 3rem;
		padding-bottom: 3rem;
		background-color: #f7f7f7;
	}

	.card {
		float: left;
		width: 33.333%;
		padding: .75rem;
		margin-bottom: 2rem;
		border: 1px solid #efefef;
		text-align: center;
	}

	.card > img {
		margin-bottom: .75rem;
		border-radius: 100px;
	}

	.card-text {
		font-size: 85%;
	}
</style>