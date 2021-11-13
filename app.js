let sortDirection = false;
const nameHead = document.querySelector('.name-head');
const originHead = document.querySelector('.origin-head');
const userBox = document.querySelector('.name-data')
const openStyle = document.querySelector('.modal-overlay')
const closeButton = document.querySelector('.close-btn')

document.addEventListener('DOMContentLoaded', function () {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let personData = data
            loadTableData(personData)
            nameHead.addEventListener('click', function () {
                sortDataByName(personData)
                loadTableData(personData)
            })

        })

})

function renderPosts(e) {
    console.log(e.target)
}


function sortDataByName(personData) {
    personData.sort((a, b) => {
        let sa = a.name.toLowerCase();
        let sb = b.name.toLowerCase();
        if (sa < sb) {
            return -1;
        }
        if (sa > sb) {
            return 1
        }
        return 0;
    })
}

closeButton.addEventListener('click', function() {
    openStyle.classList.remove("open-modal");

})

function loadTableData(personData) {
    const tableBody = document.getElementById('table-data');
    let dataHtml = '';

    for (let i of personData) {
        dataHtml += `<tr><td id=${i.id} class="name-data">${i.name}</td></tr>`

    }
    tableBody.innerHTML = dataHtml
    tableBody.childNodes.forEach((name) => {
        name.firstChild.addEventListener('click', function (e) {
            e.preventDefault()
            const modalContainer = document.querySelector('.modal-container')
            let id = parseInt(e.target.id)
            let postHtml = ''
            fetch('https://jsonplaceholder.typicode.com/posts')
            .then(function (response) {
                return response.json();
            })
            .then(function (postData) {
                let counter = 0;
                postData.map((post) => {
                    if (post.userId === id) {
                        postHtml += `<div><p class="post-title">Post ${counter += 1}: ${post.title}</p>
                        <p>${post.body}</p><div>` 
                    }
                })
                modalContainer.innerHTML = postHtml
                openStyle.classList.add("open-modal");
            })
        })
    })
}