import { Profile } from "../entities/profile.entity";

export type UpdateUser = Pick<
    Partial<Profile>,
    "email" | "gender" | "name" | "phone" | "photo"
>;
