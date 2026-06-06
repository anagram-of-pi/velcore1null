/* 
TODO:
[ ] Make a placeholder API to call to get the (dummy) information
[ ] Make it dynamically create the pages and items
[ ] Make it so that clicking a channel or page or dm updates the current `content type` and `page id`
[ ] Display the content in the content panel
[ ] Send data about changes and messages back to API
[ ] Add error handling to fail cleanly
*/

const { createElement } = require("react");


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



// ---------------------- API ----------------------
const apiBaseUrl = "www.example.com/api/";

function callApi(url, arguments) {
    return null;
}

function requestBasicData() {
    const basicDataPath = "/example_data/";

    url = apiBaseUrl + basicDataPath;
    args = {};
    
    let results = callApi(url, args);
    
    // Overwrite with dummy data
    results = {
        "channels": [
            { "id": 123, "name": "lobby" },
            { "id": 456, "name": "general" },
            { "id": 789, "name": "research" }
        ],
        "pages": [
            { "id": 123, "name": "start_here" },
            { "id": 456, "name": "the_archive" },
            { "id": 789, "name": "timeline" }
        ],
        "dms": [
            { "username": "username_01", "last_seen": "5/13/26" },
            { "username": "username_02", "last_seen": "5/14/26" },
            { "username": "velcore1null", "last_seen": "5/15/26" },
        ],
        "online": [
            { "username": "username_01", "last_seen": "5/13/26" },
            { "username": "username_02", "last_seen": "5/14/26" },
            { "username": "velcore1null", "last_seen": "5/15/26" },
        ]
    };

    return results;
}

function requestPageContent(page_id) {
    const pageContentPath = "/example_page/";

    url = apiBaseUrl + pageContentPath;
    args = "";

    results = callApi(url, args);

    // Overwrite with dummy data
    results = {
        "id": "123",
        "name": "start_here",
        "creation_date": "Sat Sep 13 275760 00:00:00",
        "author": "velcore1null",
        "content": "Lorem ipsum dolor sit amet"
    };

    return results;
}

function requestMessages(page_id) {
    const MessagesPath = "/example_channel/";

    url = apiBaseUrl + pageContentPath;
    args = "";

    results = callApi(url, args);

    // Overwrite with dummy data
    results = {
        "id": "123",
        "name": "start_here",
        "creation_date": "Sat Sep 13 275760 00:00:00",
        "author": "velcore1null",
        "messages": [
            {
                "message_content": "hello world",
                "user_id": 123,
                "time": "Sat Sep 13 275760 00:00:00"
            },
            {
                "message_content": "hello world 2",
                "user_id": 123,
                "time": "Sat Sep 13 275760 00:00:10"
            }
        ]
    };

    return results;
}



// ---------------------- Dynamic Content ----------------------


// Call api to get the basic data
let basicData = requestBasicData();

// Prepare the page tab elements
/* Format:
<div .page>
    <div .page-icon></div .page-icon>
    <div .page-name>
        [page-name]
    </div .page-name>
    <div .page-number></div .page-number>
</div .page>
*/

// Create the tabs for the channel pages
let channelPages = [];
basicData["channels"].forEach(channel => {
    let pageTabContainer = document.createElement("div");
    pageTabContainer.setAttribute("data-channel-id", channel["id"]);
    pageTabContainer.className = "page";

    let icon = document.createElement("div").setAttribute("class", "page-icon");
    let name = document.createElement("p").setAttribute("class", "page-name");
    let number = document.createElement("p").setAttribute("class", "page-number");
    name.textContent = channel["name"];

    pageTabContainer.append(icon, name, number);

    channelPages.append(pageTabContainer);
});


// Create the tabs for the note pages
let notePages = [];
basicData["channels"].forEach(note => {
    let pageTabContainer = document.createElement("div");
    pageTabContainer.setAttribute("data-channel-id", note["id"]);
    pageTabContainer.className = "page";

    let icon = document.createElement("div").setAttribute("class", "page-icon");
    let name = document.createElement("p").setAttribute("class", "page-name");
    let number = document.createElement("p").setAttribute("class", "page-number");
    name.textContent = note["name"];

    pageTabContainer.append(icon, name, number);

    notePages.append(pageTabContainer);
});


// Create the tabs for the dm pages
let dmPages = [];
basicData["dms"].forEach(dm => {
    let pageTabContainer = document.createElement("div");
    pageTabContainer.setAttribute("data-dm-id", dm["id"]);
    pageTabContainer.className = "page";

    let icon = document.createElement("div").setAttribute("class", "page-icon");
    let name = document.createElement("p").setAttribute("class", "page-name");
    let number = document.createElement("p").setAttribute("class", "page-number");
    name.textContent = dm["name"];

    pageTabContainer.append(icon, name, number);

    dmPages.append(pageTabContainer);
});

// Remove the placeholder elements (remove placeholders, keeping new page tabs)


// Insert them into DOM




