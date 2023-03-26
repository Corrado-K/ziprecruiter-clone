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
     fname: string;
     lname: string;
     role: string;
     token_id: string;
}

// Get tokens
export interface LoginResponse {
     accessToken: string;
     refreshToken: string;
}

export interface IJobPost {
     id: string;
     title: string;
     description: string;
     location: string;
     experience: string;
     recruiter_id: string;
     createdAt: string;
     updatedAt: string;
}

export interface IApplication {
     id: string;
     coverletter: string;
     resume: string;
     status: string;
     candidate_id: string;
     job_post_id: string;
     createdAt: string;
     updatedAt: string;
}
