let faceapi;
let detections = [];
let expressions = ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised'];

let video;
let canvas;
let img = [];
 
function preload() {
    img[0] = loadImage('asset/happy.jpeg');
    img[1] = loadImage('asset/sad.jpeg');
    img[2] = loadImage('asset/surprised.jpeg');
    img[3] = loadImage('asset/neutral.jpeg');
}

function setup() {
     canvas = createCanvas(900, 700);
     canvas.id('canvas');

     video = createCapture(VIDEO);
     video.id('video');
     video.size(width, height);

     const faceOptions = {
        withLandmarks: true,
        withExpressions: true,
        withDescriptors: false,
        minConfidence: 0.5
      };

     faceapi = ml5.faceApi(video, faceOptions, gotFaces);
}

function gotFaces(error, result) {
    if(error){
        console.log(error);
        return;
    }

    detections = result;
    // console.log(detections);
    faceapi.detect(gotFaces);
}

function draw() {
    clear();
    if(detections.length > 0){
        // applyFilter();
        // printExpressions();
        exp = getExpression();
        if (exp === "happy"){
            applyFilter(0);
        } else if (exp === "sad"){
            applyFilter(1);
        } else if (exp === "surprised"){
            applyFilter(2);
        } else {
            applyFilter(3);
        }
    }
}

function applyFilter(num) {
    for(i=0; i < detections.length; i++){
        let x = detections[0].alignedRect._box._x;
        let y = detections[0].alignedRect._box._y;
        let imgW = detections[0].alignedRect._box._width;
        let imgH = detections[0].alignedRect._box._height;
        
        image(img[num], x, y, imgW, imgH);
    }
}

function printExpressions(){
    let exp = detections[0].expressions;
    for (key of expressions) {
        exp[key] = Number(exp[key]).toFixed(3);
    } 
    expString = JSON.stringify(exp);
    expList = expString.replaceAll(',', '<br>').replaceAll('{', '').replaceAll('}', '').replaceAll('"', '');

    // console.log(expList)

    document.getElementById("output").innerHTML = expList;
}

function getExpression(){
    obj = detections[0].expressions;
    let maxExp = Object.keys(obj).reduce((a, b) => (obj[a] > obj[b]) ? a : b);
    console.log(maxExp);

    return maxExp;
}