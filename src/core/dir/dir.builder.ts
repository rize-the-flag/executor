import {join} from "path";

export class DirBuilder {
    private inputDrive: string = '';
    private inputPath: string = '';

    setDrive(drive: string) {
        this.inputDrive = drive;
        return this;
    }

    setPath(path: string) {
        this.inputPath = path;
        return this;
    }

    build(keys: string): string[] {
        return [join(this.inputDrive, this.inputPath), keys];
    }
}