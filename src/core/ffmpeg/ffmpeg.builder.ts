export class FfmpegBuilder {
    private input: string = '';
    private options: Map<string, string> = new Map<string, string>();

    constructor() {
        this.options.set('-c:v', 'libx264');
    }

    inputPath(input: string) {
        this.input = input;
        return this;
    }

    setVideoSize(width: number, height: number) {
        this.options.set('-s', `${width}x${height}`);
        return this;
    }

    outputPath(output: string): string[] {
        const args: string[] = ['-i', this.input];
        this.options.forEach((value, key) => {
            args.push(key);
            args.push(value);
        })
        args.push(output)
        return args;
    }
}

