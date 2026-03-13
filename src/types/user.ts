export interface CreateUserBody {
  email: string;
  name: string;
  password: string;
  role: "USER" | "ADMIN";
}
