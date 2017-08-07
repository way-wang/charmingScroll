![charming scroll](https://github.com/way-wang/charmingScroll/blob/master/docs/logo.jpg)
# charmingScroll
charmingScroll是一款小型的jQuery滑动条插件

## why do?
各个浏览器的默认样式不一样，很难看，不好修改，影响美观

##  How do？
本插件使用div模拟的方法，实现滑动条功能，解决各个浏览器显示不一致的问题
![charming scroll](https://github.com/way-wang/charmingScroll/blob/master/docs/view-1.jpg)
* 首先需要算出滑块的高度
```javascript
  根据比例关系，可以得出，
      滑块高度 / 滑动条高度 = 容器高度 / 内容高度 
  已知，
      滑动条高度 = 容器高度
  得出，
      滑块的高度 = 容器高度 * 容器高度 / 内容高度
```
* 针对鼠标滚轮一下，计算滑块每次滑动距离，保证鼠标滚轮、内容、滑块同步    
我们这里默认鼠标滚轮滑动一次，内容滑动120px，根据内容滑动的距离，我们可以计算出滑块滑动的距离
```javascript
  根据比例关系，可以得出
      120 / （ 内容高度 - 容器高度 ） = 滑块滑动距离 / （ 滑动条高度 - 滑块高度 ） 
  已知，
      滑动条高度 = 容器高度
  得出，
      滑块滑动距离 = 120 *（ 容器高度 - 滑块高度 ）/ （ 内容高度 - 容器高度 ）
```
* 针对鼠标拖动事件，计算滑块每次滑动距离，从而计算出内容滑动距离，保证鼠标滚轮、内容、滑块同步    
监听鼠标mousedown、mousemove事件，计算出滑块滑动的距离，根据比例关系，计算出内容相应的滑动距离内
```javascript
  根据比例关系，可以得出，
       内容滑动距离 / （ 内容高度 - 容器高度 ） = 滑块滑动距离 / （ 滑动条高度 - 滑块高度 ）
  已知，
      滑动条高度 = 容器高度
  得出，
      内容滑动距离 = （ 内容高度 - 容器高度 ）* 滑块滑动距离 / （ 容器高度 - 滑块高度 ）
```
##  How to use？
* 插件是基于jquery的，需先引入jquery，再引入charmingScroll文件
```javascript
<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="public/js/jquery.charmingScroll.js"></script>
```
* 在页面加载时调用插件即可 
```javascript
<script type="text/javascript">
	$(".list-wrap,.content").charmingScroll();		
</script>
```
