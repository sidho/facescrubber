var keywords = ["horoscope", "zodiac", "mindblowing", "mind blowing", "click here", "enter here", "click to", "or does it?", "never guess", "guess what", "guess which", "guess who", "read on", "reacts to", "react to", "heres why", "here is why", "why you", "why we", "why she", "why he", "why they", "make you", "the result", "the answer", "the reason", "something", "everyone should", "you should", "should never", "you need", "you never knew", "need to know", "want us to know", "want you to know", "should know", "we know", "is awesome", "faith in humanity", "will change your life", "dirty secret", "dirty little secret", "weird trick", "weird idea", "easy tricks to", "lifehacks", "lifehack", "life hack", "odd trick", "neat trick", "hate this trick", "weight loss", "lose weight", "burn fat", "want you to know", "dont know about", "dont even know about", "everyone is talking about", "signs youre", "signs you are", "unbelievable", "you wont believe", "definitely", "brilliant", "absolutely genius", "was shocking", "shocking", "shocked", "shock you", "inspired", "inspire you", "inspired", "inspiring", "incredible", "surprise you", "surprised us", "speechless", "leave you", "amazing", "amaze", "astonish", "astound", "blown away", "effortlessly", "incredible", "the truth", "reveals", "doing it wrong", "your whole life", "would you", "you might be", "what you think", "who you think", "where you think", "until the end", "this story", "happens next", "happened next", "what happens", "what happened", "hate him", "hate her", "take this quiz", "never guess", "never believe", "failed this", "epic fail", "creative ways", "interesting ways", "game changing", "game change", "this common", "these common", "that prove", "reveals", "this is how", "heres how", "here is how", "heres who", "here is who", "heres what", "here is what", "heres why", "here is why", "how to", "which one", "millenials", "our generation", "can you spot", "can you see", "actually?", "the one x every", "see which", "see what", "see who", "see when", "when you see", "see why", "see how", "actually feel", "are you?", "do you have?", "should be?", "should you", "you have to", "that prove", "what it is like", "what its like", "how its like", "how it is like", "signs youre", "than this", "this is what", "this is how", "this is why", "this is who", "this is where", "that should have", "try this", "new rule", "but after", "i want this", "ban this", "banned", "changed history", "in the world", "change the way", "cringe", "proves why", "reasons why", "blowing up", "got owned", "pwn", "now theyre", "seconds later?", "this guy", "this girl", "this dude", "this chick", "this man", "this woman", "but is", "shes in for", "hes in for", "what theyre in for", "priceless", "his response", "her response", "their response", "silenced them", "silenced him", "silenced her", "its genius", "i was confused", "and the rest", "his answer", "her answer", "these answers", "their answer", "one tweet", "first comment", "uh oh", "reasons why", "reasons for", "bring you to tears", "moments later", "fools you", "ruin you for life", "perfectly describe"]
var domainBlacklist = ["buzzfeed", "mashable", "upworthy", "motherjones", "uproxx", "distractify", "littlethings", "thechive", "viralnova", "huffingtonpost", "theblaze", "diply", "bzfd.it", "themindunleashed", "coolimagesforall", "eternalimagebuzz", "businessinsider", "mic.com", "firstslice", "salon", "dailycaller", "reshareworthy"]
var removedPosts = {};
var removedCount = 0;
function scrub(){
	console.log(removedCount);
	chrome.storage.sync.get([
        "facescrubber",
        "filterDomains",
        "removeLists",
        "removeCaps",
        "faceScrubberHardcore"
    ], function(items) {
        if (items.facescrubber) {
        	var posts = document.querySelectorAll("._5jmm, ._1ui8");
	        if (items.filterDomains) scrubDomains(posts);
	        if (items.faceScrubberHardcore) scrubHardcore(posts);
	        if (items.removeLists) scrubLists(posts);
	        if (items.removeCaps) scrubCaps(posts);
        	scrubFacebook(posts);
        }
    });
}

function scrubCaps(posts) {
	// Looks through the post titles and see if they have any all caps words, like 'SHOCKING'
	_.each(posts, function(post){
		var title = post.classList.contains("_5jmm") ? post.querySelector("._6m6") : post.querySelector(".vMid");
		if (title) {
			var titleText = title.querySelector("._1ui6") || title.querySelector("a");
		}
		if (titleText) {
			titleText = titleText.innerText;
			if (titleText.match(/[A-Z]{3,}/)) scrubPost(post, "words in caps");
		}
    });
}

function scrubDomains(posts) {
	// Removes all posts linking to a blacklisted website
	_.each(posts, function(post){
		// Looks for the url caption before looking through the anchor tag. This is to
		// check links using a url shortener like bit.ly
		var link =  post.querySelector("._6lz") ||
			post.querySelector("._1ui2") ||
			post.querySelector("._1ui6") ||
			post.querySelector("._6m6 a") ||
			post.querySelector(".vMid a");

		if (link) {
			var link = link.href ? link.href.toLowerCase() : link.innerText.toLowerCase();
			for (var i = 0; i < domainBlacklist.length; i++) {
				if (link.indexOf(domainBlacklist[i]) !== -1) {
        			scrubPost(post, "the blocked domain " + domainBlacklist[i]);
        			break;
				}
			}
		}
    });
}

function scrubFacebook(posts) {
	// Removes all posts with titles that contain the keyword
	_.each(posts, function(post){
		var title = post.classList.contains("_5jmm") ? post.querySelector("._6m6") : post.querySelector(".vMid");
		if (title) {
			var titleText = title.querySelector("._1ui6") || title.querySelector("a");
		}
		if (titleText && titleText.innerText) {
			// Removes all special characters and set text to lowercase
			titleText = titleText.innerText.replace(/[^a-zA-Z0-9? ]/g, "").toLowerCase();
			for (var i = 0; i < keywords.length; i++) {
				if (titleText.indexOf(keywords[i]) !== -1) {
        			scrubPost(post, 'the blocked word or phrase "' + keywords[i] + '"');
        			break;
				}
			}
		}
    });
}

function scrubHardcore(posts) {
	// Removes all posts with 'this' in the title
	_.each(posts, function(post){
		var title = post.classList.contains("_5jmm") ? post.querySelector("._6m6") : post.querySelector(".vMid");
		if (title && title.querySelector("a")) {
        	var titleText = title.querySelector("a").innerText.toLowerCase();
        	if (titleText.indexOf("this") !== -1) scrubPost(post, "hardcore mode");
		}
    });
}

function scrubLists(posts) {
	// Looks through the posts and see if they match the regex for a list
	_.each(posts, function(post){
		var title = post.classList.contains("_5jmm") ? post.querySelector("._6m6") : post.querySelector(".vMid");
		if (title && title.querySelector("a") && title.querySelector("a").innerText) {
			if (title.querySelector("a").innerText.match(/^[0-9]+\s[A-Za-z]+/)) scrubPost(post, "a detected list");
		}
    });
}

function scrubPost(post, reason) {
	var id = post.getAttribute("data-scrubbed-id");
	if (!id) {
		// Saves original html into removedPosts and scrubs it
		removedPosts[removedCount] = post.innerHTML;
		post.innerHTML = "<div class='scrubbed-post'>This post has been scrubbed due to " + reason + ". <span class='scrubbed-link' data-scrubbed-id='" + removedCount + "'>Click here to unscrub.</span></div>"

		// Saves an ID to the post's data-attributes, so the original can be found in removedPosts
		post.setAttribute("data-scrubbed-id", removedCount);
		removedCount++;

		// Binds the new link in the scrubbed post with the unScrub function
		post.querySelector('.scrubbed-link').addEventListener('click', unScrub);
	}
}

function unScrub() {
	// Recovers the saved html from the removedPosts object
	var id = event.target.getAttribute("data-scrubbed-id");
	event.target.parentElement.parentElement.innerHTML = removedPosts[id];
}

scrub();

// debounce the function so it's not running constantly
var scrollListener = _.debounce(scrub, 50);
document.addEventListener("scroll", scrollListener);

// When background script sends a changed: true message, clear out
// removedPosts, reset removedCount, and scrub once more.
chrome.runtime.onMessage.addListener(
	function(request) {
		if (request.changed === true) {
			removedPosts = {};
			removedCount = 0;
			scrub();
		}
	}
);
