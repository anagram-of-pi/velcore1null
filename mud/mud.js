/* 
TODO:
[ ] Make a placeholder API to call to get the (dummy) information
[ ] Make it dynamically create the pages and items
[ ] Make it so that clicking a channel or page or dm updates the current `content type` and `page id`
[ ] Display the content in the content panel
[ ] Send data about changes and messages back to API
*/


// ---------------------- Fullscreen ----------------------
const documentEl = document.documentElement;

function openFullscreen() {
  
    // Check if document can be fullscreened before requesting it
    documentEl.requestFullscreen();
    console.log("Requested fullscreen");
}

const fullscreenButtonEl = document.getElementById("fullscreen");

fullscreenButtonEl.onclick = () => {
    if (!document.fullscreenElement) {
        openFullscreen();
    }
    else {
        // Exit fullscreen if the method exists
        document.exitFullscreen?.();
    }
};