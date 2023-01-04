import { Schema, model } from 'mongoose';
export const ROLES = ["superadmin", "admin", "clients"];
const roleSchema = new Schema({
    name: String
}, {
    versionKey: false
});
export default model('Role', roleSchema);
