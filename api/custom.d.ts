declare namespace Express {
  export interface Request {
    user?: number;
    projects?: object[];
  }
}
