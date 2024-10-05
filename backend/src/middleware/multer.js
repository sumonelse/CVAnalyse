import multer from "multer"

// Multer setup to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

// Initialize multer with storage options
const upload = multer({ storage: storage })

export { upload }
