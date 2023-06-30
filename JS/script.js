// Get the jumbotron element
var jumbotron = document.querySelector(".jumbotron");

// Define the color stops
var colorStops = ["#ff0000", "#00ff00", "#0000ff"];

// Function to generate the gradient background
function generateGradientBackground() {
  // Generate a random angle for the gradient
  var angle = Math.floor(Math.random() * 360);

  // Generate the CSS gradient string
  var gradient = "linear-gradient(" + angle + "deg, ";

  // Add color stops to the gradient
  for (var i = 0; i < colorStops.length; i++) {
    gradient += colorStops[i];

    if (i !== colorStops.length - 1) {
      gradient += ", ";
    }
  }

  gradient += ")";

  // Apply the gradient as the background
  jumbotron.style.backgroundImage = gradient;
}

// Call the function to generate the initial gradient background
generateGradientBackground();


document.addEventListener('mousemove', function(e) {
  var jumbotron = document.querySelector('.jumbotron');
  var rect = jumbotron.getBoundingClientRect();
  var mouseX = e.clientX - rect.left;
  var mouseY = e.clientY - rect.top;
  var offsetX = rect.width / 2 - mouseX;
  var offsetY = rect.height / 2 - mouseY;
  jumbotron.style.setProperty('--mouse-x', offsetX);
  jumbotron.style.setProperty('--mouse-y', offsetY);
});

