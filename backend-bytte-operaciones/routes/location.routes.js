import { Router } from 'express';
import { getDepartments, getCitiesByDepartment } from '../utils/locations.js';

const router = Router();

router.get('/departments', (req, res) => {
  const departments = getDepartments();
  res.json(departments);
});

router.get('/departments/:id/cities', (req, res) => {
  const cities = getCitiesByDepartment(req.params.id);
  res.json(cities);
});

export default router;