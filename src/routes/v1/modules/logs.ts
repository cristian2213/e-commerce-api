import { Router } from 'express';
const router = Router();
import LogsService from '../../../services/v1/logs/productsLogs/bulkUploadLog';
import { getLogReq } from '../../../requests/v1/logs/logs';

router.get('/get-logs', LogsService.getLogs);
router.get('/get-log/:logId', getLogReq, LogsService.getLog);
router.delete('/delete-log/:logId', getLogReq, LogsService.deleteLog);
router.get('/download-log/:id', getLogReq, LogsService.downloadLog);

export default router;
