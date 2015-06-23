
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		window.requestAnimFrame = (function(){
    return window.requestAnimationFrame       || // La forme standardisée
           window.webkitRequestAnimationFrame || // Pour Chrome et Safari
           window.mozRequestAnimationFrame    || // Pour Firefox
           window.oRequestAnimationFrame      || // Pour Opera
           window.msRequestAnimationFrame     || // Pour Internet Explorer
           function(callback){                   // Pour les mauvais
               window.setTimeout(callback, 1000 / 60);
           };
})();
	var monImg = new Image();
	monImg.src = "/images/imgres-3.jpg";
	var angle = 0;
	var canvas  = document.querySelector('#canvas');
    var context = canvas.getContext('2d');
    wheelzoom3(document.querySelector('#canvas'), {
		zoom: 0.05,
		type: "CANVAS",
		image : monImg,
		monContextCanvas: context,
		monDraw: drawCanvas
	});

    function drawCanvas() {
        context.save();
        context.clearRect(0, 0, 150, 150);
        context.translate(75,75);

        context.fillStyle = "teal";
        context.rotate((Math.PI / 180) * (45 + angle));
        context.fillRect(0, 0, 50, 50);

        context.fillStyle = "orange";
        context.rotate(Math.PI / 2);
        context.fillRect(0, 0, 50, 50);

        context.fillStyle = "teal";
        context.rotate(Math.PI / 2);
        context.fillRect(0, 0, 50, 50);

        context.fillStyle = "orange";
        context.rotate(Math.PI / 2);
        context.fillRect(0, 0, 50, 50);

        context.restore();

        angle = angle + 2;

        if (angle >= 360) angle = 0;

        window.requestAnimFrame(function() { drawCanvas(angle) });
    }

//    draw(0);

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
