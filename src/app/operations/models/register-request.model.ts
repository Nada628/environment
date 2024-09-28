export interface RegisterRequest {
  username: string;
  name: string;
  email: string;
  active: boolean;
  password: string;
  confirmPassword: string;
  department_id: number;
  role_name: string;
}
