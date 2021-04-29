$(function(){
    chrome.storage.sync.get(['limit','reset'],function(budget){
        $('#limit').val(budget.limit);
        $('#reset').val(budget.reset);
    });
    
    $('#save').click(function(){
        var reset = $('#reset').val();
        var limit = $('#limit').val();
        if (limit){
            chrome.storage.sync.set({'limit' : limit},function(){
                var notiifOptions={
                    type : "basic",
                    iconUrl:"icon48.png",
                    title: "Changes Saved Successfully",
                    message:"Changes has been made to your settings"
                };
                chrome.notifications.create('limitNotif', notiifOptions);
                
            });
        }
        if (reset){
            chrome.storage.sync.set({'total':reset},function(){
                var notiifOptions={
                    type : "basic",
                    iconUrl:"icon48.png",
                    title: "Changes Saved Successfully",
                    message:"Changes has been made to your settings"
                };
                chrome.notifications.create('saveNotif', notiifOptions);
                
            });
        }
    });
});