function showError(input, errorSpan, message) {
    input.classList.add("error");
    errorSpan.textContent = message;
    input.setCustomValidity(message);
};

function clearError(input, errorSpan) {
    input.classList.remove("error");
    errorSpan.textContent = "";
    input.setCustomValidity("");
};

// Email

const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail() {
    clearError(email, emailError);

    if(email.validity.valueMissing) {
        showError(email, emailError, "This field is required.");
    } else if(!emailRegex.test(email.value)) {
        showError(email, emailError, "Invalid email address.");
    }; 
};

// Country

const country = document.querySelector("#country");

// Postal Code

const postalCode = document.querySelector("#postal-code");
const postalCodeError = document.querySelector("#postal-code-error");

function validatePostalCode() {
    clearError(postalCode, postalCodeError);

    const postalCodePatterns = {
        "PT": /^\d{4}-\d{3}$/,
        "US": /^\d{5}(-\d{4})?$/,
        "CA": /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/,
        "UK": /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/,
        "DE": /^\d{5}$/,
        "FR": /^\d{5}$/,
    };

    const pattern = postalCodePatterns[country.value];

    if(postalCode.validity.valueMissing) {
        showError(postalCode, postalCodeError, "This field is required.");
    } else if (pattern && !pattern.test(postalCode.value)) {
        showError(postalCode, postalCodeError, "Invalid postal code for the country selected.");
    };
};

// Password 

const password = document.querySelector("#password");
const passwordError = document.querySelector("#password-error");
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

function validatePassword() {
    clearError(password, passwordError);

    if(password.validity.valueMissing) {
        showError(password, passwordError, "This field is required.");
    } else if(!passwordRegex.test(password.value)) {
        showError(password, passwordError, "Min. 8 characters, with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character");
    };
};

// Password confirmation

const passwordConfirmation = document.querySelector("#password-confirmation");
const passwordConfirmationError = document.querySelector("#password-confirmation-error");

function validatePasswordMatch() {
    clearError(passwordConfirmation, passwordConfirmationError);

    if(passwordConfirmation.validity.valueMissing) {
        showError(passwordConfirmation, passwordConfirmationError, "This field is required.");
    } else if(passwordConfirmation.value !== password.value) {
        showError(passwordConfirmation, passwordConfirmationError, "Passwords must match");
    };
};

// Event Listeners

function setupFieldValidation(input, validateFunc) {
    input.addEventListener("blur", validateFunc);
    input.addEventListener("input", () => {
        if(input.classList.contains("error")) {
            validateFunc();
        };
    });
};

setupFieldValidation(email, validateEmail);
setupFieldValidation(postalCode, validatePostalCode);
setupFieldValidation(password, validatePassword);
setupFieldValidation(passwordConfirmation, validatePasswordMatch);


const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    validateEmail();
    validatePostalCode();
    validatePassword();
    validatePasswordMatch();

    if(!form.checkValidity()) {
        event.preventDefault();
    };
});