import config from "../config";
import User from "../models/User";
import jwt from 'jsonwebtoken';
import Role from "../models/Role";
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) return res.json({ message: 'No token provided' })
        const decodedTokenUser = jwt.verify(token, config.SECRET);
        req.userId = decodedTokenUser.id;
        const user = await User.findById(req.userId, { password: 0 });
        if (!user) return res.json({ message: 'No user found' })
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({ message: 'Unauthorizated' })
    }
}
export const isSuperAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } })
    for (let i = 0, length = roles.length; i < length; i++) {
        if (roles[i].name === 'superadmin') {
            next(); return;
        }
    }
    return res.status(403).json({ message: 'Require SuperAdmin User!!!' })
}
export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ id: { $in: user.roles } })
    for (let i = 0, length = roles.length; i < length; i++) {
        if (roles[i].name === 'admin') {
            next(); return;
        }
    }
    return res.status(403).json({ message: 'Require SuperAdmin User!!!' })
}
export const isClients = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } })
    for (let i = 0, length = roles.length; i < length; i++) {
        if (roles[i].name === 'clients') {
            next(); return;
        }
    }
    return res.status(403).json({ message: 'Require SuperAdmin User!!!' })
}
