import { Cliente } from './cliente.model';

export interface ClienteResponse {
  results: Cliente[];
  total: number;
}