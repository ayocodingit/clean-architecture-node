import { extname } from 'path'

export const filetype = {
    IMAGE: 'image',
    DOCUMENT: 'document',
    VIDEO: 'video',
}

const filetypes = {
    image: ['png', 'jpg', 'jpeg', 'svg', 'webp'],
    document: ['doc', 'docx', 'pdf'],
    video: ['mp4', 'mkv'],
}

export const CustomPathFile = (path: string, file: any) => {
    const ext = extname(file.filename)
    if (!ext) file.filename = file.filename + extname(file.originalname)
    return `${path}/${file.filename}`
}

export const GetFiletype = (filename: string) => {
    const ext = extname(filename).replace('.', '')
    if (filetypes.document.includes(ext)) return filetype.DOCUMENT
    if (filetypes.image.includes(ext)) return filetype.IMAGE
    if (filetypes.video.includes(ext)) return filetype.VIDEO
    return ext
}
