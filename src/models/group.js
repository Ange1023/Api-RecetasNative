import group from "../schemas/group.js";
import User from "../schemas/user.js";  
import Recipe from "../schemas/recipe.js";
import BaseModel from "../utils/baseModel.js";

class groupModel extends BaseModel {

    constructor(){
        super(group)
    }

    create = async (groupData) => {
        // Crea un nuevo grupo
        const newGroup = await group.create(groupData);

        // Agrega el grupo al array createdGroups del usuario creador
        if (newGroup.user_id) {
            await User.findByIdAndUpdate(
                newGroup.user_id,
                { $addToSet: { createdGroups: newGroup._id } }
            );
        }

        return newGroup;
    }

    async addRecipeToGroup(groupId, recipeId) {
        // Busca el grupo actual
        const groupDoc = await group.findById(groupId);
        if (!groupDoc) return null;
        // Verifica si la receta ya está en el grupo
        const isRecipeInGroup = groupDoc.recipes.includes(recipeId);

        let updatedGroup;

        // Si la receta ya está en el grupo retorna
        if (isRecipeInGroup) return { updatedGroup: groupDoc, wasAdded: false };

        // Si no está, la agrega al grupo
        updatedGroup = await group.findOneAndUpdate(
            { _id: groupId },
            { $addToSet: { recipes: recipeId } },
            { new: true }
        );
        let updateRecipe
        // También agrega el groupId al array groups de la receta
        updateRecipe = await Recipe.findByIdAndUpdate(
            recipeId,
            { $addToSet: { groups: groupId } }
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

        // Quita el groupId del array groups de la receta
        let updatedRecipe;

        updatedRecipe = await Recipe.findByIdAndUpdate(
            recipeId,
            { $pull: { groups: groupId } }
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