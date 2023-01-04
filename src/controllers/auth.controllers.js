import User from "../models/User";
import jwt from 'jsonwebtoken';
import config from '../config/config'
import Role from "../models/Role";
export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body;
    const newUser = new User({ 
        username, 
        email, 
        password: await User.encryptPassword(password) 
    });
    if(roles) {
        const foundRoles = await Role.find({name: {$in: [roles]}});
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        const role = await Role.findOne({name: "clients"});
        newUser.roles = [role._id];
    }
    const user = await newUser.save();
    console.log(user);
    const token = jwt.sign({ user }, config.SECRET, {
        expiresIn: 86400
    });
    res.status(201).json({state: 1,
        data: token,
        message: "Success Full"
    });
}
export const signIn = async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).populate('roles');
    if (!user) {
        return res.status(401).json({ state: 0,
            data: null,
            message: "User not found" });
    }
    const matchPassword = await User.comparePassword(req.body.password, user.password);
    if (!matchPassword) {
        return res.status(401).json({ state: 0,
            data: null,
            message: "User not found" });
    }
    const token = jwt.sign({ user }, config.SECRET, {
        expiresIn: 86400
    }); 
    res.json({ state: 1,
        data: token,
        message: "succes" });
}
export const setprofile = async (req, res) => {
    console.log(req.file);
    return await res.send({
        'message': 'Fichero subido satisfactoriamente!!!'
    });
}