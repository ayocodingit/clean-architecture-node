import path from 'path'
import { CustomPathFile, GetFiletype } from './file'

describe('CustomPathFile function', () => {
    it('should append extension to filename if missing', () => {
        const unit = 'uploads'
        const category = 'image'
        const file = { filename: 'file1', originalname: 'file1.jpg' }

        const result = CustomPathFile(unit, file, category)

        expect(result).toBe(`${unit}/${category}/${file.filename}`)
    })

    it('should not modify filename if extension is present', () => {
        const unit = 'uploads'
        const category = 'document'
        const file = { filename: 'file2.pdf', originalname: 'file2.pdf' }

        const result = CustomPathFile(unit, file, category)

        expect(result).toBe(`${unit}/${category}/${file.filename}`)
    })
})

describe('GetFiletype function', () => {
    it('should return the correct filetype for images', () => {
        const imageFiles = ['image1.jpg', 'image2.png', 'image3.svg']

        imageFiles.forEach((filename) => {
            const result = GetFiletype(filename)
            expect(result).toBe('image')
        })
    })

    it('should return the correct filetype for documents', () => {
        const documentFiles = [
            'document1.doc',
            'document2.docx',
            'document3.pdf',
        ]

        documentFiles.forEach((filename) => {
            const result = GetFiletype(filename)
            expect(result).toBe('document')
        })
    })

    it('should return the correct filetype for videos', () => {
        const videoFiles = ['video1.mp4', 'video2.mkv']

        videoFiles.forEach((filename) => {
            const result = GetFiletype(filename)
            expect(result).toBe('video')
        })
    })

    it('should return the file extension if not an image, document, or video', () => {
        const otherFiles = ['file1.txt', 'file2.zip']

        otherFiles.forEach((filename) => {
            const result = GetFiletype(filename)
            expect(result).toBe(path.extname(filename).replace('.', ''))
        })
    })
})
