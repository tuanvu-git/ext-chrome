console.log(document);
var interval = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
    if (message.type === 'get-value-popup') {

        const { data } = message;
        let { target, value, comparison } = data;

        clearInterval(interval);
        interval = setInterval(() => {

            const elementText = document.querySelector(target).innerText.replace(/[\.\,]/g, '');
            value = value.replace(/[\.\,]/g, '');
            let isSuitable = false;

            switch (+comparison) {
                case 0:
                    if (elementText === value) { // string or number
                        isSuitable = true;
                    }
                    break;
                case 1:
                    if (+elementText > +value) { // only number
                        isSuitable = true;
                    }
                    break;
                case -1:
                    if (+elementText < +value) { // only number
                        isSuitable = true;
                    }
                    break;

            }

            if (isSuitable) {
                chrome.runtime.sendMessage('', {
                    type: 'notification',
                    options: {
                        title: 'Chó Phụng',
                        message: 'Đến giờ rồi bán/Mua cố phiếu rồi kìa',
                        iconUrl: '/images/default-icon.jpg',
                        type: 'basic'
                    }
                });
            }
        }, 5000);
    }


    if (message.type === 'off-notify') {
        clearInterval(interval);
    }
});


chrome.runtime.sendMessage('', {
    type: 'notification',
    options: {
        title: 'Chó Phụng',
        message: 'Đến giờ rồi bán/Mua cố phiếu rồi kìa',
        iconUrl: '/images/default-icon.jpg',
        type: 'basic'
    }
});