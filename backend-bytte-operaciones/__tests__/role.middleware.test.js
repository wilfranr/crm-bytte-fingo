import roleMiddleware from '../middlewares/role.middleware.js';

// Mock de req, res y next
const mockRequest = (user) => ({
  user,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

describe('Role Middleware', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe llamar a next() si el rol del usuario está permitido', () => {
    const req = mockRequest({ role: 'admin' });
    const res = mockResponse();
    const allowedRoles = ['admin', 'editor'];
    const middleware = roleMiddleware(allowedRoles);

    middleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('debe devolver 403 si el rol del usuario no está permitido', () => {
    const req = mockRequest({ role: 'viewer' });
    const res = mockResponse();
    const allowedRoles = ['admin', 'editor'];
    const middleware = roleMiddleware(allowedRoles);

    middleware(req, res, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Acceso denegado' });
  });

  it('debe devolver 403 si el usuario no tiene un rol', () => {
    const req = mockRequest({}); // Usuario sin propiedad 'role'
    const res = mockResponse();
    const allowedRoles = ['admin'];
    const middleware = roleMiddleware(allowedRoles);

    middleware(req, res, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Acceso denegado' });
  });

  it('debe devolver 403 si req.user no existe', () => {
    const req = mockRequest(undefined); // req.user no está definido
    const res = mockResponse();
    const allowedRoles = ['admin'];
    const middleware = roleMiddleware(allowedRoles);

    middleware(req, res, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Acceso denegado' });
  });
});
