status ="";
objects =[];
alarm="";

function setup()
{
    canvas = createCanvas(600,450);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 450);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML= "Status = Detecting Objects";
    document.getElementById("find").innerHTML= "Baby Not Found";
}

function preload()
{
    alarm = loadSound("old_alarm_sound.mp3");
}

function modelLoaded()
{
    console.log("Model is Loaded");
    status = true;
    objectDetector.detect(video, gotResults);
}

function gotResults(error, results)
{
    if (error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}

function draw()
{
    image(video,0,0,600,450);
    if (status != "")
    {
        for(i = 0; i< objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status = Objects Detected";
            document.getElementById("find").innerHTML = "Baby found";
            fill("red");
            percent = floor(objects[i].confidence * 100);

            text(objects[i].label + " " + percent + "%" ,objects[i].x +15, objects[i].y +15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            alarm.stop();
        }
    }
    else
    {
        alarm.play();
    }
}