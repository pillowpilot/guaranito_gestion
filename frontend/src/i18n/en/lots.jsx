const t = {
  list: {
    header: "Lots",
    newBtn: "New Lot",
    datagrid: {
      id: "ID",
      name: "Name",
      property: "Property",
      date: "Created on",
      dateFormat: "{{val, datetime}}",
      updatedOn: "Updated on",
      updatedOnFormat: "{{val, datetime}}",
      actions: "Actions",
    },
  },
  create: {
    header: "New Lot",
    labels: {
      name: "Name",
      property: "Property",
    },
    errors: {
      requiredName: "Name is required",
      requiredProperty: "Property is required",
      noPropertiesMsg: "No properties found",
    },
    saveBtn: "Save",
    goBackBtn: "Go back",
    createSuccessMsg: "Lot created successfully",
    createErrorMsg: "Error creating lot",
    noPropertiesErrorMsg:
      "Error retrieving properties. Create a property first.",
  },
  details: {
    header: "Lot's details",
    labels: {
      name: "Name",
      property: "Property",
      geodata: "Geodata",
      geodataFound: "Geodata found",
    },
    errors: {
      requiredName: "Name is required",
      requiredProperty: "Property is required",
    },
    saveBtn: "Save",
    goBackBtn: "Go back",
    updateSuccessMsg: "Lot updated successfully",
    updateErrorMsg: "Error updating lot",
  },
  delete: {
    confirmationMsg: "Delete lot data? This cannot be undone.",
    successMsg: "Lot deleted successfully",
    goBackBtn: "Go back",
    deleteBtn: "Delete",
  },
  map: {
    header: "Lot map",
    goBackBtn: "Go back",
  },
};

export default t;
