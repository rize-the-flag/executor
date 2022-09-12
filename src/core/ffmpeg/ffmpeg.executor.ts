import {CommandExecutor} from "../executor/command.executor";
import {IFfmpegCommandExec, IFfmpeInput} from "./ffmpeg.type";
import {IStreamLogger} from "../handlers/stream-logger.interface";
import {FileService} from "../files/file.service";
import {PromptService} from "../prompt/prompt.service";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {FfmpegBuilder} from "./ffmpeg.builder";
import {StreamHandler} from "../handlers/stream.handler";

export class FfmpegExecutor extends CommandExecutor<IFfmpeInput> {
    private fileService: FileService = new FileService();
    private promptService: PromptService = new PromptService();

    constructor(logger: IStreamLogger) {
        super(logger);
    }

    protected build({path, name, width, height}: IFfmpeInput): IFfmpegCommandExec {
        const output = this.fileService.getFilePath(path, name, 'mp4');
        const args = new FfmpegBuilder().inputPath(path).setVideoSize(width, height).outputPath(output);
        return {command: 'ffmpeg', args, output};
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream);
    }

    protected async prompt(): Promise<IFfmpeInput> {
        const width = await this.promptService.input<number>('Width', 'number');
        const height = await this.promptService.input<number>('height', 'number');
        const path = await this.promptService.input<string>('Path', 'input');
        const name = await this.promptService.input<string>('Name', 'input');
        return {width, height, path, name};
    }

    protected spawn({command, args, output}: IFfmpegCommandExec): ChildProcessWithoutNullStreams {
        this.fileService.deleteIfExists(output);
        return spawn(command, args);
    }
}