
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock

//				debugger;
		wheelzoom(document.querySelectorAll('img'), {
		        zoom: 0.05
		});
//		debugger;
		var moncanvas = document.getElementById('mon_canvas');
		
		var monImg = new Image();
		var monContext = [];		
		var action = fullCanvas(moncanvas,monImg);

		function fullCanvas(moncanvas,monImg) {
		        if (!moncanvas) {
		                alert("Impossible de récupérer le canvas");
		                return;
		        }
		        monContext = moncanvas.getContext('2d');
		        if (!monContext) {
		                alert("Impossible de récupérer le monContext du canvas");
		                return;
		        }
//    			monImg.src = "/images/Maison_carrée_(6).jpg";
//    			monImg.src = "/images/Maison_Carrée_de_Nîmes.JPG";
    			monImg.src = "/images/imgres-3.jpg";
    			var computedStyle = getComputedStyle($('#container1')[0],null)
    			moncanvas.width = parseInt(computedStyle.width, 10);
				moncanvas.height = parseInt(computedStyle.height, 10);
			    monImg.onload = function(){
			    monImg.onload=false;
//			    monImg.src = moncanvas.toDataURL();//hélas cela ne marche pas en transformant en data
//			    monRatio=monContext.canvas.clientWidth/monImg.width;
			    wheelzoom3(document.querySelector('.monCanvas'), {
			    	//c'est dans wheelzoom3 que l'on dessinera le Canvas
			        zoom: 0.05,
			        type: "CANVAS",
			        image : monImg,
			        monContextCanvas: monContext
					});


				return;
			    }

		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
