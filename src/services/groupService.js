import groupModel from "../models/group.js";

class GroupService {
    async createGroup(data) {
        return await groupModel.create(data);
    }

    async getAllGroups() {
        return await groupModel.findAll();
    }

    async getGroupById(id) {
        return await groupModel.findById(id);
    }

    async updateGroup(id, data) {
        return await groupModel.update(id, data, { new: true, runValidators: true });
    }

    async deleteGroup(id) {
        return await groupModel.delete(id);
    }

    async softDeleteGroup(id) {
        return await groupModel.softDeleteGroup(id);
    }

    async paginateGroups(filter = {}, options = { currentPage: 1, limit: 10 }) {
        return await groupModel.paginate(filter, options);
    }

    async toggleGroupStatus(groupId, userId) {
        return await groupModel.toggleMember(groupId, userId);
    } 

}

export default new GroupService();