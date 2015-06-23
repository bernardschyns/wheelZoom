
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
		        //C'est ici que l'on placera tout le code servant à nos dessins.
		        //On n'oublie pas de récupérer le canvas et son monContext.
//		        debugger;
//    			monImg.src = "/images/Maison_carrée_(6).jpg";
//    			monImg.src = "/images/Maison_Carrée_de_Nîmes.JPG";
    			monImg.src = "/images/imgres-3.jpg";
    			var computedStyle = getComputedStyle($('#container1')[0],null)
    			moncanvas.width = parseInt(computedStyle.width, 10);
				moncanvas.height = parseInt(computedStyle.height, 10);
			    monImg.onload = function(){
			    monImg.onload=false;
//			    monImg.src = moncanvas.toDataURL();
			    monRatio=monContext.canvas.clientWidth/monImg.width;
			    wheelzoom3(document.querySelector('.monCanvas'), {
			        zoom: 0.05,
			        type: "CANVAS",
			        image : monImg,
			        monContextCanvas: monContext,
			        monDraw : drawCanvas
					});
//			    monContext.drawImage(monImg, 0, 0,monRatio*monImg.width,monRatio*monImg.height);
				function drawCanvas(){
				    monContext.beginPath();
				    monContext.moveTo(30, 96);
				    monContext.lineTo(70, 66);
				    monContext.lineTo(103, 76);
				    monContext.lineTo(170, 15);
				    monContext.stroke();
				    monContext.beginPath(); //On démarre un nouveau tracé
			        monContext.moveTo(0, 300); //On se déplace au coin inférieur gauche
			        monContext.lineTo(150, 0);
			        monContext.lineTo(300, 300);
			        monContext.lineTo(0, 300);
			        monContext.stroke(); //On trace seulement les lignes.
			        monContext.closePath();
		    	}

				return;
			    }

		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
