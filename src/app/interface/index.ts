export interface SignUpDataType {
  username: string | null;
  email: string | null;
  password: string | null;
  confirm_password: string | null;
}

export interface SignInDataType {
  email: string;
  password: string;
}
