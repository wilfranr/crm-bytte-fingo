import { getClientes, getClienteById, updateCliente } from '../controllers/cliente.controller.js';
import Cliente from '../models/cliente.model.js';

// Mock del modelo de Mongoose
jest.mock('../models/cliente.model.js');

// Mock de req y res
const mockRequest = (params, body) => ({
  params,
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Cliente Controller', () => {

  beforeEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();
  });

  describe('getClientes', () => {
    it('debe obtener clientes de Freshdesk, sincronizarlos y devolverlos', async () => {
      const req = mockRequest();
      const res = mockResponse();

      const mockFreshdeskData = {
        results: [
          { id: 1, name: 'Cliente 1', email: 'c1@test.com' },
          { id: 2, name: 'Cliente 2', email: 'c2@test.com' },
        ]
      };
      const mockDbClientes = [
        { _id: 'db1', id_freshdesk: 1, name: 'Cliente 1', email: 'c1@test.com' },
        { _id: 'db2', id_freshdesk: 2, name: 'Cliente 2', email: 'c2@test.com' },
      ];

      fetch.mockResponseOnce(JSON.stringify(mockFreshdeskData));
      Cliente.findOneAndUpdate.mockResolvedValue(true); // Simula una actualización exitosa
      Cliente.find.mockResolvedValue(mockDbClientes);

      await getClientes(req, res);

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('freshdesk.com'), expect.any(Object));
      expect(Cliente.findOneAndUpdate).toHaveBeenCalledTimes(2);
      expect(Cliente.find).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ results: mockDbClientes });
    });

    it('debe devolver 500 si falla el fetch a Freshdesk', async () => {
      const req = mockRequest();
      const res = mockResponse();

      fetch.mockReject(new Error('API Error'));

      await getClientes(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching and syncing clients' });
    });

    it('debe devolver 500 si falla la sincronización con la BD', async () => {
      const req = mockRequest();
      const res = mockResponse();

      const mockFreshdeskData = { results: [{ id: 1, name: 'Cliente 1' }] };
      fetch.mockResponseOnce(JSON.stringify(mockFreshdeskData));
      Cliente.findOneAndUpdate.mockRejectedValue(new Error('DB Sync Error'));

      await getClientes(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching and syncing clients' });
    });
  });

  describe('getClienteById', () => {
    it('debe devolver un cliente si se encuentra', async () => {
      const req = mockRequest({ id: '123' });
      const res = mockResponse();
      const mockCliente = { _id: '123', name: 'Test User', email: 'test@example.com' };

      Cliente.findById.mockResolvedValue(mockCliente);

      await getClienteById(req, res);

      expect(Cliente.findById).toHaveBeenCalledWith('123');
      expect(res.json).toHaveBeenCalledWith(mockCliente);
    });

    it('debe devolver 404 si el cliente no se encuentra', async () => {
      const req = mockRequest({ id: '404' });
      const res = mockResponse();

      Cliente.findById.mockResolvedValue(null);

      await getClienteById(req, res);

      expect(Cliente.findById).toHaveBeenCalledWith('404');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Cliente no encontrado' });
    });

    it('debe devolver 500 si hay un error en la base de datos', async () => {
      const req = mockRequest({ id: '500' });
      const res = mockResponse();
      const dbError = new Error('Error de base de datos');

      Cliente.findById.mockRejectedValue(dbError);

      await getClienteById(req, res);

      expect(Cliente.findById).toHaveBeenCalledWith('500');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al obtener el cliente' });
    });
  });

  describe('updateCliente', () => {
    it('debe actualizar un cliente y devolverlo con status 200', async () => {
      const req = mockRequest({ id: '123' }, { name: 'Test User Updated', email: 'test.updated@example.com' });
      const res = mockResponse();
      const mockClienteActualizado = { _id: '123', name: 'Test User Updated', email: 'test.updated@example.com' };

      Cliente.findByIdAndUpdate.mockResolvedValue(mockClienteActualizado);

      await updateCliente(req, res);

      expect(Cliente.findByIdAndUpdate).toHaveBeenCalledWith('123', { name: 'Test User Updated', email: 'test.updated@example.com' }, { new: true });
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockClienteActualizado);
    });

    it('debe devolver 404 si el cliente no se encuentra', async () => {
      const req = mockRequest({ id: '404' }, { name: 'No Existe' });
      const res = mockResponse();

      Cliente.findByIdAndUpdate.mockResolvedValue(null);

      await updateCliente(req, res);

      expect(Cliente.findByIdAndUpdate).toHaveBeenCalledWith('404', { name: 'No Existe' }, { new: true });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Cliente no encontrado' });
    });

    it('debe devolver 500 si hay un error en la base de datos', async () => {
      const req = mockRequest({ id: '500' }, { name: 'Error DB' });
      const res = mockResponse();
      const dbError = new Error('Error de base de datos');

      Cliente.findByIdAndUpdate.mockRejectedValue(dbError);

      await updateCliente(req, res);

      expect(Cliente.findByIdAndUpdate).toHaveBeenCalledWith('500', { name: 'Error DB' }, { new: true });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al actualizar el cliente' });
    });
  });
});
