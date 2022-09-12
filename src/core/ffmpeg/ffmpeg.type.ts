import {ICommandExec} from "../executor/command.types";

export interface IFfmpeInput {
    width: number;
    height: number;
    path: string;
    name: string;
}

export interface IFfmpegCommandExec extends ICommandExec  {
    output: string;
}