
async function getRandomPoem(){

    try{
        const response = await fetch("https://poetrydb.org/random");    //API endpoint to fetch random poem
        const poemData = await response.json(); //convert response into json
        
        const poemLineCt = poemData[0].linecount;
        const poemLines = poemData[0].lines;
        const poemText = poemLines.join('\n'); // Extract the poem's lines and join them with a line break
        const title = poemData[0].title; // Get the title of the poem
        const author = poemData[0].author;

        //display poems =<20 lines
        if(poemLineCt > 20){
            return getRandomPoem();
        }

        document.getElementById('poem-title').innerText = title; // Display the title in the element with id 'poem-title'
        document.getElementById('poem-author').innerText = author; // Display the title in the element with id 'poem-title'
        document.getElementById('poem-text').innerText = poemText; // Display the poem's text in the element with id 'poem-text'

        
    } catch(error){ //log error (if any) to console
        console.error("Error fetching poetry: ", error);
        document.getElementById("poem-text").innerText = "Error fetching poetry";
    }
}

window.onload = (event) => {
    var welcomeMessage = "Hello 👋🏽 Welcome to the poem generator! Let me know when you're ready 😎";   //this is the first message displayed
    delayBotMssg(welcomeMessage);
}


//add 1500ms delay to all bot mssgs
function delayBotMssg(mssg){

    const chatBox = document.getElementById('chat-box');

    setTimeout(() => {
        chatBox.innerHTML +=`<div class="agent-message">`+mssg+`</div>`;
    }, 1500);
}


// Open Overlay Function
function openOverlay() {
    document.getElementById('overlay').style.display = 'flex';
}

// Close Overlay Function
function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}


// Handle Mood Selection
function handleMoodSelection() {
    const chatBox = document.getElementById('chat-box');
    var mssg = "testing";

    chatBox.innerHTML += `<div class="user-message"> ✨I'm ready!✨ <div>`;

            mssg = "Got it! Let me get a poem for you...";
            delayBotMssg(mssg);

            //additional delay so that mssgs do not appear at the same time
            setTimeout(() => {
                mssg = "Done 🤗 Here's your poem: <a href='#' onclick='openOverlay()'>poem.txt</a>";
                delayBotMssg(mssg);
            }, 1500);

    getRandomPoem();
}

function generateAnotherPoem() {
    //close overlay window
    document.getElementById('overlay').style.display = 'none';

    const chatBox = document.getElementById('chat-box');
    
    //"send" user response
    chatBox.innerHTML += `<div class="user-message"> Give me another poem <div>`;

    //store bot response
    var mssg_another_poem = "Another poem? You got it! Just give me a moment...";
    delayBotMssg(mssg_another_poem);

    //additional delay so messages appear consecutively
    setTimeout(() => {
        mssg_another_poem = "Here you go: <a href='#' onclick='openOverlay()'>poem.txt</a>";
        delayBotMssg(mssg_another_poem);
    }, 1500);

    getRandomPoem();
}

function wordMatch(){
    //send user response
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div class="user-message"> Match with a word <div>`;

    //bot response, prompt user input (just one word), use findWord function
    var botMssg = "Ok! let's find a poem that matches whatever word you want. Please input your word:"
    delayBotMssg(botMssg);

    
                    // Create input field
                    let inputField = document.createElement("input");
                    inputField.setAttribute("type", "text");
                    inputField.setAttribute("id", "word-input");
                    inputField.setAttribute("placeholder", "Enter a word...");
                    
                    // Create submit button
                    let submitButton = document.createElement("button");
                    submitButton.setAttribute("id", "submit-word");
                    submitButton.textContent = "Find Poem";

                    
    setTimeout(() => {           
                // Append to chat UI
                chatBox.appendChild(inputField);
                chatBox.appendChild(submitButton);
    }, 1500);


    submitButton.addEventListener("click", function() {
        let userInput = inputField.value.trim();
        if (userInput) {
            findWord(userInput);  // Call function to find poem
            inputField.remove();  // Remove input field after use
            submitButton.remove(); // Remove button after use
        } else {
            alert("Please enter a word!");  // Prevent empty input
        }
    });

}

//in-progress
function findWord(userInput){
    //use poem API to fetch poems
    console.log("this is the findWord function");
    
    //search poem db to find match with user input word (in progress)
    fetch('https://poetrydb.org/random')
    .then(response => response.json())
    .then(data => {
        // Loop through the poems directly in the fetched data
        data.forEach(poem => {
            console.log(poem.title); // Example: access poem title
            // console.log(poem.lines);  // Example: access poem lines
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    //return poem with word match, bolded

}


// Event Listener for Ready Button
document.getElementById('ready').addEventListener('click', () => handleMoodSelection());

// Event Listener for Ready Button
document.getElementById('word-match').addEventListener('click', () => wordMatch());