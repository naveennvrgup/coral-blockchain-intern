var subUserBtn = document.querySelector('.submit-user-btn')

var username = document.querySelector('#username')
var password = document.querySelector('#password')
var email = document.querySelector('#email')
var phone = document.querySelector('#phone')

subUserBtn.addEventListener('click', (e) => {
    e.preventDefault()
    var data = {
        username: username.value,
        password: password.value,
        email: email.value,
        phone: phone.value,
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