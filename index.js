const speak_btn = document.querySelector(".speak");
const searchForm = document.querySelector(".search-form");
const searchFormInput = searchForm.querySelector("input");

// For checking if the browser supports speech recoginition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if it doesnt it will try by adding a webkit prefix

if(SpeechRecognition)
{
    console.log("Your Browser supports speech Recoginition");
    var recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    speak_btn.addEventListener("click", ()=>{
        if(speak_btn.src==="http://127.0.0.1:5500/images/mic_symbol.svg")
        {
            // Start speech recognition
            recognition.start();
        } 
        else
        {
            // Stop speech recognition
            recognition.stop();
        } 

        recognition.addEventListener("start" , startSpeechRecognition);
        function startSpeechRecognition()
        {
            searchFormInput.focus();
            speak_btn.src = "./images/cancel_mute.svg" ;
            console.log("Speech Recoginition Active");
        }
        recognition.addEventListener("end" , endSpeechRecognition);
        function endSpeechRecognition()
        {
            searchFormInput.focus();
            speak_btn.src = "./images/mic_symbol.svg";
            console.log("Speech Recoginition Disconnected");
        }
        recognition.addEventListener("result" , handleResult);
        function handleResult(event)
        {
            const currentResultIndex = event.resultIndex;
            const transcript = event.results[currentResultIndex][0].transcript;

            if(transcript.toLowerCase().trim()==="stop recording")
            {
                recognition.stop();
            }
            else
            {
                if(transcript.toLowerCase().trim()==="reset input" || transcript.toLowerCase().trim()===" reset input")
                {
                    searchFormInput.value = "";
                }
                else
                {
                    searchFormInput.value = transcript;
                }
            }
        }
    })
    
}
else
{
    console.log("Your Browser doesn't supports speech Recoginition");
}