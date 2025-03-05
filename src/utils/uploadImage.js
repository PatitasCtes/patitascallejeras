import { storage, ref, uploadBytesResumable, getDownloadURL } from "../api/firebaseConfig";

/**
 * Subir imagen a Firebase Storage y obtener URL.
 * @param {File} file - Archivo de imagen a subir.
 * @param {string} profileUid - ID único del perfil para organizar las imágenes.
 * @returns {Promise<string>} - URL de la imagen subida.
 */
const uploadImage = async (file, profileUid) => {
    if (!file) {
        throw new Error("No se proporcionó un archivo válido para subir.");
    }

    return new Promise((resolve, reject) => {
        const imageRef = ref(storage, `profile_images/${profileUid}/${file.name}`);
        const uploadTask = uploadBytesResumable(imageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                console.error("Error uploading file:", error);
                reject(error);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log("File available at:", downloadURL);
                    resolve(downloadURL);
                } catch (error) {
                    console.error("Error getting download URL:", error);
                    reject(error);
                }
            }
        );
    });
};

export default uploadImage;
