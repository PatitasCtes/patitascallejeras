const API_BASE_URL = "https://patitas-pets.netlify.app/.netlify/functions/server";
// const API_BASE_URL = "https://mandalas-backend.netlify.app/.netlify/functions/server";
export const fetchListings = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/listings`);
        if (!response.ok) {
            throw new Error("Error fetching listings");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching listings:", error);
        throw error;
    }
};

// Obtener mascotas por criterios
export const fetchPetsByCriteria = async (criteria = {}) => {
    try {
        const queryParams = new URLSearchParams(criteria).toString();
        const response = await fetch(`${API_BASE_URL}/pets?${queryParams}`);
        if (!response.ok) {
            throw new Error("Error fetching pets by criteria");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching pets by criteria:", error);
        throw error;
    }
};

// Obtener una mascota por UID
export const fetchPetByUID = async (petUID) => {
    try {
        const response = await fetch(`${API_BASE_URL}/pets/uid/${petUID}`);
        if (!response.ok) {
            throw new Error("Error fetching pet by UID");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching pet by UID:", error);
        throw error;
    }
};

// Obtener una mascota por ID
export const fetchPetById = async (petId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/pets/${petId}`);
        if (!response.ok) {
            throw new Error("Error fetching pet by ID");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching pet by ID:", error);
        throw error;
    }
};

// Crear una nueva mascota
export const addPet = async (petData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/pets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(petData),
        });
        if (!response.ok) {
            throw new Error("Error adding new pet");
        }
        return await response.json();
    } catch (error) {
        console.error("Error adding new pet:", error);
        throw error;
    }
};

// Actualizar una mascota por ID
export const updatePetById = async (petId, petData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/pets/${petId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(petData),
        });
        if (!response.ok) {
            throw new Error("Error updating pet");
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating pet:", error);
        throw error;
    }
};

// Eliminar una mascota por ID
export const deletePetById = async (petId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/pets/${petId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error deleting pet");
        }
        return await response.json();
    } catch (error) {
        console.error("Error deleting pet:", error);
        throw error;
    }
};

// Agregar un book a una mascota
export const addBook = async (petId, bookData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/pets/${petId}/book`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookData),
        });
        if (!response.ok) {
            throw new Error("Error adding book to pet");
        }
        return await response.json();
    } catch (error) {
        console.error("Error adding book to pet:", error);
        throw error;
    }
};


const API_FORM_BASE_URL = "https://patitas-forms.netlify.app/.netlify/functions/server";

// Obtener formulario por tipo
export const fetchForm = async (formType) => {
    try {
        const response = await fetch(`${API_FORM_BASE_URL}/form/${formType}`, {
            headers: {
                "Access-Control-Allow-Origin": "https://patitas-forms.netlify.app"
              }
            
        });
        if (!response.ok) {
            throw new Error("Error fetching form");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching form:", error);
        throw error;
    }
};

// Obtener formulario por ID
export const fetchFormById = async (formId) => {
    try {
        const response = await fetch(`${API_FORM_BASE_URL}/form/id/${formId}`);
        if (!response.ok) {
            throw new Error("Error fetching form by ID");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching form by ID:", error);
        throw error;
    }
};

// Obtener formularios con filtros
export const fetchForms = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_FORM_BASE_URL}/forms?${queryParams}`, {
            headers: {
                "Access-Control-Allow-Origin": "https://patitas-forms.netlify.app"
              }
            
        });
        if (!response.ok) {
            throw new Error("Error fetching forms");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching forms:", error);
        throw error;
    }
};

// Modificar formularios con filtros
export const updateForms = async (filters = {}, data) => {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_FORM_BASE_URL}/forms?${queryParams}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Error updating forms");
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating forms:", error);
        throw error;
    }
};

// Eliminar formularios con filtros
export const deleteForms = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_FORM_BASE_URL}/forms?${queryParams}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error deleting forms");
        }
        return await response.json();
    } catch (error) {
        console.error("Error deleting forms:", error);
        throw error;
    }
};

// Guardar formulario con respuestas
export const saveForm = async (formData) => {
    try {
        const response = await fetch(`${API_FORM_BASE_URL}/form`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error("Error saving form");
        }
        return await response.json();
    } catch (error) {
        console.error("Error saving form:", error);
        throw error;
    }
};

// Actualizar formulario por ID
export const updateFormById = async (formId, updatedData) => {
    try {
        const response = await fetch(`${API_FORM_BASE_URL}/form/${formId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            throw new Error("Error updating form");
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating form:", error);
        throw error;
    }
};

// Eliminar formulario por ID
export const deleteFormById = async (formId) => {
    try {
        const response = await fetch(`${API_FORM_BASE_URL}/form/id/${formId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error deleting form");
        }
        return await response.json();
    } catch (error) {
        console.error("Error deleting form:", error);
        throw error;
    }
};

// Buscar formularios por coincidencia
export const searchForms = async (searchString,verArchivados) => {
    try {
        const queryParams = new URLSearchParams({ searchString, archivados: verArchivados }).toString();
        const response = await fetch(`${API_FORM_BASE_URL}/forms/search?${queryParams}`);
        if (!response.ok) {
            throw new Error("Error searching forms");
        }
        return await response.json();
    } catch (error) {
        console.error("Error searching forms:", error);
        throw error;
    }
};
