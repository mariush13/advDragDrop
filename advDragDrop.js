DragDrop = function (params) {

    this.dragClass = params.dragClass?params.dragClass:'drag';
    this.dropClass = params.dropClass?params.dropClass:'drop';
        
    this.extendDrag();
};

DragDrop.prototype.extendDrag = function () {
    var elements = this.getByClass(this.dragClass);
    var drops = this.getByClass(this.dropClass);
    for (var i = 0 in elements) {
        dragElement = elements[i]; 
        var offsetX;
        var offsetY;
        dragElement.onmousedown = function (event) {
            offsetX = event.offsetX;
            offsetY = event.offsetY;
            dragElement.prevPosX = dragElement.offsetLeft;
            dragElement.prevPosY = dragElement.offsetTop;
            
            dragElement.onmousemove = function(mousemoveevent) {
                dragElement.style.left = mousemoveevent.pageX-offsetX+'px';
                dragElement.style.top = mousemoveevent.pageY-offsetY+'px';
                dragElement.style.zIndex = 999999;   
            };
        };
        dragElement.onmouseup = function (mouseupevent) {
            dragElement.onmousemove = null;
            for (var i = 0 in drops) {
                console.log(dragElement.offsetLeft + ' ' + dragElement.offsetTop);
                console.log(drops[i].offsetLeft + ' ' + drops[i].offsetTop);
                if (dragElement.offsetLeft >= drops[i].offsetLeft && dragElement.offsetTop >= drops[i].offsetTop && 
                    dragElement.offsetLeft + dragElement.offsetWidth <= drops[i].offsetLeft + drops[i].offsetWidth && 
                    dragElement.offsetTop + dragElement.offsetHeight <= drops[i].offsetTop + drops[i].offsetHeight) 
                {
                    dragElement.style.left = mouseupevent.pageX-offsetX+'px';
                    dragElement.style.top = mouseupevent.pageY-offsetY+'px';
                    return;
                } 
            }
            dragElement.style.left = dragElement.prevPosX+'px';
            dragElement.style.top = dragElement.prevPosY+'px';
            return;
        };
    }
};

DragDrop.prototype.extendDrop = function () {
    
};

DragDrop.prototype.getByClass = function (className) {
    var dom = document.getElementsByTagName('*');
    var elements = new Array();
    for (var i = 0 in dom) {
        if(dom[i].className != undefined && dom[i].className.search(className) != -1) {
            elements.push(dom[i]);
        } 
    }
    return elements;
};

DragDrop.prototype.getEventTarget = function (event) {
    if (event){
        if (event.srcElement){
            return event.srcElement;
        }else if (event.target){
            return event.target;
        }
    }
    return null;
};

//------------------------------------------------------------------------------------------------------------//

var ddparams = {
        dragClass: 'drag',
        dropClass: 'drop'
    };

var dd;

var ev;

window.onload = function () {
    dd = new DragDrop(ddparams);
}
