import {IStreamLogger} from "../handlers/stream-logger.interface";

export class ConsoleLogger implements IStreamLogger{
    private constructor() {};
    private static instance: ConsoleLogger;
    static getInstance() {
        if (!ConsoleLogger.instance) {
            ConsoleLogger.instance = new ConsoleLogger();
        }
        return ConsoleLogger.instance;
    }

    end(): void {
        console.log('Ready');
    }

    error(...args: any): void {
        console.error(...args);
    }

    log(...args: any): void {
        console.log(...args)
    }
}