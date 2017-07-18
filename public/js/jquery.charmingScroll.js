/*
插件名：charmingScroll
作者：way
日期：2017.7.17
*/

//一个匿名自执行函数，划分一个独立的作用域，不至于插件中的变量干扰jquery

;(function($){  //开始写上; 为防止代码压缩出错

    //为jquery扩展方法，也就是插件的主体
    
    var setCss = function($container,$content,$scroll,$bar){
    	$container.css({
    		'position':'relative',
    		'overflow':'hidden',
    	});
    	$content.css({
    		'position': 'absolute',
			'top': '0',
			'left': '0',
			'z-index': '1',							
    	});
    	$scroll.css({
    		'visibility': 'visible',
			'position': 'absolute',
			'top': '0',
			'right': '0',
			'z-index': '2',
			'height': '100%', 
			'width': '20px',
			'background': '#ddd',
			'opacity': '0',
			'transition':'all 1s',
    	});
    	$bar.css({		                		
			'position': 'absolute',
			'top': '0',
			'right': '0',
			'z-index': '3',
			'height': '20px', 
			'width': '100%',
			'background-color': '#2ecb72',
			'border-radius': '10px',
			'cursor': 'default',
    	});

    };

    $.fn.extend({

        //方法名
        "charmingScroll" : function(opts){
            //定义插件的默认参数
            var defaults = {
                
            }
            //有些参数用户直接使用默认，有些参数用户要使用自己定义的
            //自定义参数替换默认参数
            //var option = $.extend(default,opts); //为什么不用此行代码？为了保护默认参数
            //extend方法中opts会永久取代default，所以新加一个空对象{}来保存本次所使用的参数，下次使用default依然不变
            var option = $.extend({},defaults,opts);
			console.log("hello,charmingScroll!");
            this.each(function(){ //用each处理选择器选中的一个或多个dom节点
                //容器节点
                var $container = $(this);		                		                
                //内容节点
                var $content= $container.children();

                //容器高度与内容高度
                var containerHeight = parseFloat($container.height());
                var contentHeight = parseFloat($content.height());
                console.log("容器高度："+containerHeight +"-------内容高度："+ contentHeight );

                //内容超出容器
                if ( containerHeight < contentHeight){
                	
                	$container.append('<div class="scroll"><div class="bar"></div></div>');
                	var $scroll = $container.children('.scroll');
                	var $bar = $scroll.children('.bar');

                	//初始化样式
                	setCss($container,$content,$scroll,$bar);               	

                	//滑动条hover事件
                	$container.hover(function(){		                		
                		$scroll.css({
                			'visibility': 'visible',
							'opacity': '1'	
                		})
                	},function(){
                		$scroll.css({
                			'visibility': 'hidden',
							'opacity': '0'	
                		})
                	});		                	

                	//计算出滑动条的高度
				    //计算公式 containerHeight / contentHeight = barHeight / containerHeight;
				    var barHeight = containerHeight * containerHeight / contentHeight ;
				    	$bar.height(barHeight);
				    	console.log("滑块高度:"+barHeight);

                	//计算出滑动条的步长，这里内容区域滚轮转动一次内容向上120
    				//计算公式(testHeight - boxHeight)/120 = (boxHeight - barHeight) / barStep

				    var rollerBarStep = (containerHeight - barHeight) * 120 / (contentHeight - containerHeight);	    					
    					console.log("滚轮滑动一次，滑块滑动的距离:"+rollerBarStep);
				    
				    //鼠标滑动事件
					$bar.on("mousedown",function(event){
						console.log("----------------------");
						var event = event || window.event;
						//滑动条绝对定位中的top值
						var _oldBarTop= parseFloat($bar.css('top'));
						var _oldContentTop = parseFloat($content.css('top'));
						//获取鼠标按下时距浏览器顶部的距离			
						var oldY ;
						
						//event.which =1；左键；=2位中键；=3右键
						if(event.which == 1){
							oldY = event.clientY;
						}else{
							return false;
						}
						console.log("鼠标按键类型:"+event.which);									
						console.log("初始Y值:"+oldY);
						console.log("----------------------");
						document.onmousemove = function(event){
			               
			                var event = event || window.event;
			               
			                //滑块滑动距离				               
			                var slideDistance = event.clientY - oldY;
							console.log("滑块滑动距离:"+ slideDistance);
			                
			                //计算滑块新的top值，判断是否滑出边界
			                var _newBarTop = _oldBarTop + slideDistance;
			                console.log("滑块新的top值："+ _newBarTop);
			                
			                //根据滑块滑动的距离，计算出内容需滑动的距离
			                var _contentDistance = (contentHeight-containerHeight)*slideDistance/(containerHeight-barHeight);
			                var _newContentTop = -(Math.abs(_oldContentTop) + _contentDistance);
			                console.log("内容相应滑动距离:"+ _contentDistance);
			                console.log("内容旧的top值："+_oldContentTop);
			                console.log("内容新的top值："+_newContentTop);	   
			                //滑块顶部判断
			                if(_newBarTop <= 0 ){
			                	$bar.css('top',0);
			                	$content.css('top',0)
			                	return false;
			                }else if(_newBarTop <= containerHeight- barHeight){	                	
			                	$bar.css('top',_newBarTop);
			                	$content.css('top',_newContentTop);
			                	             		                	
			                	window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()  
			                	// 防止拖动滑块的时候， 选中文字
			                }else{
			                	$bar.css('top',containerHeight- barHeight);
			                	$content.css('top',containerHeight-contentHeight);
			                	return false;
			                }
			                console.log("----------------------");	              
			            }
			            
			            document.onmouseup = function(){
				            console.log("--------end-----------");	 
				            document.onmousemove = null;
				            document.onmouseup=null;
				        }				
							
					});

					$container.on("mousewheel DOMMouseScroll", function (e) {
						var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
	                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));   // firefox
	                	var _oldBarTop= parseFloat($bar.css('top'));
						var _oldContentTop = parseFloat($content.css('top'));
	                	if (delta > 0) {
					        //滑动到顶部
					        if(_oldBarTop -  rollerBarStep <= 0){
					        	console.log("已到顶部");
					        	$bar.css('top',0);
					        	$content.css('top',0)
					        }else{
					        	// 向上滚
					        	console.log("向上滚动");
					        	$bar.css('top',_oldBarTop-rollerBarStep);
					        	$content.css('top',_oldContentTop+120)
					        }
					        
					    } else if (delta < 0) {
					        //滑动到底部
					        if( (_oldBarTop + barHeight + rollerBarStep) >= containerHeight ){
					        	console.log("已到底部");
					        	$bar.css('top',containerHeight-barHeight);
					        	$content.css('top',-(contentHeight-containerHeight))
					        }else{
					        	// 向下滚
					        	console.log("向下滚动");
					        	$bar.css('top',_oldBarTop+rollerBarStep);
					        	$content.css('top',_oldContentTop-120 )
					        }
					        
					    }
	            });

                }
                
            });

            //最后别忘了保持jquery的链式操作（视情况而定）
            return this; //返回被选中的元素节点，以供后续操作。
        }

    });
})(jQuery);//传入jQuery是为更快查找，避免沿作用域链往上层查找，提高性能