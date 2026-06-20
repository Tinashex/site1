function showMsg(msg, color = "white") {
    const el = document.getElementById("msg");
    if (el) {
        el.innerText = msg;
        el.style.color = color;
    }
}

// ================= EMAIL LOGIN =================
function emailLogin() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => {
        showMsg("Login successful!", "lime");
        window.location.href = "dashboard.html";
    })
    .catch(() => {

        firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(() => {
            showMsg("Account created!", "lime");
            window.location.href = "dashboard.html";
        })
        .catch(err => {
            showMsg(err.message, "red");
        });

    });
}

// ================= GOOGLE LOGIN =================
function googleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(() => {
        showMsg("Google login success!", "lime");
        window.location.href = "dashboard.html";
    })
    .catch(err => {
        showMsg(err.message, "red");
    });
}

// ================= GITHUB LOGIN =================
function githubLogin() {
    let provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(() => {
        showMsg("GitHub login success!", "lime");
        window.location.href = "dashboard.html";
    })
    .catch(err => {
        showMsg(err.message, "red");
    });
}