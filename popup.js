window.addEventListener('DOMContentLoaded', (event) => {
    let interval = null;
    // #stockprice .price

    const btn = document.getElementById('notifyBtn');
    btn.addEventListener('click', event => {
        const target = document.getElementById('targetInput').value;
        const value = document.getElementById('valueInput').value;
        const comparison = document.getElementById('comparisonInput').value;

        chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {
                type: 'get-value-popup',
                data: {
                    target,
                    value,
                    comparison
                }
            });
        });
    });


    const btnoff = document.getElementById('offNotifyBtn');
    btnoff.addEventListener('click', event => {
        chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {
                type: 'off-notify',
            });
        });
    });
});