import fs from 'node:fs';
import path from 'node:path';

const studentId = '336095';
const targetDirectory = process.argv[2] || '.';

function analyzeDirectory(directory) {
    let files = 0;
    let directories = 0;
    let totalSize = 0;

    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            directories++;
            const result = analyzeDirectory(fullPath);
            files += result.files;
            directories += result.directories;
            totalSize += result.totalSize;
        } else if (entry.isFile()) {
            files++;
            totalSize += fs.statSync(fullPath).size;
        }
    }

    return { files, directories, totalSize };
}

const result = analyzeDirectory(targetDirectory);

console.log(
    `${studentId}-${result.files}-${result.directories}-${result.totalSize}`
);