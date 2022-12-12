module.exports.validateRegisterInput = (
    firstname,
    lastname,
    username,
    email,
    password,
    confirmPassword
  ) => {
    const errors = {};
    if (firstname.trim() === '') {
      errors.username = 'firstname is required';
    }
    if (lastname.trim() === '') {
        errors.username = 'lastname is required';
    }
    if (username.trim() === '') {
        errors.username = 'username is required';
    }  
    if (email.trim() === '') {
      errors.email = 'email is required';
    } else {
      const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!email.match(regEx)) {
        errors.email = 'email address is not valid';
      }
    }
    if (password === '') {
      errors.password = 'Password is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Password does not match';
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };

  module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === '') {
      errors.username = 'Username is required';
    }
    if (password.trim() === '') {
      errors.password = 'Password is required';
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };
  