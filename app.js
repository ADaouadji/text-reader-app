const textDisplay = document.querySelector('#text');
const speedBtn = document.querySelector('#speed');
const readBtn = document.querySelector('.read');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
let currentChar;

readBtn.addEventListener('click', function () { 
    readText(textDisplay.value);
 });

 //pause btn
pauseBtn.addEventListener('click', pauseText);

//stop btn
stopBtn.addEventListener('click', stopText);

//speed btn
speedBtn.addEventListener('input', function(){
    stopText();
    readText(utterance.text.substring(currentChar));
});


const utterance = new SpeechSynthesisUtterance();
utterance.addEventListener('end', function () {
    textDisplay.disabled = false;
});

utterance.addEventListener('boundary', function (e) { 
    currentChar = e.charIndex;
 });

 //readText Function
function readText(wordText) {
    if(speechSynthesis.paused && speechSynthesis.speaking){
        return speechSynthesis.resume();
    }

    if(speechSynthesis.speaking) return;

    utterance.text = wordText;
    utterance.rate = speedBtn.value || 1;
    textDisplay.disabled = true;
    speechSynthesis.speak(utterance);
};

//pauseText function
function pauseText() {
    if (speechSynthesis.speaking) speechSynthesis.pause();
};

//stoptext function
function stopText() {
    speechSynthesis.resume();
    speechSynthesis.cancel();
}