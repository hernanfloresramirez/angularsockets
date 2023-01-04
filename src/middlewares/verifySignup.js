import { ROLES } from "../models/Role";
import User from "../models/User";
export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    console.log("verifysignup: ", user);
    if (user) return res.status(400).json({
            state: 0,
            data: null,
            message: `El usuario ya existe`
        });
    const email = await User.findOne({ email: req.body.email })
    if (email) return res.status(400).json({
            state: 0,
            data: null,
            message: `El email ya existe`
        });
    next();
}
export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0, roles = req.body.roles.length; i < roles; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    state: 0,
                    token: "",
                    message: `Role ${req.body.roles[i]} does not exist`
                })
            }
        }
    }
    next();
}
