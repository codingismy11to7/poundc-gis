messageText = ["gis x", "gis12 x", "gisx", "gis ", "gisx 12"]
searchText =  ["x", "x", "x", "", "x 12"]
indexResults = [0, 12, 0, 0, 0]

for (i in messageText) {
	val = getSearchText(messageText[i])
	if (val.txt === searchText[i])
	{
		console.log("passed: '" + val.txt + "' == '" + searchText[i] +"'")
	} 
	else
	{
		console.log("failed: '" + val.txt + "' != '" + searchText[i] + "'")
	}

	if (val.index == indexResults[i]) {
		console.log("passed")
	} 	
	else
	{
		console.log("index failed " + val.index)
	}
}


function getSearchTextAndIndex(messageText) {

	var gisTrigger = /^gis[\d+]*/
	var imageIndex = 0;
	match = gisTrigger.exec(messageText);
	// match is guaranteed to succeed, because trigger is 'gis'
	matchIndex = /[\d]+/.exec(match) //do we have an index?

	if (matchIndex != null)
	{
		// we have a valid index
		imageIndex = match[0].replace(/^gis/, '')
    	messageText = messageText.replace(gisTrigger, '')
    	messageText = messageText.substr(1)
		console.log("valid index: " + imageIndex)
	}
	else
	{	
		// no index!
		console.log("no index")
    	messageText = messageText.replace(/^gis/, '')
    	if (messageText.charAt(0) === ' ')
    	{
    		messageText = messageText.substr(1);
    	}
	}
	
	return {txt: messageText, index: imageIndex} ;
}