$("#formulario").submit(function(event) {

  
    var vForm = $(this);
    
  
    if (vForm[0].checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
	$( "#game" ).show( 2000 );
	$( "#formulario" ).hide( 2000 );
      event.preventDefault()
      event.stopPropagation()
    }
    
    
    vForm.addClass('was-validated');
    
 
});
function ShowHelloMessage() {
    var name = document.getElementById("input1");
    document.getElementById("name").innerHTML = "Hola " + name.value;
}
document.getElementById("shower").onclick = ShowHelloMessage;

var secretNumber = 0,
	numberOfGuesses = 0;

function writeMessage(elementId, message, appendMessage) {
	var elemToUpdate = document.getElementById(elementId);
	if (appendMessage) {
		elemToUpdate.innerHTML = elemToUpdate.innerHTML + message;
	} else {
		elemToUpdate.innerHTML = message;
	}
};

function newGame() {
	secretNumber = Math.floor(Math.random() * 100) + 1;
	numberOfGuesses = 0;
	writeMessage('historyList', '');
}

function guessInRange(guess) {
	return (guess > 0 && guess < 101);
}

function userGuessed() {
	var userGuessed = document.getElementById('userGuess').value;
	var statusArea = document.getElementById('statusArea');
	var historyList = document.getElementById('historyList');
	if (userGuessed.length == 0 || ! guessInRange(userGuessed)) {
		
		writeMessage('statusArea', '<p>Por favor, ingresa un número entre 1 y 100 y hace click sobre ADIVINAR.</p>');
	} else if (userGuessed.indexOf('.') != -1) {
		writeMessage('statusArea', '<p>Por favor ingresa un numero ENTERO POSITIVO ENTRE 1 y 100, luego, hacer click en ADIVINAR</p>');
	} else {
		numberOfGuesses++;

		if (userGuessed == secretNumber) {
			// usuario acierta
			writeMessage('statusArea', '<p>Muy bien! Tardaste ' + numberOfGuesses +' intentos en adivinar. El número que estaba pensando era: ' + secretNumber + '. Jugamos otra vez?</p>');
			$( '#historyNumbers' ).hide();
			newGame();
		} else if (userGuessed < secretNumber) {
			// usuario puso menor que numero secreto
			writeMessage('statusArea', '<p>El numero que estoy pensando es mas grande que ' + userGuessed + ', tenes otro intento...</p>');
			writeMessage('historyList', '<li>' + userGuessed +' (muy bajo)</li>', true);
		} else {
			// usuario puso mayor que numero secreto
			writeMessage('statusArea', '<p>El numero que estoy pensando es mas chico que ' + userGuessed + ', tenes otro intento...</p>');
			writeMessage('historyList', '<li>' + userGuessed + ' (muy alto)</li>', true);
		}
	}

	document.getElementById('userGuess').value = '';	
}

window.onload = function() {
	newGame();
	document.getElementById('buttonArea').addEventListener('click', userGuessed);
};