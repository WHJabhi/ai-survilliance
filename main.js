video = "";
status = "";
objects = [];

function preload() {
    video = createVideo('video.mp4');
} 

function setup() {
    canvas = createCanvas(480,380);
    canvas.center();
    video.hide();
}

function draw(){
    image(video,0,0,480,380);
    console.log("draw")
    if(status != ""){
        objectDetector.detect(video,gotresult);
        for(i = 0;i <objects.length;i++){
            document.getElementById("status").innerHTML = "status: object space dectected";
            document.getElementById("no_of_object").innerHTML = "number of object dectected are: "+ objects.length;
            fill("black");
            percent = floor(objects[i].confidence*100);
            text(objects[i].lable+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("black");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoded);
    document.getElementById("Status").innerHTML = "Status: Decting objects";
}

function modelLoded() {
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotresult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}