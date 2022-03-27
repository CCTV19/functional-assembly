<template>
  <div>
    <div class="row">
      <Banner/>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
					<!-- 原始html中我们使用a标签实现页面的跳转 -->
          <!--<a class="list-group-item active" href="./about.html">About</a>-->
          <!--<a class="list-group-item" href="./home.html">Home</a>-->
					<!-- Vue中借助router-link标签实现路由的切换 -->
					<router-link class="list-group-item" active-class="active" to="/GitSreach">GitSearch功能</router-link>
          <router-link class="list-group-item" active-class="active" to="/TodoList">TodoList功能</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
						<!-- 指定组件的呈现位置 -->
            <keep-alive include="GitSreach">
              <router-view></router-view>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Banner from './components/Banner.vue';
	export default {
		name:'App',
    components:{Banner}
	}
</script>
