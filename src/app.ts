import {FfmpegExecutor} from "./core/ffmpeg/ffmpeg.executor";
import {ConsoleLogger} from "./out/console-logger";

export class App {
    async run() {
        new FfmpegExecutor(ConsoleLogger.getInstance()).execute();
    }
}

new App().run();

/*

(async function convert() {
    const {width, height, path, name} = await inquirer.prompt([
        {
            type: 'number',
            name: 'width',
            message: 'Width:'
        },
        {
            type: 'number',
            name: 'height',
            message: 'Height:'
        },
        {
            type: 'input',
            name: 'path',
            message: 'Path:'
        },
        {
            type: 'input',
            name: 'name',
            message: 'Name:'
        },
    ]);

    const stream = spawn('ffmpeg', [
            '-i', path,
            '-c:v', 'libx264',
            '-s', `${width}x${height}`,
            `${path}${name}.mp4`
        ]);

    stream.stdout.on('data', (data: any) => {
        console.log(data.toString());
    });

    stream.stderr.on('data', (data: any) => {
        console.error(data.toString());
    })

    stream.on('close', (data: any) => {
        console.log('finished');
    })
})()*/
