
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




// Open Overlay Function
function openOverlay() {
    document.getElementById('overlay').style.display = 'flex';
}

// Close Overlay Function
function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}

// Handle Mood Selection
function handleMoodSelection(mood) {
    const chatBox = document.getElementById('chat-box');

    chatBox.innerHTML += `<div class="user-message"> ✨I'm ready!✨ <div>`;
    
    // First agent response after 0.5s
    setTimeout(() => {
        chatBox.innerHTML += `<div class="agent-message">Got it! Let me get a poem for you...</div>`;

        // Second agent response after another 1s (total 1.5s from user input)
        setTimeout(() => {
            chatBox.innerHTML += `<div class="agent-message">Done 🤗 Here's your poem: <a href='#' onclick='openOverlay()'>poem.txt</a></div>`;
        }, 1500);
        
    }, 1000); // 1s delay before first agent message
    // Fetch a poem based on the mood (we just fetch a random poem for now)
    getRandomPoem();
}

// Event Listener for Mood Buttons
document.getElementById('ready').addEventListener('click', () => handleMoodSelection('ready'));

function generateAnotherPoem() {
    //close overlay window
    document.getElementById('overlay').style.display = 'none';

    const chatBox = document.getElementById('chat-box');
    
    // First agent response after 0.5s
    setTimeout(() => {
        chatBox.innerHTML += `<div class="agent-message">Another poem? You got it! Just give me a few seconds...</div>`;

        // Second agent response after another 1s (total 1.5s from user input)
        setTimeout(() => {
            chatBox.innerHTML += `<div class="agent-message">Here you go: <a href='#' onclick='openOverlay()'>poem.txt</a></div>`;
        }, 1500);
        
    }, 1000);

    getRandomPoem();

}