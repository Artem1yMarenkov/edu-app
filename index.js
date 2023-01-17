const url = 'http://185.225.35.214'
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
    let res = await fetch(`${url}/table`, {
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
    document.body.insertAdjacentHTML('afterbegin', `
        <div style="position: absolute; background: white; max-width: 80vw; max-height: 80vh; margin: auto; top: 0; left: 0; bottom: 0; right: 0;">
        ${html}
        </div>
    `)
}