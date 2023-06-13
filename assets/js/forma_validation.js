//IIFE - Immediately Invoked Function Expressions
'use strict';

(function () {

    const form = document.querySelector('[data-form]');
    const progressBar = document.querySelector('[data-requirement-progressbar]');
    const fields = {};
    const requiments = {};
    const state = { passwordStrength: 0 };

    const styleProgressBar = () => {
        progressBar.style.width = `${state.passwordStrength}%`;
        progressBar.dataset.percentage = state.passwordStrength; //progressBar.dataset.['percentage']
    };

    const showMessageError = (field, message) => {
        const { element, errorElement } = field;
        element.classList.add('error');
        errorElement.style.display = 'block';
        errorElement.textContent = message;
    };

    const hideMessageError = (field, message) => {
        const { element, errorElement } = field;
        element.classList.remove('error');
        errorElement.style.display = 'none';
        errorElement.textContent = '';
    };

    const checkPasswordError = (requimentName, condition) => {

        if (condition) {
            state.passwordStrength += 25;
            requiments[requimentName].classList.add('checked');
        } else {
            requiments[requimentName].classList.remove('checked');
        };
    };

    const validateRequiredFields = () => {
        let isInvalide = false;

        for (const fieldNameKey in fields) {

            const field = fields[fieldNameKey];
            const { element, isRequired } = field;

            if ((!element.value || (fieldNameKey === 'checkbox' && !element.checked)) && isRequired) {
                isInvalide = true;
                showMessageError(field, "Este campo é obrigatório!");
            };

        };

        return isInvalide;
    };

    const validatePasswordStrength = () => {

        let isInvalide = false;
        const field = fields['password'];

        if (state.passwordStrength < 100) {
            isInvalide = true;
            showMessageError(field, 'Digite uma senha válida!');
        };

        return isInvalide;
    };

    const validateEmail = () => {

        let isInvalide = false;
        const field = fields['email'];
        const {value} = field.element
        //[a-zA-Z0-9_] = \w        
        if (!value.match(/^[\w\.]+@\w+(\.\w+)+$/)) { //value.match(/^[a-zA-Z0-9_\.]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/)
            isInvalide = true;
            showMessageError(field, 'Digite um e-mail valido!');
        };

        return isInvalide;
    };

    const onInputPasswordKeyup = (event) => {
        event.preventDefault();
        const { value } = event.target;
        //Regular Expression
        //RegExp
        /*
            RegExp(/[a]/) = Tenha pelo mesnos uma letra a.
            RegExp(/^[a]/) = Começa com letra a.
            RegExp(/[a]$/) = Termina com letra a.
            RegExp(/^[a]$/) = Começa e Termina com letra a.
            RegExp(/^[a]{3}$/) = Começa e Termina com 3 letras a.
            RegExp(/^[a-z]{3}$/) = Começa e Termina com qualquer caracter de a-z com 3 letras.
            RegExp(/^[a]+$/) = Pelo menos um a, porém sem quantidade especifica.
        */
        // Tranformando em boolean !!value.match(regexp)
        const lowerCasePattern = new RegExp(/[a-z]/);
        const upperCasePattern = new RegExp(/[A-Z]/);
        const numberPattern = new RegExp(/[0-9]/);
        const specialPattern = new RegExp(/[!@#$%&^()*+,-.:;<=>?[\]^_`{|}~]/);

        state.passwordStrength = 0;

        checkPasswordError('lowerUpperCase', value.match(lowerCasePattern) && value.match(upperCasePattern));
        checkPasswordError('number', value.match(numberPattern));
        checkPasswordError('specialCharacter', value.match(specialPattern));
        checkPasswordError('minCharacter', value.length >= 8);

        styleProgressBar();

    };

    const onInputFocus = (event) => {
        event.preventDefault();
        const field = fields[event.target.name];
        hideMessageError(field);
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        if (validateRequiredFields()) return;
        if (validateEmail()) return;        
        if (validatePasswordStrength()) return;

        alert("Dados prontos para serem enviado!");
    };

    const setListeners = () => {
        form.addEventListener('submit', onFormSubmit);

        for (const fieldNameKey in fields) {
            const { element } = fields[fieldNameKey];
            element.addEventListener('focus', onInputFocus);

            if (fieldNameKey === 'password') element.addEventListener('keyup', onInputPasswordKeyup);
        };

    };

    const setRequirementItemsElements = () => {
        const requirementItemsElements = document.querySelectorAll('[data-requirement-item]');

        for (const requirementItem of requirementItemsElements) {
            const requirementName = requirementItem.dataset['requirementItem']; /*Igual à "requirement-item"*/
            requiments[requirementName] = requirementItem;
        };

    };

    const setFieldElements = () => {
        const inputElements = document.querySelectorAll('[data-input]');

        for (const input of inputElements) {
            const inputName = input.getAttribute('name');

            fields[inputName] = {
                element: input,
                errorElement: input.parentElement.querySelector('[data-error-message]'),
                isRequired: input.hasAttribute('required')
            };

            input.removeAttribute('required');
        };

    };

    const init = () => {
        setFieldElements();
        setRequirementItemsElements();
        setListeners();
    };

    init();
})();
