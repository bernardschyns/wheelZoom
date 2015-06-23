
/*!
	Wheelzoom 3.0.0
	license: MIT
	http://www.jacklmoore.com/wheelzoom
*/
wheelzoom3 = (function() {
//        debugger;
        var defaults = {
                zoom: 0.10,
                type:"",
                image:[],
                monContextCanvas: []

        };
        var canvasTravail = document.createElement('canvas');




        
        main3 = function(img, options) {

                if (img.nodeName !== 'CANVAS') {
                        return;
                }
                var settings = {};
                var width;
                var height;
                var bgWidth;
                var bgHeight;
                var bgPosX;
                var bgPosY;
                var _Init=true;
                var previousEvent;
                
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
		 //C'est ici que l'on placera tout le code servant à nos dessins.                
           function drawCanvas(_Init,img,width,height,bgPosX,bgPosY,bgWidth,bgHeight){
			        // l'ordre des paramètres de drawCanvas est calqué sur ceux de drawImage de canvas           	
           			monContext.save();
                    monContext.fillStyle='white';
                    monContext.fillRect(0,0,canvas.width,canvas.height);           			
           			monContext.translate(bgPosX,bgPosY);
           			monContext.scale(bgWidth/canvas.width,bgWidth/canvas.width);
//					monContext.drawImage(img, 0, 0,img.naturalWidth,img.naturalHeight,bgPosX,bgPosY,bgWidth,bgHeight);
					monContext.drawImage(img, 0, 0,img.naturalWidth,img.naturalHeight,0,0,width,height);
					
					//il y a lieu de tenir compte du facteur de zoom , on en a implicitement tenu compte dans draw image
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
			        monContext.restore();
			        //il n'y a pas lieu d'animer si on est en phase d'initialisation
			        if (!_Init){
        				window.requestAnimFrame(function() { drawCanvas(_Init,img,width,height,bgPosX,bgPosY,bgWidth,bgHeight) });
        						}

			        
		    	}
                
                function setSrcToBackground3(img,bgRatio) {
                img.style.backgroundImage = "url('" + img.src + "')";
                img.style.backgroundRepeat = 'no-repeat';
                // il s'avère que les lignes suivantes de la programmation d'origine sont nuisibles
//				canvas.width = img.naturalWidth;
//				canvas.height = img.naturalHeight;                
                width=bgWidth = bgRatio*img.naturalWidth;
				height=bgHeight = bgRatio*img.naturalHeight;
//                img.src = canvasTravail.toDataURL();
//                var monRatio=monContext.canvas.clientWidth/img.naturalWidth;
				monContext.drawImage(img, 0, 0,img.naturalWidth,img.naturalHeight,bgPosX,bgPosY,bgWidth,bgHeight);
				drawCanvas(_Init,img,width,height,bgPosX,bgPosY,bgWidth,bgHeight);
//                img.src = canvas.toDataURL();
				}

                function updateBgStyle3() {
                        if (bgPosX > 0) {
                                bgPosX = 0;
                        }
                        else if (bgPosX < width - bgWidth) {
                                bgPosX = width - bgWidth;
                        }
                        if (bgPosY > 0) {
                                bgPosY = 0;
                        }
                        else if (bgPosY < height - bgHeight) {
                                bgPosY = height - bgHeight;
                        }
//                        img.style.backgroundSize = bgWidth + 'px ' + bgHeight + 'px';
//                        img.style.backgroundPosition = bgPosX + 'px ' + bgPosY + 'px';
						var img = settings.image;
						  drawCanvas(_Init,img,width,height,bgPosX,bgPosY,bgWidth,bgHeight);


                }

                function reset3() {
                        bgWidth = width;
                        bgHeight = height;
                        bgPosX = bgPosY = 0;
                        updateBgStyle3();
                }

                function onwheel3(e) {
                        var deltaY = 0;
                        e.preventDefault();
//                        monContext.fillStyle='white';
//                        monContext.fillRect(0,0,canvas.width,canvas.height);
                        if (e.deltaY) { // FireFox 17+ (IE9+, Chrome 31+?)
                                deltaY = e.deltaY;
                        }
                        else if (e.wheelDelta) {
                                deltaY = -e.wheelDelta;
                        }
                        // As far as I know, there is no good cross-browser way to get the cursor position relative to the event target.
                        // We have to calculate the target element's position relative to the document, and subtrack that from the
                        // cursor's position relative to the document.
                        var rect = img.getBoundingClientRect();
                        var offsetX = e.pageX - rect.left - document.body.scrollLeft;
                        var offsetY = e.pageY - rect.top - document.body.scrollTop;
                        // Record the offset between the bg edge and cursor:
                        var bgCursorX = offsetX - bgPosX;
                        var bgCursorY = offsetY - bgPosY;
                        // Use the previous offset to get the percent offset between the bg edge and cursor:
                        var bgRatioX = bgCursorX / bgWidth;
                        var bgRatioY = bgCursorY / bgHeight;
                        // Update the bg size:
                        if (deltaY < 0) {
                                bgWidth += bgWidth * settings.zoom;
                                bgHeight += bgHeight * settings.zoom;
                        }
                        else {
                                bgWidth -= bgWidth * settings.zoom;
                                bgHeight -= bgHeight * settings.zoom;
                        }
                        // Take the percent offset and apply it to the new size:
                        bgPosX = offsetX - (bgWidth * bgRatioX);
                        bgPosY = offsetY - (bgHeight * bgRatioY);
                        // Prevent zooming out beyond the starting size
                        if (bgWidth <= width || bgHeight <= height) {
                                reset3();
                        }
                        else {
                                updateBgStyle3();
                        }
                }

                function drag3(e) {
                        e.preventDefault();
//                        monContext.fillStyle='white';
//                        monContext.fillRect(0,0,canvas.width,canvas.height);
                        bgPosX += (e.pageX - previousEvent.pageX);
                        bgPosY += (e.pageY - previousEvent.pageY);
                        previousEvent = e;
                        updateBgStyle3();
                }

                function removeDrag3() {
                        document.removeEventListener('mouseup', removeDrag3);
                        document.removeEventListener('mousemove', drag3);
                }
                // Make the background draggable
                function draggable3(e) {
                        e.preventDefault();
                        previousEvent = e;
                        document.addEventListener('mousemove', drag3);
                        document.addEventListener('mouseup', removeDrag3);
                }

                function loaded3() {
                        width = settings.image.naturalWidth;//restera invariable
                        height = settings.image.naturalHeight;//restera invariable
                        bgWidth = canvas.width;//au départ, on place l'image à l'origine et au maximum du container disponible
                        bgHeight = canvas.height;
                        bgPosX = 0;
                        bgPosY = 0;
                        var bgRatioX = bgWidth/width;
                        var bgRatioY = bgHeight/height;
                        var bgRatio= bgRatioY<bgRatioY ? bgRatioY : bgRatioX  ; 
		                width=bgWidth = bgRatio*img.naturalWidth;
						height=bgHeight = bgRatio*img.naturalHeight;                                               
                        img.style.backgroundSize = width + 'px ' + height + 'px';
                        img.style.backgroundPosition = '0 0';
		                img.style.backgroundImage = "url('" + img.src + "')";
		                img.style.backgroundRepeat = 'no-repeat'; 
						drawCanvas(_Init,img,width,height,bgPosX,bgPosY,bgWidth,bgHeight);
						// à l'issue de loaded(3), l'_Init est false
						_Init=false;	                                       
                        canvas.addEventListener('wheelzoom.reset', reset3);
                        canvas.addEventListener('wheel', onwheel3);
                        canvas.addEventListener('mousedown', draggable3);
                }
                img.addEventListener('wheelzoom.destroy', function(originalProperties) {
                        console.log(originalProperties);
                        img.removeEventListener('wheelzoom.destroy');
                        img.removeEventListener('wheelzoom.reset', reset3);
                        img.removeEventListener('load', onload3);
                        img.removeEventListener('mouseup', removeDrag3);
                        img.removeEventListener('mousemove', drag3);
                        img.removeEventListener('mousedown', draggable3);
                        img.removeEventListener('wheel', onwheel3);
                        img.style.backgroundImage = originalProperties.backgroundImage;
                        img.style.backgroundRepeat = originalProperties.backgroundRepeat;
                        img.src = originalProperties.src;
                }.bind(null, {
                        backgroundImage: img.style.backgroundImage,
                        backgroundRepeat: img.style.backgroundRepeat,
                        src: img.src
                }));
                options = options || {};
                Object.keys(defaults).forEach(function(key) {
                        settings[key] = options[key] !== undefined ? options[key] : defaults[key];
                });
                if (settings.type == "CANVAS") {
                                img = settings.image;
                                zoom = settings.zoom;
                                monContext=settings.monContextCanvas;
                                canvas=settings.monContextCanvas.canvas;
                        }
              
                if (img.complete) {
                        
                        loaded3();
                }
                else {
                        function onload3() {
                                img.removeEventListener('load', onload3);
                                loaded3();
                        }
                        img.addEventListener('load', onload3);
                }
        };
        // Do nothing in IE8
        if (typeof window.getComputedStyle !== 'function') {
                return function(elements) {
                        return elements;
                }
        }
        else {
                return function(elements, options) {
                        if (elements && elements.length) {
                                Array.prototype.forEach.call(elements, main3, options);
                        }
                        else if (elements && elements.nodeName) {
//                        	debugger;
                                main3(elements, options);
                        }
                        return elements;
                }
        }
}());