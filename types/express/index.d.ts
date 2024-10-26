import { DataSource } from "typeorm";

// types/express/index.d.ts
declare global {
    // thêm db dô request
    namespace Express {
        interface Request {
            db: DataSource;
        }
    }
}
