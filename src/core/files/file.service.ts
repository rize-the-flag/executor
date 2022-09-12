import {dirname, join, isAbsolute} from 'path';
import {promises} from "fs";

export class FileService {
    public getFilePath(path: string, name: string, ext: string) {
        if (!isAbsolute(path)) {
            path = join(__dirname + '/' + path);
        }
        return join(dirname(path) + '/' + name + '.' + ext);
    }

    public async isExists(path: string) {
        try {
            await promises.stat(path);
            return true;
        } catch {
            return false;
        }
    }

    public async deleteIfExists(path: string) {
        if (await this.isExists(path)) {
            await promises.unlink(path);
        }
    }
}