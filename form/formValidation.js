function submitForm() {
  const container = document.querySelector('.mainContainer2');
  const messageBox = document.querySelector('.errOrSuccesMs p');
  const allData = {};
  const checkboxData = {};
  let isValid = true;
  let errorMessage = '';

  
  container.querySelectorAll('input[name], select[name], textarea[name]').forEach(inputs => {
      const name = inputs.name;

      if (!name) return;

      const isRequired = inputs.hasAttribute('required');

      if (inputs.type === 'checkbox') {
          if (!checkboxData[name]) checkboxData[name] = [];
          if (inputs.checked) checkboxData[name].push(inputs.value);
      } else if (inputs.tagName.toLowerCase() === 'select' && inputs.value === 'Other') {
          const otherInput = container.querySelector(`#${name}Other`);
          allData[name] = (otherInput && otherInput.value.trim()) || 'Other';
      } else {
          if (isRequired && inputs.value.trim() === '') {
              isValid = false;
              errorMessage = 'Please fill out all required fields.';
          }
          allData[name] = inputs.value;
      }
  });

  for (const [name, values] of Object.entries(checkboxData)) {
      allData[name] = values.length > 0 ? values : [];
      if (container.querySelector(`input[name="${name}"]`).required && values.length === 0) {
          isValid = false;
          errorMessage = 'Please select all required options.';
      }
  }


  const password = allData['password'];
  const confirmPassword = allData['confirmPassword'];
  
  if (password && confirmPassword && password !== confirmPassword) {
      isValid = false;
      errorMessage = 'Password and confirm password do not match.';
  }


  if (!isValid) {
      messageBox.textContent = errorMessage;
      messageBox.style.color = 'red';
      return; 
  }


  console.log('Collected form data:', allData);
  messageBox.textContent = 'Form submitted!';
  messageBox.style.color = 'green';

  
  container.querySelectorAll('input[name], select[name], textarea[name]').forEach(inputs => {
      if (inputs.type === 'checkbox' || inputs.type === 'radio') {
          inputs.checked = false;
      } else if (inputs.tagName.toLowerCase() === 'select') {
          inputs.selectedIndex = 0;
      } else {
          inputs.value = '';
      }
  });
}
function togglePassword(fieldId, icon) {
    const input = document.getElementById(fieldId);
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    icon.textContent = isPassword ? '🙈' : '👁️'; 
  }