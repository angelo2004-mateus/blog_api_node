const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

require('dotenv').config()

const User = require('../models/User')


exports.createUser = async (req, res) => {
    const { name, username, email, password } = req.body

    if(!name) return res.status(422).json({ msg: 'Required Name' })
    if(!username) return res.status(422).json({ msg: 'Required Username' })
    if(!email) return res.status(422).json({ msg: 'Required Email' })
    if(!password) return res.status(422).json({ msg: 'Required Password' })

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    try {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { username: username}
                ]
            } 
        })

        // Verify If User Already Exists
        if(existingUser) return res.status(422).json({ msg: 'Username Or Email Already Exists' })

        // Create User
        await User.create({ name, username, email, password: passwordHash })

        return res.status(201).json({ msg: 'User Created' }) 
    }

    catch(err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal Server Error', err})
    }
}

exports.loginUser = async (req, res) => {
    const { username, email, password } = req.body

    if(!username) return res.status(422).json({ msg: 'Required Username' })
    if(!email) return res.status(422).json({ msg: 'Required Email' })
    if(!password) return res.status(422).json({ msg: 'Required Password' })

    try {
        const user = await User.findOne({
            where: {
                [Op.and]: [
                    { email: email },
                    { username: username},
                ]
            }, raw: true 
        })

        if(!user) return res.status(404).json({msg: 'User Not Found'})

        const checkpassword = await bcrypt.compare(password, user.password) 
        if(!checkpassword) return res.status(422).json({ msg: 'Invalid Password' })

        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user.id,
        }, secret, { expiresIn: '10h' })

       res.cookie('userToken', token, {
            maxAge: 3600000,
            httpOnly: true,
            secure: true,
            sameSite: true
        })

        res.status(200).json({ msg: 'Defined Cookie And Logged In User' })
              
        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: 'A error ocurred on server', err})
        }
}   

exports.getUserInfo = (req, res) => {
    if (!req.userData) return res.status(401).json({ message: "User Unauthorized" });
    
    const { username, name, email, password, description } = req.userData;
    
    res.status(200).json({ username, name, email, password, description });
}

exports.updateUser = async (req, res) => {
    const { username, name, email, password, description } = req.body

    if(!name) return res.status(422).json({ msg: 'Required Name' })
    if(!username) return res.status(422).json({ msg: 'Required Username' })
    if(!email) return res.status(422).json({ msg: 'Required Email' })
    if(!password) return res.status(422).json({ msg: 'Required Password' })


    try {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if (existingUser && existingUser.id !== req.userData.id) {
            return res.status(422).json({ msg: 'Username Or Email Is Already In Use' })
        }

        const currentUser = await User.findByPk(req.userData.id)

        if (!currentUser) {
            return res.status(404).json({ msg: 'User Not Found' })
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        currentUser.username = username
        currentUser.name = name
        currentUser.email = email
        currentUser.password = passwordHash
        currentUser.description = description

        await currentUser.save()

        res.status(200).json({ msg: 'Usuário Updated Sucessfull' })
    } catch (err) {
        res.status(500).json({ msg: 'Internal Server Error', err })
    }
}


exports.deleteUser = async (req, res) => {
    if (!req.userData) {
        return res.status(401).json({ message: "User not authenticated" })
    }
    
    const userId = req.userData.id

    try {
        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        
        
        await user.destroy()
        
        res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        console.error("Error deleting user:", error)
        res.status(500).json({ message: "An error occurred while deleting user" })
    }
}