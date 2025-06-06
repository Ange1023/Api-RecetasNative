import group from "../schemas/group.js";
import BaseModel from "../utils/baseModel.js";

class groupModel extends BaseModel {

    constructor(){
        super(group)
    }

    async addRecipeToGroup(groupId, recipeId) {
        // Busca el grupo actual
        const groupDoc = await
        group.findById(groupId);
        if (!groupDoc) return null;
        // Verifica si la receta ya está en el grupo
        const isRecipeInGroup = groupDoc.recipes.includes(recipeId);
       

        let updatedGroup;

        // Si la receta ya está en el grupo retorna
        if (isRecipeInGroup) return { updatedGroup: groupDoc, wasAdded: false };


        // Si no está, la agrega
        updatedGroup = await group.findOneAndUpdate(
            { _id: groupId },
            { $addToSet: { recipes: recipeId } },
            { new: true }
        );        
        return { updatedGroup, wasAdded: true };
    }

    async removeRecipeFromGroup(groupId, recipeId) {
        // Busca el grupo actual
        const groupDoc = await
        group.findById(groupId);
        if (!groupDoc) return null;
        // Verifica si la receta está en el grupo
        const isRecipeInGroup = groupDoc.recipes.includes(recipeId);

        // Si la receta no está en el grupo retorna
        if (!isRecipeInGroup) return { updatedGroup: groupDoc, wasRemoved: false };
        // Si está, la quita

        let updatedGroup = await group.findOneAndUpdate(
            { _id: groupId },
            { $pull: { recipes: recipeId } },
            { new: true }
        );
        return { updatedGroup, wasRemoved: true };
    }

    async softDeleteGroup(groupId) {
        return await group.findOneAndUpdate({ _id: groupId }, { deletedAt: new Date() }, { new: true });
    }

    async toggleMember(groupId, userId) {
        // Busca el grupo actual
        const groupDoc = await group.findById(groupId);
        if (!groupDoc) return null;

        // Verifica si el usuario ya es miembro
        const isMember = groupDoc.groupMembers.includes(userId);

        let updatedGroup;
        if (isMember) {
            // Si ya es miembro, lo quita
            updatedGroup = await group.findOneAndUpdate(
                { _id: groupId },
                { $pull: { groupMembers: userId } },
                { new: true }
            );
        } else {
            // Si no es miembro, lo agrega
            updatedGroup = await group.findOneAndUpdate(
                { _id: groupId },
                { $addToSet: { groupMembers: userId } },
                { new: true }
            );
        }

        return { updatedGroup, wasMember: isMember };
    }

    // CRUD operations is in BaseModel

}

export default new groupModel();