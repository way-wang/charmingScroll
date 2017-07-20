![charming scroll](https://github.com/way-wang/charmingScroll/blob/master/docs/logo.jpg)
# charmingScroll
charmingScroll是一款小型的jQuery滑动条插件

## why do?
各个浏览器的默认样式不一样，很难看，不好修改，影响美观

##How do？
本插件使用div模拟的方法，实现滑动条功能，解决各个浏览器显示不一致的问题
##How to use？
* 插件是基于jquery的，需先引入jquery，再引入charmingScroll文件
```javascript
<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="public/js/jquery.charmingScroll.js"></script>
```
*在页面加载时调用插件即可 
```javascript
<script type="text/javascript">
		$(".list-wrap,.content").charmingScroll();		
	</script>
```
