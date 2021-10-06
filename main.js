status = "";
objects = [];
function preload() {
}
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}
function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: Objects Have Been Detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are: " + objects.length;
            fill("#00008b");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#00008b");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_name) { video.stop(); objectDetector.detect(gotResult); document.getElementById("object_status").innerHTML = object_name + " Found"; synth = window.speechSynthesis; utterThis = new SpeechSynthesisUtterance(object_name + "Found"); synth.speak(utterThis); } else { document.getElementById("object_status").innerHTML = object_name + " Not Found"; }
        }
    }
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status:detecting objects";
}
function modelLoaded() {
    console.log("modelLoaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}
function gotResult(error, results) {
    if (error) {
        console.log("error");
    }
    console.log(results);
    objects = results;
}