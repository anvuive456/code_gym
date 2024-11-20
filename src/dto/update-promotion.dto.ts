import { Promotion } from "../entities/promotion.entity";

export type UpdatePromotion = Pick<
    Partial<Promotion>,
    | "name"
    | "branches"
    | "description"
    | "discountPercentage"
    | "packages"
    | "endDate"
    | "startDate"
>;
