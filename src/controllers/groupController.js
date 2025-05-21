import GroupService from "../services/groupService.js";
import User from "../models/user.js";
import { catchAsync, sendResponse } from "../utils/appError.js";

class GroupController {
    create = catchAsync(async (req, res, next) => {
        const group = await GroupService.createGroup(req.body);
        sendResponse(res, 201, "Grupo creado exitosamente", {
            group,
        });
    });

    update = catchAsync(async (req, res, next) => {
        const group = await GroupService.updateGroup(req.params.id, req.body);
        if (!group) {
            return sendResponse(res, 404, "Grupo no encontrado", null);
        }
        sendResponse(res, 200, "Grupo actualizado exitosamente", {
            group,
        });
    });

    delete = catchAsync(async (req, res, next) => {
        await GroupService.deleteGroup(req.params.id);
        if (!group) {
            return sendResponse(res, 404, "Grupo no encontrado", null);
        }
        sendResponse(res, 200, "Grupo eliminado exitosamente", null);
    });

    getOne = catchAsync(async (req, res, next) => {
        const group = await GroupService.getGroupById(req.params.id);
        sendResponse(res, 200, "Grupo encontrado exitosamente", {
            group,
        });
    });

    getAll = catchAsync(async (req, res, next) => {
        const groups = await GroupService.getAllGroups();
        sendResponse(res, 200, "Grupos encontrados exitosamente", {
            groups,
        });
    });

    getPaginated = catchAsync(async (req, res, next) => {
        const { currentPage = 1, limit = 10, ...filters } = req.body;
        // Puedes construir un filtro más avanzado aquí si lo necesitas
        const options = { currentPage: parseInt(currentPage), limit: parseInt(limit) };
        const result = await GroupService.paginateGroups(filters, options);
        sendResponse(res, 200, "Grupos paginados", result);
    });

    softDelete = catchAsync(async (req, res, next) => {
        const group = await GroupService.softDeleteGroup(req.params.id);
        if (!group) {
            return sendResponse(res, 404, "Grupo no encontrado", null);
        }
        sendResponse(res, 200, "Grupo suspendido exitosamente", null);
    }); 

    toggleMember = catchAsync(async (req, res, next) => {
        const { groupId, userId } = req.body;
        const result = await GroupService.toggleGroupStatus(groupId, userId);
        if (!result || !result.updatedGroup) {
            return sendResponse(res, 404, "Grupo no encontrado", null);
        }
        // Desestructura para evitar anidación
        const { updatedGroup, wasMember } = result;
        sendResponse(res, 200, "Grupo actualizado exitosamente", {
            group: updatedGroup,
            wasMember
        });
    });

}

export default new GroupController();
