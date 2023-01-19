const url = 'https://dairy-ext.ru';

setTimeout(() => {
    const diaryButton = document.querySelectorAll('.ux-desktop-shortcut')[3]
    diaryButton.addEventListener('click', createButton)
}, 100)

const createButton = () => {
    setTimeout(() => {
        const iframe = document.querySelectorAll('iframe')[1]
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const previousIcon = iframeDoc.querySelector('.control-panel')
        previousIcon.insertAdjacentHTML('beforeend', `
        <button class="ux-desktop-button" id="Посмотреть оценки как человек">Посмотреть оценки как человек v1.0</button>
        `)
        const tableIcon = iframeDoc.querySelector('.ux-desktop-button')
        const userLink = iframeDoc.querySelectorAll('.dropdown-menu')[1]

        tableIcon.addEventListener('click', () => getTable(userLink.querySelector('a').href, document.cookie))
    }, 1000)
}

async function getTable(href, cookie) {
    fetch(`${url}/table`, {
        method: 'POST', 
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            "link": href,
            "cookie": cookie
        })
    })
    .then(res => res.json())
    .then(json => displayTable(json.html))
}

function displayTable(html) { 
    const styles = `
        position: fixed;
        z-index: 1000000;
        background: white;
        max-width: 80vw;
        max-height: 80vh;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        box-shadow: 0 0 1000px rgba(129, 129, 129, 0.488);
        padding: 10px;
    `;

    const modal =  document.createElement('div');

    modal.innerHTML = `
        <div id="modal" style="${styles}">
            <button id="closeButton" style="
                position: absolute; 
                right: -30px; 
                top: -30px; 
                font-weight: 500; 
                font-size: 32px;
                background: transparent;
                outline: none;
                border: none;
            ">
                X
            </button>
            ${html}
            <iframe width="560" height="315" src="https://www.youtube.com/embed/uVPoGMu3LQo?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;" allowfullscreen></iframe>
        </div>
    `;

    document.body.appendChild(modal);

    closeButton?.addEventListener("click", () => {
        modal.remove();
    });
}