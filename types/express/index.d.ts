import { DataSource } from "typeorm";

// types/express/index.d.ts
declare global {
    namespace Express {
        interface Request {
            db: DataSource;
        }
    }
}
