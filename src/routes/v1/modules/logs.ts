import { Router } from 'express';
const router = Router();
import logsService from '../../../services/v1/logs/productsLogs/bulkUploadLog';

router.get('/download/:id', logsService.logDownload);

export default router;
