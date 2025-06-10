
let currentStep = 0;
const formSteps = document.querySelectorAll('.form-step');
const inputTelefone = document.getElementById('phone');
const form = document.querySelector('form');


inputTelefone.addEventListener('input', function (e) {
    let valor = e.target.value.replace(/\D/g, '');
    let formatado = '';

    if (valor.length > 0) {
        formatado += '(' + valor.substring(0, 2);
    }
    if (valor.length > 2) {
        formatado += ')' + valor.substring(2, 7);
    }
    if (valor.length > 7) {
        formatado += '-' + valor.substring(7, 11);
    }
    e.target.value = formatado;
});


form.addEventListener('click', (e) => {
    if (!e.target.matches('[data-action]')) {
        return;
    }

    const actions = {
        next() {
            currentStep++;
        },
        prev() {
            currentStep--;
        }
    }

    const action = e.target.dataset.action;
    actions[action]();
    updateActiveStep();
    updateProgressStep();

});

form.addEventListener('submit', (f) => {
    f.preventDefault();
})

function updateActiveStep() {
    formSteps.forEach(step => step.classList.remove('active'));
    formSteps[currentStep].classList.add('active');
}

function updateProgressStep() { }
