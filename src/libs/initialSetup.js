import Role from '../models/Role';
export const createRoles = async () => {
    try {
        const countRoles = await Role.estimatedDocumentCount()
        if (countRoles > 0) return;
        const values = await Promise.all([
            new Role({ name: "superadmin" }).save(),
            new Role({ name: "admin" }).save(),
            new Role({ name: "clients" }).save()
        ]);
        console.log(values);
    } catch (e) {
        console.error(e);
    }
}
