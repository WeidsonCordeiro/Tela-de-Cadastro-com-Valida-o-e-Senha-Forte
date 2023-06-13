//IIFE - Immediately Invoked Function Expressions
'use strict';

(function () {

    const passwordEye = document.querySelector('[data-password-eye]');
    const inputPassword = document.querySelector('[name="password"]');
    const state = {showPassord: false};

    function onPasswordEyeClick(event){
        
        event.preventDefault();
        passwordEye.classList.toggle('slash');
        
        inputPassword.setAttribute('type', state.showPassord ? 'password' : 'text');
        state.showPassord = !state.showPassord;
        
    };

    const setListeners = () => {
        passwordEye.addEventListener('click', onPasswordEyeClick);
    };

    const init = () => {
        setListeners();
    };

    init();

})();
