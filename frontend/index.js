var subUserBtn = document.querySelector('.submit-user-btn')
var searchBtn = document.querySelector('.search-btn')

var searchBox = document.querySelector('#search-box')
var userName = document.querySelector('#username')
var password = document.querySelector('#password')
var emailId = document.querySelector('#email')
var phoneNo = document.querySelector('#phone')


subUserBtn.addEventListener('click', (e) => {
    e.preventDefault()
    var data = {
        userName: userName.value,
        password: password.value,
        emailId: emailId.value,
        phoneNo: phoneNo.value,
    }

    fetch('/addUser/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(d => d.json())
        .then(d => {
            console.log(d);
        })
        .catch(e=>{
            console.error(e)
        })
})

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('/find/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: searchBox.value
        })
    })
        .then(d => d.json())
        .then(d => {
            console.log(d);
        })
        .catch(e=>{
            console.error(e)
        })
})