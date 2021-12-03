import { Router } from 'express';
import {
  createRoleReq,
  getRoleReq,
  updateRoleReq,
} from '../../../requests/v1/roles/roles';
import RolesService from '../../../services/v1/roles/roles';
const router = Router();

//Time=30m32s92
// router.get('/get-roles', RolesService.getRoles);
// router.get('/get-role/:id', getRoleReq, RolesService.getRole);
// router.post('/create', createRoleReq, RolesService.createRole);
// router.put('/update-role/:id', updateRoleReq, RolesService.updateRole);
// router.delete('/delete-role/:id', getRoleReq, RolesService.deleteRole);

export default router;
