
var express = require("express")
var router = express.Router()

const credential = {
    username: "Minhal",
    password: "Admin@123"
}



// route for home
router.get("/", (req, res) => {
    let message = req.session.message
    req.session.message = ''
    if (req.session.user) {
        res.redirect('/dashboard')
    }
    else {
        res.render('base', { title: "Login System", message })
    }
})


// login user
router.post("/login", (req, res) => {
    if (req.body.username == credential.username && req.body.password == credential.password) {
        req.session.user = req.body.username
        res.redirect('/dashboard')
        console.log(req.session);
    }
    else {
        req.session.message = 'invalid user'
        res.redirect("/")
    }
})

// route for dashboard
router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user })
    }
    else {
        res.redirect('/')
    }
})

// route for logout
router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})


module.exports = router