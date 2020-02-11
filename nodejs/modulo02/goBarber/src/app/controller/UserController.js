/* eslint-disable prettier/prettier */
const yup = require('yup');

const User = require('../models/User');

class UserController {
    async store(req, res) {
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup
                .string()
                .email()
                .required(),
            password: yup
                .string()
                .min(6)
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json('Validation error');
        }

        const userExists = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const { id, name, email, provider } = await User.create(req.body);

        return res.json({ id, name, email, provider });
    }

    async update(req, res) {
        const schema = yup.object().shape({
            name: yup.string(),
            email: yup.string().email(),
            oldpassword: yup.string().min(6),
            password: yup
                .string()
                .min(6)
                .when('oldpassword', (oldpassword, field) =>
                    oldpassword ? field.required() : field
                ),
            confirmPassword: yup
                .string()
                .when('password', (password, field) =>
                    password ? field.required().oneOf([yup.ref('password')]) : field
                ),
        });

        if(!( await schema.isValid(req.body))){
            return res.status(400).json('Validation error');
        }

        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);
        
        if (email && email !== user.email) {
            const userExists = await User.findOne({ where: { email } });

            if (userExists) {
                res.status(401).json({ error: 'User already exists' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        const { id, name, provider } = await user.update(req.body);

        return res.json({ id, name, email, provider });
    }
}

module.exports = new UserController();
