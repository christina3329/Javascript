window.onload=function(){
	//声明全局变量
	var index=0,//当前显示图片的索引，默认值为0，
		main=byId("main"),
		pics=byId("banner").getElementsByTagName("div"),
		items=byId("nav").getElementsByTagName("span"),
		timer=null, //定时器
		size=pics.length;


	//封装getElementById
	function byId(id){
		return typeof(id)==="string" ? document.getElementById(id):id;
	}	

	

	//切换图片
	function changeImg(){
		//遍历所有图片，将图片隐藏
		for(var i=0;i<size;i++){
			pics[i].style.display="none";
			items[i].className="";
		}
		//显示当前图片
		pics[index].style.display="block";
		items[index].className="active";
	}

	//清除定时器，停止轮播
	function stopAutoPlay(){
		if (timer) {
			clearInterval(timer);
		}
	}

	//开启自动轮播
	function startAutoPlay(){
		timer=setInterval(function(){
			index++;
			if (index>=size)index=0;
			changeImg();
		},1000)
	}

	// 封装通用事件绑定方法
		function addHandler(element,type,handler){
			if(element.addEventListener){
				element.addEventListener(type,handler,true);
			}else if(element.attachEvent){
				element.attachEvent("on"+type,handler);
			}else{
				element["on"+type]=null;
			}
		}
	

	//点击菜单切换图片
	for(var t=0;t<size;t++){
		items[t].setAttribute("data-id",t);
		addHandler(items[t],"click",function(){
			index=this.getAttribute("data-id");
			changeImg();
		})
	}



	// 鼠标停留在整个页面时，停止轮播
	addHandler(main,"mouseover",stopAutoPlay);
	//鼠标离开页面时，继续轮播
	addHandler(main,"mouseout",startAutoPlay);


	//开启自动轮播
	startAutoPlay()
}