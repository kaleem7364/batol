document.addEventListener('DOMContentLoaded', function() {
    // العناصر الأساسية
    const calculateBtn = document.getElementById('calculate');
    const resetBtn = document.getElementById('reset');
    const applianceSelect = document.getElementById('appliance');
    const wattageInput = document.getElementById('wattage');
    const hoursInput = document.getElementById('hours');
    const daysInput = document.getElementById('days');
    const rateInput = document.getElementById('rate');
    const dailyConsumption = document.getElementById('daily-consumption');
    const monthlyConsumption = document.getElementById('monthly-consumption');
    const monthlyCost = document.getElementById('monthly-cost');
    
    // بيانات الأجهزة المسبقة
    const applianceData = {
        'fridge': { wattage: 150, hours: 24 },
        'ac': { wattage: 2000, hours: 8 },
        'tv': { wattage: 100, hours: 5 },
        'washing': { wattage: 500, hours: 1 },
        'heater': { wattage: 1500, hours: 2 },
        'light': { wattage: 60, hours: 6 },
        'other': { wattage: 0, hours: 0 }
    };
    
    // إعداد الرسم البياني
    const ctx = document.getElementById('consumptionChart').getContext('2d');
    const consumptionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['اليومي', 'الشهري'],
            datasets: [{
                label: 'استهلاك الكهرباء (كيلوواط ساعة)',
                data: [0, 0],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'كيلوواط ساعة'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'مقارنة الاستهلاك اليومي والشهري'
                },
                legend: {
                    display: false
                }
            }
        }
    });
    
    // حدث اختيار جهاز
    applianceSelect.addEventListener('change', function() {
        const selectedAppliance = this.value;
        if (selectedAppliance && selectedAppliance !== 'other') {
            wattageInput.value = applianceData[selectedAppliance].wattage;
            hoursInput.value = applianceData[selectedAppliance].hours;
        } else if (selectedAppliance === 'other') {
            wattageInput.value = '';
            hoursInput.value = '';
        }
    });
    
    // حدث حساب الاستهلاك
    calculateBtn.addEventListener('click', function() {
        const wattage = parseFloat(wattageInput.value);
        const hours = parseFloat(hoursInput.value);
        const days = parseFloat(daysInput.value);
        const rate = parseFloat(rateInput.value);
        
        if (isNaN(wattage) || isNaN(hours) || isNaN(days) || isNaN(rate)) {
            alert('الرجاء إدخال قيم صحيحة في جميع الحقول');
            return;
        }
        
        // حساب الاستهلاك
        const daily = (wattage * hours) / 1000;
        const monthly = daily * days;
        const cost = monthly * rate;
        
        // عرض النتائج
        dailyConsumption.textContent = daily.toFixed(2);
        monthlyConsumption.textContent = monthly.toFixed(2);
        monthlyCost.textContent = cost.toFixed(2);
        
        // تحديث الرسم البياني
        consumptionChart.data.datasets[0].data = [daily, monthly];
        consumptionChart.update();
    });
    
    // حدث إعادة التعيين
    resetBtn.addEventListener('click', function() {
        applianceSelect.value = '';
        wattageInput.value = '';
        hoursInput.value = '';
        daysInput.value = '30';
        rateInput.value = '0.18';
        dailyConsumption.textContent = '0';
        monthlyConsumption.textContent = '0';
        monthlyCost.textContent = '0';
        
        // إعادة تعيين الرسم البياني
        consumptionChart.data.datasets[0].data = [0, 0];
        consumptionChart.update();
    });
});
