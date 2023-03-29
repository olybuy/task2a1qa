import fs from 'fs';

class Util {
    static parseJson(filePath) {
        const jsonString = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonString);
    }
}

export default Util;