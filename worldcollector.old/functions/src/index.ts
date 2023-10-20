/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// import aquarelle from 'aquarelle'
// import { temporaryDirectory } from 'tempy'
// import { onCall } from 'firebase-functions/v2/https'
// import * as logger from 'firebase-functions/logger'

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const createProfilePicture = onCall(async request => {
//   // logger.info('Hello logs!', { structuredData: true })

//   const { id } = request.data

//   const directory = temporaryDirectory()

//   const {
//     filePath,
//     fileName,
//     width,
//     height,
//     top, // Crop y position
//     left, // Crop x position
//     title, // Title of the artwork
//     year, // Year of the artwork
//     author, // Author name of the artwork
//     originalFilePath, // To display the original artwork (uncropped) if you want to
//     originalFileName,
//   } = await aquarelle(128, 128, directory)

// })
