const fs = require('fs').promises;
const path = require('path');

const reader = async (FolderPath) => {
    const Places = await fs.readdir(FolderPath);
    for (const place of Places) {
        const way = path.join(FolderPath, place);
        const stas = await fs.stat(way);

        if (stas.isDirectory()) {
            await reader(way)
        }

        if (stas.isFile()) {
            await fs.rename(way, path.join(__dirname, 'main', place))
        }
    }
}

reader(path.join(__dirname, 'main'))