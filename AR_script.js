var modalviewer = document.getElementById("modal-viewer");
var carviewer1 = document.getElementById("car-viewer-1");
var carviewer2 = document.getElementById("car-viewer-2");

var models = {
  trophy: {
    src:
      "https://echoar-storage.s3.us-east-2.amazonaws.com/odd-field-8941/924e78c5-81f3-400f-ad3e-3e6d981ce316.glb",
    iosSrc:
      "https://echoar-storage.s3.us-east-2.amazonaws.com/odd-field-8941/39acab40-d599-4424-9b41-db55de832b38.usdz",
    alt: "Trophy",
  },
  lost: {
    src:
      "https://echoar-storage.s3.us-east-2.amazonaws.com/odd-field-8941/4fd712e6-3091-4b1b-ada7-7dae7115a141.glb",
    iosSrc:
      "https://echoar-storage.s3.us-east-2.amazonaws.com/odd-field-8941/b30ea3d4-b459-4488-9e6d-25ba1b5eb970.usdz",
    alt: "Sad Worm",
  },
  bluecar: {
    src:
      "https://echoar-storage.s3.us-east-2.amazonaws.com/red-bird-8791/925dc169-9589-40d2-aed5-8c9f4aa52399.glb",
    iosSrc:
      "https://echoar-storage.s3.us-east-2.amazonaws.com/red-bird-8791/da93d8d8-f497-4318-8c89-487edb1cc60d.usdz",
    alt: "Ford Fusion Sport",
  },
  redcar: {
    src:
      "https://echoar-storage.s3.us-east-2.amazonaws.com/red-bird-8791/0aa6376b-e50d-4760-8918-4af51063c9c7.glb",
    iosSrc:
      "https://echoar-storage.s3.us-east-2.amazonaws.com/red-bird-8791/362afac5-0499-4492-b524-d4b9144c14e6.usdz",
    alt: "BMW+M5",
  },
};

function switchModel(model, viewer_element) {
  //Set ios source
  viewer_element.setAttribute("src", models[model].src);

  //Set ios source
  viewer_element.setAttribute("ios-src", models[model].iosSrc);

  //Set alt text
  viewer_element.setAttribute("alt", models[model].alt);
}

//Default to car
switchModel("redcar", carviewer1);
switchModel("bluecar", carviewer2)

//Random function
var model_keys = Object.keys(models)