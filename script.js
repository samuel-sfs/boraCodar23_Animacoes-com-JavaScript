
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
            if (!isValidInput()) {
                return;
            }
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

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);

    for (let [key, value] of data) {
        console.log(key, value);
    }
    alert(`Obrigado ${data.get('name')}!`)
})

function updateActiveStep() {
    formSteps.forEach(step => step.classList.remove('active'));
    formSteps[currentStep].classList.add('active');
}

const progressSteps = document.querySelectorAll('.step-progress [data-step]')
function updateProgressStep() {
    progressSteps.forEach((step, idx) => {
        step.classList.remove('active');
        step.classList.remove('done');

        if (idx < currentStep + 1) {
            step.classList.add('active')
        }

        if (idx < currentStep) {
            step.classList.add('done');
        }
    })
}

function isValidInput() {
    const currentFormStep = formSteps[currentStep]
    const formFiels = [...currentFormStep.querySelectorAll('input'), ...currentFormStep.querySelectorAll('textarea')]

    return formFiels.every((input) => input.reportValidity());
}

formSteps.forEach(formStep => {
    function addHide() {
        formStep.classList.add('hide')
    }

    formStep.addEventListener('animationend', () => {
        addHide();
        formSteps(currentStep).classList.remove('hide');
    })

})
