const t = {
  list: {
    header: "Inferencias",
    newBtn: "Nueva Inferencia",
    reportBtn: "Reportes",
    datagrid: {
      id: "ID",
      user: "Usuario",
      lot: "Lote",
      date: "Creado el",
      dateFormat: "{{val, datetime}}",
      updatedOn: "Actualizado el",
      updatedOnFormat: "{{val, datetime}}",
      model: "Modelo",
      taskId: "ID Tarea",
      coordinates: "Coordenadas",
      status: "Estado",
      actions: "Acciones",
    },
    labels: {
      noCoords: "Sin coordenadas",
      pendingStatus: "PENDIENTE",
      processingStatus: "PROCESANDO",
      successStatus: "EXITO",
      failureStatus: "FRACASO",
    },
  },
  create: {
    header: "Nueva Inferencia",
    inferBtn: "Inferir",
    goBackBtn: "Volver",
    options: {
      leavesDiseases: "Enfermedades de Hojas",
      fruitsDiseases: "Enfermedades de Frutas",
      treeCounting: "Conteo de árboles",
    },
    errors: {
      requiredImage: "Imagen de entrada es requerida",
      requiredLot: "Lote es requerido",
      requiredModel: "Model de inferencia es requerido",
    },
    labels: {
      inferenceModel: "Modelo de inferencia",
      lot: "Lote",
      inputImage: "Imagen de entrada",
    },
    successMsg: "Inferencia creada exitosamente",
    errorMsg: "Error creando inferencia",
    noLotsErrorMsg: "Error obteniendo lotes. Cree al menos un lote.",
  },
  details: {
    goBackBtn: "Volver",
    labels: {
      detailsHeader: "Detalles de la Inferencia",
      lot: "Lote",
      model: "Modelo",
      status: "Estado",
      createdOn: "Creado el",
      updatedOn: "Actualizado el",
      previewHeader: "Visualización",
    },
  },
  delete: {
    confirmationMsg:
      "Eliminar los datos de la inferencia? Esto no se puede deshacer.",
    successMsg: "Inferencia eliminada exitosamente",
    errorMsg: "Error eliminando inferencia",
    goBackBtn: "Volver",
    deleteBtn: "Eliminar",
  },
  models: {
    leafs: "Enfermedades en Hojas",
    fruits: "Enfermedades en Frutas",
    trees: "Conteo de Árboles",
  },
};

export default t;
