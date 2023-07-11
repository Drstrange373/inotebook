const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const { Error } = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'Harryisagood$boy'
let success = true

// ROUTE 2 Create a user using :POST "api/auth/createuser"
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Valid password pls pal!").isLength({ min: 5 })
], async (req, res) => {
    // If there are erros then return bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        success = false
        return res.status(400).json({ errors: errors.array(), success })
    }
    try {
        // Check whether the user with this email exists already
        // Create a new user
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success = false
            return res.status(400).json({ success ,error: "Sorry, User with this email exixsts already" })
        }

        const salt = await bcrypt.genSalt(10)
        const secPas = await bcrypt.hash((req.body.password), salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPas,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        // console.log(authToken)
        res.json({ success ,authToken })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send("Some error occured")
    }
    // .then(user => res.json(user)).catch(err=>{
    //     console.log(err)
    //     res.json({error:'please send unique value',errorMsg:err.message})

    // })

})


// ROUTE 2 Authenticate a user using :POST "api/auth/login"
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password Cannot be blank").exists()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        success = false
        return res.status(400).json({ success:success,errors: errors.array() })
    }

    const { email, password } = req.body
    
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false
            return res.status(400).json({ success ,error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false
            return res.status(400).json({success, error: "Please try to login with correct credentials" })
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET)
        success = true
        res.json({ success, authToken })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }

})

// ROUTE 3 Get logged in user details using :POST "api/auth/getuser" - Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router