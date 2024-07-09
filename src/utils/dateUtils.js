// Función para formatear la fecha
export const formatDate = (date) => {
    if (!date) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
  
    // Si es un objeto Date
    if (date instanceof Date) {
      return date.toLocaleDateString(undefined, options);
    }
  
    // Si es un timestamp de Firebase
    if (date.seconds) {
      return new Date(date.seconds * 1000).toLocaleDateString(undefined, options);
    }
  
    return '';
  };
  