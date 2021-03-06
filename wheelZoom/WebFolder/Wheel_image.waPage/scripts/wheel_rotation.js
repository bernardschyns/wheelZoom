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
                monContextCanvas: [],
               	monDraw : ''


        };
        var canvasTravail = document.createElement('canvas');




        
        main3 = function(img, options) {
                if (!img || !img.nodeName || (img.nodeName !== 'IMG' && img.nodeName !== 'CANVAS')) {
                        return;
                }
                var settings = {};
                var width;
                var height;
                var bgWidth;
                var bgHeight;
                var bgPosX;
                var bgPosY;
                var previousEvent;
                
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
				drawCanvas(0);
//                img.src = canvas.toDataURL();
				}

                function updateBgStyle3() {
//                        if (bgPosX > 0) {
//                                bgPosX = 0;
//                        }
//                        else if (bgPosX < width - bgWidth) {
//                                bgPosX = width - bgWidth;
//                        }
//                        if (bgPosY > 0) {
//                                bgPosY = 0;
//                        }
//                        else if (bgPosY < height - bgHeight) {
//                                bgPosY = height - bgHeight;
//                        }
//                        img.style.backgroundSize = bgWidth + 'px ' + bgHeight + 'px';
//                        img.style.backgroundPosition = bgPosX + 'px ' + bgPosY + 'px';
						var img = settings.image;
//						var monRatio=monContext.canvas.clientWidth/img.naturalWidth;
//						  monContext.drawImage(img, 0, 0,img.naturalWidth,img.naturalHeight,bgPosX,bgPosY,monRatio*img.naturalWidth,monRatio*img.naturalHeight);
//						  monContext.drawImage(img, 0, 0,img.naturalWidth,img.naturalHeight,bgPosX,bgPosY,bgWidth,bgHeight);
	                        monContext.fillStyle='white';
	                        monContext.fillRect(-10,-10,canvas.width+10,canvas.height+10);
							  
						  monContext.translate(bgPosX/100,bgPosY/100);
						  
						  monContext.drawImage(img, 0, 0,img.naturalWidth,img.naturalHeight,0,0,bgWidth,bgHeight);


						  drawCanvas();


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
                        monContext.fillStyle='white';
                        monContext.fillRect(0,0,canvas.width,canvas.height);
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
//                        monContext.fillRect(-10,-10,canvas.width+10,canvas.height+10);
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
                        width = settings.image.naturalWidth;
                        height = settings.image.naturalHeight;
                        bgWidth = canvas.width;
                        bgHeight = canvas.height;
                        bgPosX = 0;
                        bgPosY = 0;
                        var bgRatioX = bgWidth/width;
                        var bgRatioY = bgHeight/height;
                        var bgRatio= bgRatioY<bgRatioY ? bgRatioY : bgRatioX  ;                      
                        setSrcToBackground3(img,bgRatio);   
                        img.style.backgroundSize = width + 'px ' + height + 'px';
                        img.style.backgroundPosition = '0 0';
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
                                drawCanvas=settings.monDraw;
                        }
              
                if (img.complete) {
                        
                        loaded3();
                }
                else {
                        function onload3() {
                                img.removeEventListener('load', onload3);
                                loaded3();
                        }
                        //on postule que l'on ne doit jamais passer par ici
//                        img.addEventListener('load', onload3);
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

