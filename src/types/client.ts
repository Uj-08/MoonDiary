export interface ClientType {
    email: string;
    name: string;
    picture: string;
}

export interface ClientContextType {
  email?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  email_verified?: boolean
}