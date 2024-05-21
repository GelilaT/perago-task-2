import * as fs from 'fs'
import * as path from 'path'
import * as prettier from 'prettier'
import { Injectable } from '@nestjs/common'
import { v4 as uuid4 } from 'uuid'

@Injectable()
export class FileService{
    storagePath: string
    scaffoldPath: string

    constructor(){
        this.storagePath = path.normalize(path.join(process.cwd(), '../storage'))
        this.scaffoldPath = path.normalize(path.join(process.cwd(), '../storage/base'),)
    }
    
    // async createScaffoldDir() {
    //     const temp = path.join(this.storagePath, uuid4())

    //     if (fs.existsSync(temp)) {
    //         fs.rmSync(temp, {
    //             force: true,
    //             recursive: true
    //         })
    //     }
    //     await fs.promises.mkdir(temp, { recursive: true })
    //     fs.cpSync(this.scaffoldPath, temp, { recursive: true })
    //     return temp
    // }

    async createFile(workingDir: string, relativeFilePath: string, content: string) {
        const filePath = path.join(workingDir, relativeFilePath + '.ts')
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
        console.log(filePath)
        try {
            fs.writeFileSync(
                filePath,
                await prettier.format(content, { parser: 'typescript' }),
                { encoding: 'utf-8'}
            )
        } catch (e) {
            console.log(e)
            fs.writeFileSync(filePath, content, { encoding: 'utf-8' });
        }
    }

}