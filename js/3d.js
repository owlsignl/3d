//获取元素
		var oSean = document.getElementById('osean');
		var oBox = document.getElementsByClassName('box')[0];
		var oUl = document.getElementsByTagName('ul')[0];
		var aLi = oUl.getElementsByTagName('li');
		var oItem = document.getElementsByClassName('item')[0];
		var oP =oItem.getElementsByTagName('p')[0];
		var oA2 = oItem.getElementsByTagName('a')[0];
		var oWn = document.getElementsByClassName('own')[0];
		var oA1 = oWn.getElementsByTagName('a');
		var oText = document.getElementsByClassName('text')[0];
		var tTarea = oText.getElementsByTagName('textarea')[0];
		var btt = oText.getElementsByTagName('button');
		var ta = oText.getElementsByTagName('a')[0];
		var s = oP.innerHTML;;
		var arr = null;
		var num = 0;
		var circleNum = 0;
		var circleArr = [];
		var wordNum = -1;
		var option = 1;
		var timer = null;
		var theta = 0;
		var phi = 0;
		var r = 0;//半径
		var coneNum = 0;
		var coneArr = [];
		var columnNum = 0;
		var columnArr = 0;
		var columnN = 0;
		var columnA = 0;
		star();
//初始
function star(){
			//球型
		  arr = oP.innerHTML;
		  num = 0;
		  circleNum = 0;
	      circleArr = [];
		  wordNum = -1;
		  option = 1;
		  timer = null;
		//获取球形的层数
		for (var i=4;i<13;i++){
			num = i*i + (i+1)*(i+1);
			if (num > arr.length){
				circleNum = 2*(i-1) +1;
				break;
			}
			circleNum = 2*i -1;
		}
		//获取每层的个数，并放入数组中
		for (var i=0;i<circleNum;i++){
			if(i<(circleNum + 1)/2){
				wordNum += 2;
			}else{
				wordNum -=2;
			}
			circleArr.push(wordNum);
		}
			 theta = Math.PI/(circleNum-1);//获取theta角
		phi = 0;
		r = 150;//半径
		num = 0;
		for (var i=0;i<circleNum;i++){
			phi = 2 * Math.PI/circleArr[i]; //phi角
			//创建li元素，每个li元素代表一个字
			for (var j=0;j<circleArr[i];j++){
				var li = document.createElement('li');
				li.innerHTML = arr[num];
				num++;
				drawCircle(li,r,theta,phi,i,j);//设置li元素的位置属性
				oUl.appendChild(li);
			}
		}
		//设置li的位置
		for (var i=0;i<aLi.length;i++){
			aLi[i].style.transform = "translate3D(" + aLi[i].circleX + "px," +aLi[i].circleY + "px," + aLi[i].circleZ + "px" + ") rotateY(" + aLi[i].circlePhi + "rad" + ") rotateX("+ aLi[i].circleTheta +"rad" + ")";
		}
		
//圆锥   
		coneNum = 0;
		coneArr = [];
		for ( var i=1;i<aLi.length;i++) {
			coneNum += 2 * i - 1;//所用到的li元素的数目
			if (coneNum > aLi.length){
				coneNum -= 2 * i - 1;
				break;
			}
			coneArr.push(2 * i -1);//放置每层个数的数组
		}
		num = 0;
		for (var i=0;i<coneArr.length;i++){
			phi = 2*Math.PI/coneArr[i] ;
			for (var j=0;j<coneArr[i];j++) {
				drawCone(aLi[num],phi,i,j);
				num++;
			}
		}
		
		
//圆柱
		 columnNum = Math.floor(aLi.length/(circleNum-2));
		 columnArr = (circleNum-2) * columnNum;
		num = 0;
		phi = 2 * Math.PI/columnNum;
		for (var i=0;i<circleNum-1;i++){
			for (var j=0;j<columnNum;j++){
				drawColumn(aLi[num],phi,i,j);
				num++;
			}
		}
//斜圆柱
		 columnN = Math.floor(aLi.length/(circleNum-2));
		 columnA = (circleNum-2) * columnN;
		num = 0;
		phi = 2 * Math.PI/columnN;
		for (var i=0;i<circleNum-1;i++){
			for (var j=0;j<columnN;j++){
				drawColum(aLi[num],phi,i,j);
				num++;
			}
		}

		}

		var angleY = 0;
		var angleX = 0;
		var timer2 = setInterval(function() {
			angleY++;
			oBox.style.transform = "rotateY(" + angleY + "deg" +")" ;
		},60)
//爆炸效果（增加圆的半径）
    var oTable = document.getElementsByClassName('table')[0];
	var aA = oTable.getElementsByTagName('a');
	var onoff = false;
	aA[0].onclick = function () {
			option =1;
			onoff = true;
			tryOption();
			reset();
			drag();
		}	
	aA[1].onclick = function () {
		    reset();
			onoff = true;
			option =2;
			tryOption();
			drag();
		}
	aA[2].onclick = function () {
		reset();
		onoff = true;
		option = 3;
		tryOption();
		console.log(angleX)
		drag();
		}
	aA[3].onclick = function () {
		reset();
		onoff = true;
		option = 4;
		tryOption();
		drag();
		}
	oA1[0].onclick = function (){
		startChange();
		oItem.style.display = "block";
		setTimeout(function(){
		oItem.style.opacity = 1;
		oItem.style.transform = "scale(1)";
		},1030)
		}
	oA1[1].onclick = function (){
		oText.style.display = 'block';
		setTimeout(function(){
			oText.style.transform = 'scale(1)';
			oText.style.opacity = 1;
		},12)
	}
	btt[0].onclick = function () {
		s = tTarea.value;
		if(s.length<50||s.length>350){
			alert('您输入的内容小于50字或大于350字');
		}else{
			oText.style.opacity = 0;
			oText.style.transform = 'scale(.5)';
			oUl.innerHTML = '';
			oP.innerHTML = s;
			star();
			setTimeout(function(){
				oText.style.display = 'none';
			},12)
		}
	}
	btt[1].onclick = function () {
		tTarea.value = '';
	}
	ta.onclick = function () {
		    oText.style.opacity = 0;
			oText.style.transform = 'scale(.5)';
			setTimeout(function(){
				oText.style.display = 'none';
			},12)
	}
	oA2.onclick = function () {
		onoff = false;
		tryOption();
		oItem.style.transform = "rotateX(-180deg) scale(0.5)"
		oItem.style.opacity = 0;
	}
	//重置旋转
	function reset () {
			clearInterval(timer2);
			timer2 = setInterval(function() {
			angleY++;
			oBox.style.transform = "rotateY(" + angleY + "deg" +")" ;
		},60)
	}

//拖拽
	function drag(){
		oBox.onmousedown = function (ev) {
			var ev = ev||event;
			var cx = ev.clientX;
			var cy = ev.clientY;
			var disX = 0;
			var disY = 0;
			clearInterval(timer2);
			document.onmousemove = function (ev) {
				var ev = ev ||event;
				disX = ev.clientX -cx;
				disY = ev.clientY -cy;
					oBox.style.transform = "rotateY(" + (angleY + disX) + "deg" +") rotateX(" + (angleX - disY) + "deg"+ ")";
			}
			document.onmouseup = function () {
				document.onmousemove = null;
				document.onmouseup = null;
				angleX = angleX - disY;
				angleY = angleY +disX;
				if(disX===0&&disY===0) {
					disX = 100;
				}
				timer2 = setInterval(function() {
					angleX -= disY/100;
					angleY += disX/100;
					oBox.style.transform = "rotateY(" + angleY + "deg" +") rotateX(" + angleX + "deg" +")" ;
			},60)
			}
			return false;
		}
	}
//判断当前形状，并返回对应的形状
	function tryOption(){
		clearTimeout(timer);
		if(onoff){
			startChange();
		}
		timer = setTimeout(function(){
			switch(option){
				case 1:
					choseCircle();
					break;
				case 2:
					choseCone();
					break;
				case 3:
					choseColumn();
					break;
				case 4:
					choseColum();
		}
		},1050)
	}
//开始变换时记录当前的形状，并以当前形状发散出去	
	function startChange () {
		for (var i=0;i<aLi.length;i++){
			aLi[i].className = "all" ;
			aLi[i].style.transform = "translate3D(" + aLi[i].maxX +"px," + aLi[i].maxY + "px," + aLi[i].maxZ + "px ) rotateY(" + aLi[i].maxPhi + "rad) rotateX(" +aLi[i].maxTheta + "rad)";
			aLi[i].style.opacity = 0;
		}
	}
	//选择圆锥，将圆锥的最大值赋值给max
	function choseCone () {
		for (var i=0;i<coneNum;i++){
			aLi[i].className = "" ;
			aLi[i].maxX = aLi[i].bigconeX;
			aLi[i].maxY = aLi[i].bigconeY;
			aLi[i].maxZ = aLi[i].bigconeZ;
			aLi[i].maxTheta = aLi[i].coneTheta;
			aLi[i].maxPhi = aLi[i].conePhi;
			aLi[i].style.transform = "translate3D(" + aLi[i].maxX +"px," + aLi[i].maxY + "px," + aLi[i].maxZ + "px ) rotateY(" + aLi[i].maxPhi + "rad) rotateX(" +aLi[i].maxTheta + "rad)";
		}
		timer = setTimeout(function () {
			for (var i=0;i<coneNum;i++){
			aLi[i].className = "one" ;
			aLi[i].style.opacity = 1;
			aLi[i].style.transform = "translate3D(" + aLi[i].coneX + "px," +aLi[i].coneY + "px," + aLi[i].coneZ + "px" + ") rotateY(" + aLi[i].conePhi + "rad" + ") rotateX("+ aLi[i].coneTheta +"rad" + ")";
		      }
		},50)
		
	}
	//选择圆柱
	function choseColumn () {
		for (var i=0;i<columnArr;i++){
			aLi[i].maxX = aLi[i].bigcolumnX;
			aLi[i].maxY = aLi[i].bigcolumnY;
			aLi[i].maxZ = aLi[i].bigconeZ;
			aLi[i].maxPhi = aLi[i].columnPhi;
			aLi[i].style.transform = "translate3D(" + aLi[i].maxX +"px," + aLi[i].maxY + "px," + aLi[i].maxZ + "px ) rotateY(" + aLi[i].maxPhi + "rad)";
		}
		timer = setTimeout(function () {
			for (var i=0;i<columnArr;i++){
				aLi[i].style.opacity = 1;;
				aLi[i].style.transform = "translate3D(" + aLi[i].columnX + "px," +aLi[i].columnY + "px," + aLi[i].columnZ + "px" + ") rotateY(" + aLi[i].columnPhi + "rad" + ")";
				}
		},50)
	}
//选择扭曲圆柱
	function choseColum () {
		for (var i=0;i<columnArr;i++){
			aLi[i].maxX = aLi[i].bigcolumX;
			aLi[i].maxY = aLi[i].bigcolumY;
			aLi[i].maxZ = aLi[i].bigconeZ;
			aLi[i].maxPhi = aLi[i].columPhi;
			aLi[i].style.transform = "translate3D(" + aLi[i].maxX +"px," + aLi[i].maxY + "px," + aLi[i].maxZ + "px ) rotateY(" + aLi[i].maxPhi + "rad)";
		}
		timer = setTimeout(function () {
			for (var i=0;i<columnArr;i++){
				aLi[i].style.opacity = 1;;
				aLi[i].style.transform = "translate3D(" + aLi[i].columX + "px," +aLi[i].columY + "px," + aLi[i].columZ + "px" + ") rotateY(" + aLi[i].columPhi + "rad" + ")";
				}
		},50)
	}
	//选择圆
	function choseCircle () {
		for (var i=0;i<aLi.length;i++){
			aLi[i].maxX = aLi[i].bigCircleX;
			aLi[i].maxY = aLi[i].bigCircleY;
			aLi[i].maxZ = aLi[i].bigCircleZ;
			aLi[i].maxTheta = aLi[i].circleTheta;
			aLi[i].maxPhi = aLi[i].circlePhi;
			aLi[i].style.transform = "translate3D(" + aLi[i].maxX +"px," + aLi[i].maxY + "px," + aLi[i].maxZ + "px ) rotateY(" + aLi[i].maxPhi + "rad) rotateX(" +aLi[i].maxTheta + "rad)";
		}
		timer = setTimeout(function () {
			for (var i=0;i<aLi.length;i++){
			aLi[i].style.opacity = 1;
			aLi[i].style.transform = "translate3D(" + aLi[i].circleX + "px," +aLi[i].circleY + "px," + aLi[i].circleZ + "px" + ") rotateY(" + aLi[i].circlePhi + "rad" + ") rotateX("+ aLi[i].circleTheta +"rad" + ")";
			}
		},50)
	}

	//圆柱
     function drawColumn (obj,phi,i,j) {
			obj.columnX = r/1.5 * Math.sin(phi * j) + 200;
			obj.columnY = (2* r/(circleNum-2))*i + 50;
			obj.columnZ = r/1.5 * Math.cos(phi * j);
			obj.bigcolumnX = (r + 2000)/1.5 * Math.sin(phi * j) + 200;
			obj.bigcolumnY = (2 * (r + 2000)/(circleNum-2)) *i +(50-2000);
			obj.bigcolumnZ = (r + 2000)/1.5 *Math.cos(phi * j);
			obj.columnPhi = phi * j;
		}
		//扭曲圆柱
		function drawColum (obj,phi,i,j) {
			obj.columX = r/1.5 * Math.sin(phi * j+ 8*Math.PI/180*i) + 200;
			obj.columY = (2* r/(circleNum-2))*i + 50;
			obj.columZ = r/1.5 * Math.cos(phi * j+ 8*Math.PI/180*i);
			obj.bigcolumX = (r + 2000)/1.5 * Math.sin(phi * j+ 8*Math.PI/180*i) + 200;
			obj.bigcolumY = (2 * (r + 2000)/(circleNum-2)) *i +(50-2000);
			obj.bigcolumZ = (r + 2000)/1.5 *Math.cos(phi * j+ 8*Math.PI/180*i);
			obj.columPhi = phi * j + 8*Math.PI/180*i;
		}
	//圆锥
	function drawCone (obj,phi,i,j) {
			obj.coneX = i*(2*r/coneArr.length)*Math.tan(Math.PI/6)*Math.sin(phi*j) +200;
			obj.coneY = i*(2*r/coneArr.length) + 50;
			obj.coneZ = i*(2*r/coneArr.length)*Math.tan(Math.PI/6)*Math.cos(phi*j);
			obj.bigconeX = i*(2*(r + 2000)/coneArr.length)*Math.tan(Math.PI/6)*Math.sin(phi*j) +200;
			obj.bigconeY = i*(2*(r + 2000)/coneArr.length) + (50-2000);
			obj.bigconeZ = i*(2*(r + 2000)/coneArr.length)*Math.tan(Math.PI/6)*Math.cos(phi*j);
			obj.coneTheta = Math.PI/6;
			obj.conePhi = phi*j;
		}
	//圆
	function drawCircle (obj,r,theta,phi,i,j) {
			obj.circleX = r * Math.sin(theta*i) * Math.sin(phi*j) + 200;
			obj.circleY = -r * Math.cos(theta*i) + 150;
			obj.circleZ = r * Math.sin(theta*i) * Math.cos(phi*j);
			obj.bigCircleX = (r +2000) * Math.sin(theta*i) * Math.sin(phi*j) + 200;
			obj.bigCircleY = -(r+2000) * Math.cos(theta*i) + 150;
			obj.bigCircleZ = (r+2000) * Math.sin(theta*i) * Math.cos(phi*j);
			obj.circleTheta = theta*(circleNum - i) -Math.PI/2 ; 
			obj.circlePhi = phi * j;

			obj.maxX = obj.bigCircleX;
			obj.maxY = obj.bigCircleY;
			obj.maxZ = obj.bigCircleZ;
			obj.maxTheta = obj.circleTheta;
			obj.maxPhi = obj.circlePhi;
		}