import group from "../schemas/group.js";
import BaseModel from "../utils/baseModel.js";

class groupModel extends BaseModel {

    constructor(){
        super(group)
    }

    async softDeleteGroup(groupId) {
        return await group.findOneAndUpdate({ _id: groupId }, { deletedAt: new Date() }, { new: true });
    }

    async toggleMember(groupId, userId) {
        // Busca el grupo actual
        const groupDoc = await group.findById(groupId);
        if (!groupDoc) return null;

        // Verifica si el usuario ya es miembro
        const isMember = groupDoc.GroupMembers.includes(userId);

        let updatedGroup;
        if (isMember) {
            // Si ya es miembro, lo quita
            updatedGroup = await group.findOneAndUpdate(
                { _id: groupId },
                { $pull: { GroupMembers: userId } },
                { new: true }
            );
        } else {
            // Si no es miembro, lo agrega
            updatedGroup = await group.findOneAndUpdate(
                { _id: groupId },
                { $addToSet: { GroupMembers: userId } },
                { new: true }
            );
        }

        return { updatedGroup, wasMember: isMember };
    }

    // CRUD operations is in BaseModel

}

export default new groupModel();