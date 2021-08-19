// ^[a-zA-Z]{3,10}$|^([a-zA-Z]+ {1}[a-zA-Z]+){5,20}$

class FormSubmission {
  constructor() {
    this.patterns = {
      floatingName: /^[a-zA-Z]+.?[a-zA-Z]*$/i,
      floatingMail: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
      floatingPhone: /^\+\d{13}$|^(080|090|070|081)\d{8}$/,
      floatingOrganization: /f/i,
      floatingMessage: /f/i,
    };
    this.form = document.getElementById('form');
    this.inputNotValidCount = document.querySelectorAll('.form-control').length;
    this.successToast = document.getElementById('successToast');
    this.nameField = document.getElementById('floatingName');
    this.emailField = document.getElementById('floatingMail');
    this.phoneField = document.getElementById('floatingPhone');
    this.organizationField = document.getElementById('floatingOrganization');
    this.messageField = document.getElementById('floatingMessage');
    this.submitButton = document.getElementById('submitBtn');
    this.formData = {
      recipientName: '',
      recipientMail: '',
      recipientPhone: '',
      recipientOrganization: '',
      recipientMessage: '',
    };
  }
  resetForm = () => {
    this.nameField.value = '';
    this.emailField.value = '';
    this.phoneField.value = '';
    this.organizationField.value = '';
    this.messageField.value = '';
  };
  checkFormValidityOnSubmit = () => {
    let errorCount = document.querySelectorAll('.form-control').length;
    Array.prototype.slice
      .call(document.querySelectorAll('.form-control'))
      .forEach((input) => {
        const { id, value, classList } = input;
        if (!this.patterns[id].test(value)) {
          classList.add('is-invalid');
        } else {
          errorCount -= 1;
        }
      });
    if (errorCount === 0) {
      this.sendFormDataServer();
    }
  };
  submitForm = async (e) => {
    await fetch(`${location.origin}/api/reply/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipientName: this.nameField.value,
        recipientMail: this.emailField.value,
        recipientPhone: this.phoneField.value,
        recipientOrganization: this.organizationField.value,
        recipientMessage: this.messageField.value,
      }),
    });
    const result = await response.json();
    // console.log('resp', result);
  };
  validateFieldOnKeypress = (e) => {
    const { id, value, classList } = e.target;
    const regex = this.patterns[id];
    if (!regex.test(value)) {
      classList.add('is-invalid');
    } else {
      classList.remove('is-invalid');
    }
  };
  sendFormDataServer = async () => {
    this.submitButton.textContent = 'sending message...';
    this.submitButton.disabled = true;
    const response = await fetch(`${location.origin}/api/reply/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipientName: this.nameField.value,
        recipientMail: this.emailField.value,
        recipientPhone: this.phoneField.value,
        recipientOrganization: this.organizationField.value,
        recipientMessage: this.messageField.value,
      }),
    });
    const result = await response.json();
    // console.log('resp', result);
    if (result.success) {
      this.submitButton.textContent = 'message sent';
      this.resetForm();
      setTimeout(() => {
        this.submitButton.textContent = 'reach out';
      }, 2000);
    } else {
      this.submitButton.textContent = 'error... resend';
    }
    this.submitButton.disabled = false;
  };
}

let formAction;

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Loaded');
  formAction = new FormSubmission();
  formAction.nameField.addEventListener(
    'keyup',
    formAction.validateFieldOnKeypress
  );
  formAction.emailField.addEventListener(
    'keyup',
    formAction.validateFieldOnKeypress
  );
  formAction.phoneField.addEventListener(
    'keyup',
    formAction.validateFieldOnKeypress
  );
  formAction.organizationField.addEventListener(
    'keyup',
    formAction.validateFieldOnKeypress
  );
  formAction.messageField.addEventListener(
    'keyup',
    formAction.validateFieldOnKeypress
  );

  formAction.form.addEventListener('submit', (e) => {
    e.preventDefault();
    formAction.checkFormValidityOnSubmit();
  });
});
