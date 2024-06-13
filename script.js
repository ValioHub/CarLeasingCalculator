document.addEventListener('DOMContentLoaded', function (params) {
    const carType = document.getElementById('carType');
    const carValueInput = document.getElementById('carValueInput');
    const carValueRange = document.getElementById('carValueRange');
    const leaserPeriodInput = document.getElementById('leasePeriodInput');
    const downPaymentInput = document.getElementById('downPaymentInput');
    const downPaymentRange = document.getElementById('downPaymentRange');

    const leasingCost = document.getElementById('leasingCost');
    const downPaymentValue = document.getElementById('downPaymentValue');
    const monthlyInstallment = document.getElementById('monthlyInstallment');
    const interestRate = document.getElementById('interestRate');

    const updateValues = () => {
        const carValue = parseFloat(carValueInput.value);
        const leasePeriod = parseFloat(leaserPeriodInput.value);
        const downPaymentPercentValue = parseFloat(downPaymentInput.value);

        let rate;
        if (carType.value === 'new') {
            rate = 2.99;
        } else {
            rate = 3.7;
        }
        interestRate.textContent = rate.toFixed(2) + '%';

        const downPaymentAmount = (downPaymentPercentValue / 100) * carValue;
        downPaymentValue.textContent = '€' + downPaymentAmount.toFixed(2);

        const principal = carValue - downPaymentAmount;
        const monthlyRate = rate / 100 / 12;
        const monthlyInstallmentAmount = principal * monthlyRate / (1 - (1 + monthlyRate) ** (-leasePeriod));
        monthlyInstallment.textContent = '€' + monthlyInstallmentAmount.toFixed(2);

        const totalCost = downPaymentAmount + (monthlyInstallmentAmount * leasePeriod);
        leasingCost.textContent = '€' + totalCost.toFixed(2);
    };

    carValueInput.addEventListener('input', () => {
        carValueRange.value = carValueInput.value;
        updateValues();
    });

    carValueRange.addEventListener('input', () => {
        carValueInput.value = carValueRange.value;
        updateValues();
    });

    leaserPeriodInput.addEventListener('input', updateValues);

    downPaymentInput.addEventListener('input', () => {
        downPaymentRange.value = downPaymentInput.value;
        updateValues();
    })

    downPaymentRange.addEventListener('input', () => {
        downPaymentInput.value = downPaymentRange.value;
        updateValues();
    })

    carType.addEventListener('change', updateValues)
})