/* 
TODO:
[x] Make a placeholder API to call to get the (dummy) information
[x] Make it dynamically create the pages and items
[x] Make it so that clicking a channel or page or dm updates the current `content type` and `page id`
[x] Display the content in the content panel
[ ] Allow user to type/edit
[ ] Send data about changes and messages back to API
[ ] Add error handling to fail cleanly
*/


// ---------------------- Utils ----------------------

function timeAgo(date) {
    /* AI Generated timeAgo function */

    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

    const units = [
        { name: "year",   seconds: 60 * 60 * 24 * 365 },
        { name: "month",  seconds: 60 * 60 * 24 * 30 },
        { name: "week",   seconds: 60 * 60 * 24 * 7 },
        { name: "day",    seconds: 60 * 60 * 24 },
        { name: "hour",   seconds: 60 * 60 },
        { name: "minute", seconds: 60 },
        { name: "second", seconds: 1 }
    ];

    for (const unit of units) {
        const value = Math.floor(seconds / unit.seconds);

        if (value >= 1) {
            return `${value} ${unit.name}${value !== 1 ? "s" : ""}`;
        }
    }

    return "just now";
}



// ---------------------- Fullscreen ----------------------
const documentEl = document.documentElement;

function openFullscreen() {
    
    // Check if document can be fullscreened before requesting it
    documentEl.requestFullscreen();
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
            { "id": 123, "name": "lobby1" },
            { "id": 456, "name": "general2" },
            { "id": 789, "name": "research3" }
        ],
        "pages": [
            { "id": 123, "name": "start_here4" },
            { "id": 456, "name": "the_archive5" },
            { "id": 789, "name": "timeline6" }
        ],
        "dms": [
            { "username": "username_017", "last_seen": "5/13/26" },
            { "username": "username_028", "last_seen": "5/14/26" },
            { "username": "velcore1null9", "last_seen": "5/15/26" },
        ],
        "online": [
            { "username": "username_011", "last_seen": "5/13/26" },
            { "username": "username_022", "last_seen": "5/14/26" },
            { "username": "velcore1null3", "last_seen": "1/15/26" },
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

    url = apiBaseUrl + MessagesPath;
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
    pageTabContainer.onclick = () => updateContentPanel("channel", channel["id"]);

    let iconEl = document.createElement("div");
    iconEl.setAttribute("class", "page-icon");
    let nameEl = document.createElement("p");
    nameEl.setAttribute("class", "page-name");
    nameEl.textContent = channel["name"];
    let numberEl = document.createElement("p");
    numberEl.setAttribute("class", "page-number");

    pageTabContainer.append(iconEl, nameEl, numberEl);

    channelPages.push(pageTabContainer);
});


// Create the tabs for the note pages
let notePages = [];
basicData["pages"].forEach(note => {
    let pageTabContainer = document.createElement("div");
    pageTabContainer.setAttribute("data-note-id", note["id"]);
    pageTabContainer.className = "page";
    pageTabContainer.onclick = () => updateContentPanel("page", note["id"]);

    let iconEl = document.createElement("div");
    iconEl.setAttribute("class", "page-icon");
    let nameEl = document.createElement("p");
    nameEl.setAttribute("class", "page-name");
    nameEl.textContent = note["name"];
    let numberEl = document.createElement("p");
    numberEl.setAttribute("class", "page-number");

    pageTabContainer.append(iconEl, nameEl, numberEl);

    notePages.push(pageTabContainer);
});


// Create the tabs for the dm pages
let dmPages = [];
basicData["dms"].forEach(dm => {
    let pageTabContainer = document.createElement("div");
    pageTabContainer.setAttribute("data-dm-id", dm["id"]);
    pageTabContainer.className = "page";
    pageTabContainer.onclick = () => updateContentPanel("dm", dm["id"]);

    let iconEl = document.createElement("div");
    iconEl.setAttribute("class", "page-icon");
    let nameEl = document.createElement("p");
    nameEl.setAttribute("class", "page-name");
    nameEl.textContent = dm["username"];
    let numberEl = document.createElement("p");
    numberEl.setAttribute("class", "page-number");

    pageTabContainer.append(iconEl, nameEl, numberEl);

    dmPages.push(pageTabContainer);
});


// Create the tabs for the online players
let onlinePages = [];
basicData["online"].forEach(user => {
    let pageTabContainer = document.createElement("div");
    pageTabContainer.setAttribute("data-user-id", user["username"]);
    pageTabContainer.className = "page";

    let userEl = document.createElement("div");
    userEl.setAttribute("class", "user");
    let iconEl = document.createElement("div")
    iconEl.setAttribute("class", "page-icon");
    let nameEl = document.createElement("p")
    let lastSeenEl = document.createElement("p")
    lastSeenEl.setAttribute("class", "user-last-seen");
    
    let lastSeenText = timeAgo(new Date(user["last_seen"]));
    nameEl.textContent = user["username"];
    lastSeenEl.textContent = lastSeenText;

    userEl.append(iconEl, nameEl);
    pageTabContainer.append(userEl, lastSeenEl);

    onlinePages.push(pageTabContainer);
});

// Remove the placeholder elements (remove placeholders, keep new page tabs)
let placeholderChannelPages = document.querySelectorAll(".placeholder-page");
placeholderChannelPages.forEach(element => {
    element.remove();
});

// Insert them into DOM
const navPanel = document.getElementById("nav-panel").querySelector(".pages-selector");
const pagesPanel = document.getElementById("pages-panel").querySelector(".pages-selector");
const dmsPanel = document.getElementById("dms-panel").querySelector(".pages-selector");
const usersPanel = document.getElementById("users-panel").querySelector(".pages-selector");

channelPages.forEach(el => {
    navPanel.appendChild(el);
});
notePages.forEach(el => {
    pagesPanel.insertBefore(el, pagesPanel.querySelector(".new-page"));
});
dmPages.forEach(el => {
    dmsPanel.insertBefore(el, dmsPanel.querySelector(".new-page"));
});
onlinePages.forEach(el => {
    usersPanel.appendChild(el);
});



// ---------------------- Content Panel ----------------------
let contentCurrentContentType = "page";
let contentCurrentContentID   = "123";

function updateContentPanel(contentType, contentID) {
    contentCurrentContentType = contentType;
    contentCurrentContentID = contentID;
    
    results = requestMessages(contentCurrentContentID);

    results = {
        "id": "123",
        "name": "start_here!",
        "creation_date": "Sat Sep 13 275760 00:00:00",
        "author": "velcore1null",
        "messages": [
            {
                "message_content": "hello world 1",
                "user_id": 123,
                "username": "velcore1null",
                "time": "Sat Sep 13 275760 00:00:00"
            },
            {
                "message_content": "hello world 2",
                "user_id": 123,
                "username": "username_017",
                "time": "Sat Sep 13 275760 00:00:10"
            },
            {
                "message_content": "hello world 3",
                "user_id": 123,
                "username": "username_017",
                "time": "Sat Sep 13 275760 00:00:20"
            }
        ]
    };

    let contentPanelEl = document.getElementById("content-panel");
    let nameEl = document.getElementById("content-name-field");
    let dateEl = document.getElementById("content-date-field");
    let authorEl = document.getElementById("content-author-field");
    let contentEl = document.getElementById("content");

    nameEl.textContent = results["name"];
    dateEl.textContent = results["creation_date"];
    authorEl.textContent = results["author"];


    // AI GENERATED START
    contentEl.innerHTML = "";

    if (contentCurrentContentType === "channel" || contentCurrentContentType === "dm") {
        // Display messages grouped by sender
        let currentGroup = null;
        let currentUsername = null;

        results["messages"].forEach(message => {
            // Check if we need to start a new group
            if (message["username"] !== currentUsername) {
                currentUsername = message["username"];
                currentGroup = document.createElement("div");
                currentGroup.className = "message-group";
                
                let senderEl = document.createElement("p");
                senderEl.className = "message-group-sender";
                
                // Extract date from the time string (e.g., "Sat Sep 13" from "Sat Sep 13 275760 00:00:00")
                let timeParts = message["time"].split(" ");
                let dateStr = timeParts.slice(0, 3).join(" ");
                
                senderEl.textContent = `${message["username"]} | ${dateStr}`;
                
                currentGroup.appendChild(senderEl);
                contentEl.appendChild(currentGroup);
            }

            // Add message to current group
            let messageEl = document.createElement("div");
            messageEl.className = "message";
            
            let contentMessageEl = document.createElement("p");
            contentMessageEl.className = "message-content";
            contentMessageEl.textContent = message["message_content"];
            
            let timeEl = document.createElement("p");
            timeEl.className = "message-time";
            timeEl.textContent = message["time"];
            
            // messageEl.append(contentMessageEl, timeEl);
            messageEl.append(contentMessageEl);
            currentGroup.appendChild(messageEl);
        });
    } else if (contentCurrentContentType === "page") {
        // Display page content
        let pageContentEl = document.createElement("p");
        pageContentEl.className = "page-content";
        pageContentEl.textContent = results["content"];
        contentEl.appendChild(pageContentEl);
    }
    // AI GENERATED END
}