import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const locationsPath = path.join(__dirname, '../data/locations.json');

let locations = [];
try {
  const data = fs.readFileSync(locationsPath, 'utf8');
  locations = JSON.parse(data);
} catch (err) {
  console.error('Error reading or parsing locations.json:', err);
}

export const getDepartments = () => {
  return locations.map(({ id, departamento, ciudades }) => ({ id, departamento, ciudades }));
};

export const getCitiesByDepartment = (departmentId) => {
  const department = locations.find((dep) => dep.id === parseInt(departmentId, 10));
  return department ? department.ciudades : [];
};