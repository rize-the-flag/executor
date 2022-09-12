import {CommandExecutor} from "../executor/command.executor";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {IStreamLogger} from "../handlers/stream-logger.interface";
import {ICommandExec} from "../executor/command.types";
import {PromptService} from "../prompt/prompt.service";
import {IDirInput} from "./dir.types";
import {DirBuilder} from "./dir.builder";
import {StreamHandler} from "../handlers/stream.handler";

export class DirExecutor extends CommandExecutor<IDirInput> {
    private promptService: PromptService = new PromptService();

    constructor(logger: IStreamLogger) {
        super(logger);
    }

    protected build({drive, path, args}: IDirInput): ICommandExec {
        const params = new DirBuilder().setDrive(drive).setPath(path).build(args);
        return {command: 'dir', args: params};
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream);
    }

    protected async prompt(): Promise<IDirInput> {
        const drive = await this.promptService.input<string>('Drive Letter:', 'input');
        const path = await this.promptService.input<string>('Path', 'input');
        const args = await this.promptService.input<string>('Args', 'input');
        return {drive, path, args};
    }

    protected spawn({command, args}: ICommandExec): ChildProcessWithoutNullStreams {
        console.log(command, args);
        return spawn(command, args, {shell: true});
    }

}