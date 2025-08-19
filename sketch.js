let video;
let rilevatoreMano;
let predizioni = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  rilevatoreMano = ml5.handpose(video, () => {
    console.log("Modello HandPose caricato");
  });

 
  rilevatoreMano.on("predict", (risultati) => {
    predizioni = risultati;
  });

  background(0);
}

function draw() {

  translate(width, 0);
  scale(-1, 1);

  background(0);

  disegnaMani();
}

function disegnaMani() {

  for (let i = 0; i < predizioni.length; i++) {
    const mano = predizioni[i];

   
    for (let j = 0; j < mano.landmarks.length; j++) {
      const [x, y, z] = mano.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(x, y, 8, 8);  
    }

 
    const dita = mano.annotations;
    stroke(255, 0, 0);
    strokeWeight(2);
    for (let chiave in dita) {
      const dito = dita[chiave];
      for (let k = 0; k < dito.length - 1; k++) {
        const [x1, y1] = dito[k];
        const [x2, y2] = dito[k + 1];
        line(x1, y1, x2, y2);
      }
    }

    
    if (mano.landmarks.length > 0) {
      const [xW, yW] = mano.landmarks[0];
      fill(0, 0, 255, 150);
      noStroke();
      ellipse(xW, yW, 20, 20);
    }
  }
}
