var ul;
var liItems;
var imageWidth;
var imageCount;
var currentImage = 0;

function init(){

    ul= document.getElementById('slider');
    liItems = ul.children;
    imageCount = liItems.length;
    imageWidth = liItems[0].children[0].offsetWidth;

    ul.style.width = parseInt(imageWidth * imageCount) + 'px';
    slider(ul);

}

function slider(){

    animate({
        delay:17,
        duration: 8000,
        delta: function(p){return Math.max(0, -1+2*p)},
        step:function(delta){
            ul.style.left = '-' + parseInt(currentImage * imageWidth + delta * imageWidth) + 'px';
        },
        callback: function(){
            currentImage++;
            if(currentImage < imageCount -1) {
                //not the last image yet
                slider(ul);
            }
            else{
                var leftPosition = (imageCount -1) * imageWidth;
                setTimeout(function(){goBack(leftPosition)}, 2000);
                setTimeout(function(){slider(ul)}, 4000);
            }
        }

    }); 
}

function goBack(leftPosition){
    currentImage = 0;
    var id = setInterval(function(){
        if(leftPosition >= 0 ){
            ul.style.left = '-' + parseInt(leftPosition) + 'px';
            leftPosition -= imageWidth/10;
        }
        else{
            clearInterval(id);
        }
    }, 17);
}

function animate(opts){
    var start = new Date;
    var id = setInterval(function(){
        var elapsedTime = new Date - start;
        var progress = elapsedTime / opts.duration;
        if(progress > 1 ){
            progress = 1;
        }
        var delta = opts.delta(progress);
        opts.step(delta);
        if(progress == 1){
            clearInterval(id);
            opts.callback();
        }

    }, opts.delay || 17);
}

window.onload = init;