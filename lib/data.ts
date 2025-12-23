export type Artwork = {
    id: string;
    title: string;
    slug: string;
    description?: string;
    media_url: string;
    media_type: "image" | "video";
    price: number;
    currency: "IDR";
    status: "available" | "sold";
    visibility: "public" | "private";
    created_at: string;
};

export const MOCK_ARTWORKS: Artwork[] = [
    {
        id: "1",
        title: "CRIMSON FLOW",
        slug: "crimson-flow",
        media_url: "/images/crimson-flow-v3.png",
        media_type: "image",
        price: 2500000,
        currency: "IDR",
        status: "available",
        visibility: "public",
        created_at: new Date().toISOString(),
    },
    {
        id: "2",
        title: "OBSIDIAN INK",
        slug: "obsidian-ink",
        media_url: "/images/obsidian-ink-v3.jpg",
        media_type: "image",
        price: 1800000,
        currency: "IDR",
        status: "available",
        visibility: "public",
        created_at: new Date().toISOString(),
    },
    {
        id: "3",
        title: "VOID ROOT",
        slug: "void-root",
        media_url: "/images/void-root-v3.png",
        media_type: "image",
        price: 3200000,
        currency: "IDR",
        status: "available",
        visibility: "public",
        created_at: new Date().toISOString(),
    },
    {
        id: "4",
        title: "SPECTRAL FORM",
        slug: "spectral-form",
        media_url: "/images/spectral-form-v3.png",
        media_type: "image",
        price: 2000000,
        currency: "IDR",
        status: "available",
        visibility: "public",
        created_at: new Date().toISOString(),
    },
    {
        id: "5",
        title: "ECLIPSE ROSE",
        slug: "eclipse-rose",
        media_url: "/images/eclipse-rose-v3.png",
        media_type: "image",
        price: 4500000,
        currency: "IDR",
        status: "available",
        visibility: "public",
        created_at: new Date().toISOString(),
    },
];
