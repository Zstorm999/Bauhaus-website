var ul;
var liItems;
var imageWidth;
var imageCount;
var currentImage = 0;

var timer;

var leftButton;
var rightButton;

function init(){

    leftButton = document.getElementById('leftArrow');
    leftButton.onclick = leftButtonClicked;

    rightButton = document.getElementById('rightArrow');
    rightButton.onclick = rightButtonClicked;

    ul= document.getElementById('slider');
    liItems = ul.children;
    imageCount = liItems.length;
    imageWidth = liItems[0].children[0].width;

    ul.style.width = parseInt(imageWidth * imageCount) + 'px';
    slider(ul);

}

function slider(){

    animate({
        delay:17,
        stillDuration: 6000,
        movingDuration: 1100,
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
    timer = Date.now();
    var id = setInterval(function(){
        var elapsedTime = Date.now() - timer;
        var progress = elapsedTime / opts.stillDuration;
        if(progress > 1 ){
            
            elapsedTime -= opts.stillDuration;

            progress = elapsedTime / opts.movingDuration;
            if(progress > 1){
                progress = 1;
            }

            opts.step(progress)

            if(progress == 1){
                clearInterval(id);
                opts.callback();
            }
        }
        
        

    }, opts.delay || 17);
}

function leftButtonClicked(){
    console.log("Left");
}

function rightButtonClicked(){
    console.log("Right");
}

window.onload = init;