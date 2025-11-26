import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function saveFile(file: File | null, folder: string = 'uploads'): Promise<string | null> {
    if (!file || file.size === 0) return null;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const extension = file.name.split('.').pop();
    const filename = `${uuidv4()}.${extension}`;

    // Ensure directory exists
    const uploadDir = join(process.cwd(), 'public', folder);
    await mkdir(uploadDir, { recursive: true });

    // Write file
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return public URL
    return `/${folder}/${filename}`;
}
