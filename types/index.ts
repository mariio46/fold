export type Brands = {
    id: number;
    name: string;
};

export type Products = {
    id: number;
    name: string;
    slug: string;
    price: number;
    brand_id: number;
    brands: Brands;
};
