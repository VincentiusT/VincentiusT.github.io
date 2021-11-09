

function showDiv(id) {
    document.getElementById(id).style.display = "block";
}
 
function hideDiv(id) {
    document.getElementById(id).style.display = "none";
}

function hideAll(){
    document.getElementById("bounceballDiv").style.display = "none";
    document.getElementById("24Div").style.display = "none";
    document.getElementById("hopeDiv").style.display = "none";
    document.getElementById("argeliaDiv").style.display = "none";
    document.getElementById("dandelionDiv").style.display = "none";
    document.getElementById("shadowDiv").style.display = "none";
    document.getElementById("covidDiv").style.display = "none";
    document.getElementById("meliorateDiv").style.display = "none";
}

 var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n, id, dotid) {
  showSlides(slideIndex += n, id, dotid);
}

// Thumbnail image controls
function currentSlide(n, id, dotid) {
  showSlides(slideIndex = n, id, dotid);
}

function showSlides(n, id, dotid) {
  var i;
  var slides = document.getElementsByClassName(id);
  var dots = document.getElementsByClassName(dotid);
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}