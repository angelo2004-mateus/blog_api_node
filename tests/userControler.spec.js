const { createUser } = require('../src/controllers/UserController')
const bcrypt = require('bcrypt')
const User = require('../src/models/User')

const { Op } = require('sequelize')

const req = {
    body: {
        name: 'Example',
        username: 'example_user_name',
        email: 'example@gmail.com',
        password: '123abc'
    }
}

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

User.findOne = jest.fn()
User.create = jest.fn()

bcrypt.genSalt = jest.fn().mockResolvedValue('mocked=salt')
bcrypt.hash = jest.fn().mockResolvedValue('mock-password-hash')

describe('Create User Controller', () => {
    test('Should Create A new User', async () => {
        User.findOne.mockResolvedValue(null)

        await createUser(req, res)

        expect(User.findOne).toHaveBeenCalledWith({
            where: {
                [Op.or]: [
                    { email: req.body.email },
                    { username: req.body.username }
                ]
            }
        })

        expect(User.create).toHaveBeenCalledWith({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: 'mock-password-hash'
        })

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({ msg: 'User Created' })
    })

    // test('Checking User Name Existence', async () => {
    //     User.findOne.mockResolvedValue(req)

    //     await createUser(req, res)


    // })
})


