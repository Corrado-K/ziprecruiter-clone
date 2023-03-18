export interface User {
     id: number | null;
     email: string | null;
     role: string | null;
     accessToken: string | null;
}

// JWT data cannot be null at any given point because we all the data
export interface IDecodeJWT {
     id: number;
     email: string;
     role: string;
     token_id: string;
}

// Get tokens
export interface LoginResponse {
     accessToken: string;
     refreshToken: string;
}