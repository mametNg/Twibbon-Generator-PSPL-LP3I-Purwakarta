window.onload = function () {
  'use strict';
  let Cropper = window.Cropper;
  let URL = window.URL || window.webkitURL;
  let image = document.querySelector("#imgcroped");
  let reboot = document.getElementById('go-create-twibbon');
  let inputFile = document.getElementById('twibbon-file');
  let borderFrame = document.getElementById("twibbon-frame-technology");
  let technology = document.getElementById("twibbon-technology");
  let business = document.getElementById("twibbon-business");
  let finance = document.getElementById("twibbon-finance");
  let rotateL = document.getElementById('rotate-twb-l');
  let rotateR = document.getElementById('rotate-twb-r');
  let scale = document.getElementById('scale-twb');
  let save = document.getElementById('go-save-twibbon');
  let download = document.getElementById('save-download');
  let download2 = document.getElementById('copyed-caption');
  let fullname = document.getElementById('fullname');
  let school = document.getElementById('school');
  let motivation = document.getElementById('motivation');
  let caption = document.getElementById('my-caption');
  let fullnames = "*FULL NAME*";
  let major = "*MAJOR*";
  let motivations = "*YOUR MOTIVATION*";
  let sch = "*FROM SCHOOL*";
  let imgData;
  let options = {

    dragMode: 'move',
    aspectRatio: 16 / 16,
    autoCropArea: 1,
    restore: false,
    guides: false,
    center: false,
    highlight: false,
    cropBoxMovable: false,
    cropBoxResizable: false,
    toggleDragModeOnDblclick: false,
    ready: function (e) {
      console.log(e.type);
      let added = document.getElementsByClassName('cropper-view-box')[0];
      added.innerHTML = "";
      added.setAttribute('style', "background: url('"+borderFrame.src+"'); background-size: cover;");
    },
    cropstart: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropmove: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropend: function (e) {
      console.log(e.type, e.detail.action);
    },
    zoom: function (e) {
      console.log(e.type, e.detail.ratio);
    },
    crop: function (e) {
      let data = e.detail;
      console.log(e);
    },
  };

  let cropper = new Cropper(image, options);
  let originalImageURL = image.src;

  inputFile.onchange = function() {
    let files = this.files;
    let file = files[0];
    image.src = URL.createObjectURL(file);

    if (cropper) {
      cropper.destroy();
    }

    cropper = new Cropper(image, options);
  }

  reboot.onclick = function() {
    if (cropper) {
      cropper.destroy();
    }

    cropper = new Cropper(image, options);
  }

  technology.onclick = function() {
    let myFrame = document.getElementById('twibbon-frame-technology');
    borderFrame.src = myFrame.src;
    major = "Computer Information";
    caption.value = myCaption(fullnames, major, motivations, sch);
  }

  business.onclick = function() {
    let myFrame = document.getElementById('twibbon-frame-business');
    borderFrame.src = myFrame.src;
    major = "Office Management";
    caption.value = myCaption(fullnames, major, motivations, sch);
  }

  finance.onclick = function() {
    let myFrame = document.getElementById('twibbon-frame-finance');
    borderFrame.src = myFrame.src;
    major = "Computerized Accounting";
    caption.value = myCaption(fullnames, major, motivations, sch);
  }

  rotateL.onclick = function() {

    cropper.rotate(-90);
  }

  rotateR.onclick = function() {

    cropper.rotate(90);
  }

  scale.onclick = function() {
    let dataScale = this.getAttribute('data-status');

    if (this.getAttribute('data-status') == "true") {
      cropper.scale(-1, 1);
      this.setAttribute('data-status', false);
    } else {
      cropper.scale(1, 1);
      this.setAttribute('data-status', true);
    }
  }

  save.onclick = function() {

    let finish = cropper.getCroppedCanvas({
      width: 1500,
      height: 1500,
      minWidth: 1000,
      minHeight: 1000,
      maxWidth: 1500,
      maxHeight: 1500,
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high',
    });

    let canvas = document.getElementById("canv-twibbon");
    let context = canvas.getContext("2d");

    let width = borderFrame.width;
    let height = borderFrame.height;
    canvas.width = 1500;
    canvas.height = 1500;

    context.drawImage(finish, 0, 1, 1500, 1500);
    let image1 = context.getImageData(0, 0, 1500, 1500);
    let imageData1 = image1.data;
    context.drawImage(borderFrame, 0, 0, 1500, 1500);
    let image2 = context.getImageData(0, 0, 1500, 1500);
    let imageData2 = image2.data;

    let pngUrl = imgData = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");

    document.getElementById('my-result').innerHTML = '<img src="'+pngUrl+'" class="card-img-top">';
  }

  download.onclick = function() {  

    let allow = true;
    allow = filtName(`#fullname`, `#msg-fullname`);
    allow = filtName(`#school`, `#msg-school`);
    allow = filtName(`#motivation`, `#msg-motivation`);
    if (!allow) return false;

    const fileNameToSaveAs = fullnames +"-"+ major + ".png";
    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = imgData;
    downloadLink.click();
  }

  download2.onclick = function() {

    let allow = true;
    allow = filtName(`#fullname`, `#msg-fullname`);
    allow = filtName(`#school`, `#msg-school`);
    allow = filtName(`#motivation`, `#msg-motivation`);
    if (!allow) return false;

    const fileNameToSaveAs = fullnames +"-"+ major + ".png";
    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = imgData;
    downloadLink.click();
  }

  fullname.onkeyup = function() {
    let allow = filtName(`#${this.id}`, `#msg-${this.id}`);

    if (!allow) return false;

    fullnames = this.value.trim();
    caption.value = myCaption(fullnames, major, motivations,);
  }

  school.onkeyup = function() {
    let allow = filtName(`#${this.id}`, `#msg-${this.id}`);

    if (!allow) return false;

    sch = this.value.trim();
    caption.value = myCaption(fullnames, major, motivations, sch);
  }

  motivation.onkeyup = function() {
    let allow = filtMsg(`#${this.id}`, `#msg-${this.id}`);

    if (!allow) return false;

    motivations = this.value.trim();
    caption.value = myCaption(fullnames, major, motivations, sch);
  }
}