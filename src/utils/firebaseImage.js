import { storage, ref, uploadBytesResumable, getDownloadURL, deleteObject  } from "../api/firebaseConfig";

/**
 * Subir imagen a Firebase Storage y obtener URL.
 * @param {File} file - Archivo de imagen a subir.
 * @param {string} profileUid - ID único del perfil para organizar las imágenes.
 * @returns {Promise<string>} - URL de la imagen subida.
 */
const uploadImage = async (file, profileUid, petName) => {
    if (!file) {
        throw new Error("No se proporcionó un archivo válido para subir.");
    }

    return new Promise((resolve, reject) => {
        const imageRef = ref(storage, `patitas_images/${petName}_${profileUid}/${file.name}`);
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

 

/**
 * Eliminar una imagen de Firebase Storage.
 * @param {string} filePath - Ruta completa de la imagen en el almacenamiento.
 * @returns {Promise<void>} - Promesa que se resuelve si la imagen se elimina correctamente.
 */
const deleteImage = async (filePath) => {
    if (!filePath) {
        throw new Error("No se proporcionó una ruta válida para eliminar.");
    }

    try {
        const imageRef = ref(storage, filePath);
        await deleteObject(imageRef);
        console.log("Imagen eliminada exitosamente:", filePath);
    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        throw error;
    }
};

export { uploadImage, deleteImage };