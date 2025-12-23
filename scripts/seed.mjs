
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env (simple manual parsing since we can't depend on dotenv being installed)
// Note: This assumes .env.local exists in the project root. 
// If not, we'll try to use process.env or ask user to provide them.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

function getEnv() {
    try {
        const envPath = path.join(projectRoot, '.env.local');
        if (fs.existsSync(envPath)) {
            const data = fs.readFileSync(envPath, 'utf8');
            const result = {};
            data.split('\n').forEach(line => {
                const [key, value] = line.split('=');
                if (key && value) {
                    result[key.trim()] = value.trim().replace(/"/g, '');
                }
            });
            return result;
        }
    } catch (e) {
        console.warn("Could not read .env.local");
    }
    return process.env;
}

const env = getEnv();
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Note: ANON KEY might not have permission to INSERT if RLS is on and requires auth.
// Ideally we need SERVICE_ROLE_KEY. If not present, we might fail unless we temporarily allow Anon inserts.
// However, the user is an admin.

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("Missing Supabase credentials. Ensure .env.local has NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const ARTWORKS = [
    {
        title: "CRIMSON FLOW",
        slug: "crimson-flow",
        file: "crimson-flow-v3.png",
        media_type: "image",
        price: 2500000,
        currency: "IDR",
        status: "available",
        visibility: "public",
    },
    {
        title: "OBSIDIAN INK",
        slug: "obsidian-ink",
        file: "obsidian-ink-v3.jpg",
        media_type: "image",
        price: 1800000,
        currency: "IDR",
        status: "available",
        visibility: "public",
    },
    {
        title: "VOID ROOT",
        slug: "void-root",
        file: "void-root-v3.png",
        media_type: "image",
        price: 3200000,
        currency: "IDR",
        status: "available",
        visibility: "public",
    },
    {
        title: "SPECTRAL FORM",
        slug: "spectral-form",
        file: "spectral-form-v3.png",
        media_type: "image",
        price: 2000000,
        currency: "IDR",
        status: "available",
        visibility: "public",
    },
    {
        title: "ECLIPSE ROSE",
        slug: "eclipse-rose",
        file: "eclipse-rose-v3.png",
        media_type: "image",
        price: 4500000,
        currency: "IDR",
        status: "available",
        visibility: "public",
    },
];

async function seed() {
    console.log("Starting seed process...");

    // 1. Clear existing pieces (Optional, but good for idempotency if we want a fresh state)
    // await supabase.from('artworks').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all? Careful.
    // Let's just upsert based on slug.

    for (const art of ARTWORKS) {
        console.log(`Processing ${art.title}...`);

        const filePath = path.join(projectRoot, 'public', 'images', art.file);
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            continue;
        }

        const fileContent = fs.readFileSync(filePath);
        // Clean filename for storage
        const storageFileName = `${art.slug}-${path.extname(art.file)}`;

        // Upload to Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('artworks-public')
            .upload(storageFileName, fileContent, {
                contentType: art.media_type === 'image' ? 'image/png' : 'video/mp4', // Simplification
                upsert: true
            });

        if (uploadError) {
            console.error(`Upload error for ${art.title}:`, uploadError.message);
            // Continue? Maybe it already exists?
        }

        const { data: publicUrlData } = supabase.storage
            .from('artworks-public')
            .getPublicUrl(storageFileName);

        const mediaUrl = publicUrlData.publicUrl;
        console.log(`Uploaded to: ${mediaUrl}`);

        // Insert/Update DB
        // Check if exists
        const { data: existing } = await supabase.from('artworks').select('id').eq('slug', art.slug).single();

        if (existing) {
            const { error: updateError } = await supabase
                .from('artworks')
                .update({
                    media_url: mediaUrl,
                    price: art.price,
                    status: art.status,
                    visibility: art.visibility
                })
                .eq('id', existing.id);
            if (updateError) console.error(`Update error for ${art.title}:`, updateError.message);
            else console.log(`Updated DB for ${art.title}`);
        } else {
            const { error: insertError } = await supabase
                .from('artworks')
                .insert({
                    title: art.title,
                    slug: art.slug,
                    media_url: mediaUrl,
                    media_type: art.media_type,
                    price: art.price,
                    currency: art.currency,
                    status: art.status,
                    visibility: art.visibility
                });
            if (insertError) console.error(`Insert error for ${art.title}:`, insertError.message);
            else console.log(`Inserted DB for ${art.title}`);
        }
    }

    console.log("Seed complete.");
}

seed();
