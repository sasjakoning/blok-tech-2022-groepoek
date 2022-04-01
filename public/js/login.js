// Login function

// window.onload=function(){
//     const form = document.getElementById('login-form')

//     form.addEventListener('submit', login)
// }

// async function login(event) {
//     event.preventDefault()
//     const username = document.getElementById('username').value
//     const password = document.getElementById('password').value

//     const loggedin = document.getElementById('LoginButton')

//     loggedin.classList.add("loggedin")

//     const res = await fetch("/login", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             username,
//             password
//         })
//     }).then((res) => res.json())

//     if (res.status === "ok") {
//         console.log("Token ontvangen", res.data)
//         alert("succes")
//     } else {
//         alert(res.error)
//     }

//     console.log(res)
// }