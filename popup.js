$(function(){
    chrome.storage.sync.get(['total','limit','reset'], function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
        $('#reset').text(budget.reset);
    });
    $('#spendAmount').click(function(){
        
        //above will show the previous total value to our popup
        chrome.storage.sync.get(['total','limit'], function(budget){ //get the already stored total
            var newTotal =0;
            //if total already exists 
            if (budget.total){
                newTotal +=parseInt(budget.total);//if it does exists we'll beadding with our newtotal
            }

            var amount = $('#amount').val();
            // newTotal will be updated with the amount
            if (amount){
                newTotal += parseInt(amount);
            }

            //now we'll set the total and update our UI
            chrome.storage.sync.set({'total': newTotal},function(){
                if (amount && newTotal >= budget.limit){
                    var notifOptions={
                        type : 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Limit Reached!',
                        message:"Uh oh! Looks like you've reached your limits!"
                    };
                    chrome.notifications.create('limitNotif', notifOptions);
                }
            });
            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});