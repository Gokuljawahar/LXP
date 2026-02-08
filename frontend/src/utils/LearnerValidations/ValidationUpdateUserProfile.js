// export const ValidationUpdateUserProfile = (editInfo) => {
//     const errors = {};
//     const requiredFields = ['firstName', 'lastName', 'dob', 'gender', 'contactNumber', 'stream'];
 
//     requiredFields.forEach(field => {
//       if (!editInfo[field]) {
//         errors[field] = 'All the fields are required';
//       }
//     });
 
//     // Validation for first name and last name to allow only letters
//     if (editInfo.firstName && !/^[A-Za-z]+$/.test(editInfo.firstName)) {
//       errors.firstName = 'First name must contain only letters';
//     }
 
//     if (editInfo.lastName && !/^[A-Za-z]+$/.test(editInfo.lastName)) {
//       errors.lastName = 'Last name must contain only letters';
//     }
 
//     // Validation for the phone number format
//     if (editInfo.contactNumber && !/^\d{10}$/.test(editInfo.contactNumber)) {
//       errors.contactNumber = 'Invalid phone number';
//     }
 
//     return errors;
//   };


export const ValidationUpdateUserProfile = (editInfo) => {
  const errors = {};
  const requiredFields = ['firstName', 'lastName', 'dob', 'gender', 'contactNumber', 'stream'];

  requiredFields.forEach(field => {
    if (!editInfo[field]) {
      errors[field] = 'All the fields are required';
    }
  });

  // Validation for first name and last name to allow only letters
  if (editInfo.firstName && !/^[A-Za-z]+$/.test(editInfo.firstName)) {
    errors.firstName = 'First name must contain only letters';
  }

  if (editInfo.lastName && !/^[A-Za-z]+$/.test(editInfo.lastName)) {
    errors.lastName = 'Last name must contain only letters';
  }

  // Validation for the phone number format
  // if (editInfo.contactNumber && !/^\d{10}$/.test(editInfo.contactNumber)) {
  //   errors.contactNumber = 'Invalid phone number';
  // }


  // if (editInfo.contactNumber) {
  //   // Check if the phone number is exactly 10 digits long and does not start with 1 to 5
  //   if (!/^[6-9]\d{9}$/.test(editInfo.contactNumber)) {
  //     errors.contactNumber = 'Invalid phone number';
  //   }
  // }

  if (editInfo.contactNumber) {
    // Check if the phone number is exactly 10 digits long and does not start with 1 to 5
    if (!/^[6-9]\d{9}$/.test(editInfo.contactNumber)) {
      errors.contactNumber = 'Invalid phone number';
    }
  }

  return errors;
};