status = "";
input_text = "";

function setup(){
   canvas = createCanvas(300, 290);
    canvas.position(480, 250);
    video = createCapture(VIDEO);
    video.size(300, 290);
    video.hide();
}
function start(){
    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHtml = "Status : Detecting Objects";
    input_text = document.getElementById("input_id").value;
}

function modelloaded(){
    console.log("model_loaded");
    status = true;
}

function draw(){
    image(video, 0, 0, 300, 290);
    if(Status != ""){
        object_detector.detect(video, gotResults);
        for(i = 0, i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : objects Detected";
            console.log(objecta.length);
            fill();
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "%", objects[i].x + objects[i].y +15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i]width, objects[i].height);
            
            if(objects[i].label == input_text){
                video.stop();
                object_detector.detect(gotResults);
                document.getElementById("object_found").innerHTMl = input_text + "Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesiisUtterance(input_text + "Found");
                synth,.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = input_text + "Not Found";
            }
        }
    }
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}