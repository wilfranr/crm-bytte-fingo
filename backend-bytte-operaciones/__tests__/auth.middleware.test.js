import authMiddleware from '../middlewares/auth.middleware.js';
import jwt from 'jsonwebtoken';

// Mock de la librería jsonwebtoken
jest.mock('jsonwebtoken');

// Mock de req, res y next
const mockRequest = (cookies, headers) => ({
  cookies: cookies || {},
  headers: headers || {},
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

describe('Auth Middleware', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe llamar a next() si el token es válido (en cookie)', () => {
    const req = mockRequest({ accessToken: 'valid.token.here' });
    const res = mockResponse();
    const decodedUser = { id: '123', role: 'user' };

    jwt.verify.mockReturnValue(decodedUser);

    authMiddleware(req, res, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith('valid.token.here', process.env.SECRET_KEY);
    expect(req.user).toEqual(decodedUser);
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('debe llamar a next() si el token es válido (en header)', () => {
    const req = mockRequest({}, { authorization: 'Bearer valid.token.here' });
    const res = mockResponse();
    const decodedUser = { id: '123', role: 'user' };

    jwt.verify.mockReturnValue(decodedUser);

    authMiddleware(req, res, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith('valid.token.here', process.env.SECRET_KEY);
    expect(req.user).toEqual(decodedUser);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('debe devolver 401 si no se proporciona un token', () => {
    const req = mockRequest();
    const res = mockResponse();

    authMiddleware(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token no proporcionado' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('debe devolver 401 si el token es inválido', () => {
    const req = mockRequest({ accessToken: 'invalid.token' });
    const res = mockResponse();

    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authMiddleware(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token inválido' });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
