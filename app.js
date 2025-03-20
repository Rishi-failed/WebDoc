function startInput() {
    document.getElementById("inputSection").style.display = "block";
}

function analyzeHealth() {
    document.getElementById("resultContainer").style.display = "block";

    let name = document.getElementById("name").value;
    let age = parseInt(document.getElementById("age").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);
    let gender = document.getElementById("gender").value;
    let waterIntake = parseFloat(document.getElementById("waterIntake").value);

    let foodChoices = [];
    document.querySelectorAll(".food-options input:checked").forEach((item) => {
        foodChoices.push(item.value);
    });

    let bedtime = document.getElementById("bedtime").value;
    let wakeTime = document.getElementById("wakeTime").value;

    let sleepDuration = calculateSleepDuration(bedtime, wakeTime);

    let heightMeters = height / 100;
    let bmi = (weight / (heightMeters * heightMeters)).toFixed(2);

    // Calculate BMR
    let bmr = calculateBMR(gender, weight, height, age);

    let dietAdvice = "";
    let riskAnalysis = "";

    if (foodChoices.includes("rice")) {
        dietAdvice += "Rice: Opt for brown rice or whole grains for more fiber and nutrients. Control portion sizes.";
        riskAnalysis += "Rice: High glycemic index (white rice), may lead to blood sugar spikes if consumed in excess.";
    }
    if (foodChoices.includes("fastfood")) {
        dietAdvice += "Fast food is high in unhealthy fats. Reduce intake and eat more whole foods. ";
        riskAnalysis += "Fast food Increased risk of obesity and heart disease. ";
    }
    if (foodChoices.includes("milk")) {
        dietAdvice += "Milk: Provides calcium and vitamin D for strong bones. ";
        riskAnalysis += "Milk: Risk of discomfort for those with lactose intolerance. ";
    }
    if (foodChoices.includes("meat")) {
        dietAdvice += "Meat:High in saturated fat, Choose lean cuts for protein without excess fat. ";
        riskAnalysis += "Meat: High consumption may increase cardiovascular risk. ";
    }
    if (foodChoices.includes("flour")) {
        dietAdvice += "Flour Items: Whole-grain options improve fiber content. ";
        riskAnalysis += "Flour Items: Refined flour can lead to blood sugar spikes. ";
    }
    if(foodChoices.includes("fried")) {
        dietAdvice += "Fried Items: Minimize intake to reduce trans fat consumption. ";
        riskAnalysis += "Fried Items: Increased risk of heart disease due to unhealthy fats. ";
    }
    if(foodChoices.includes("sugary")) {
        dietAdvice += "Sugary Food: Limit intake. Use natural sweeteners like honey or fruits in moderation.";
        riskAnalysis += "Sugary food:  High in empty calories, linked to obesity,diabetes,and tooth decay. ";
    }
    if(foodChoices.includes("caffeine")) {
        dietAdvice += "Caffeinated Drinks: Limit to 1-2 cups per day. Avoid late in the day.";
        riskAnalysis += "Caffeinated Drinks:May cause insomnia, anxiety, or increased heart rate. ";
    }
    if(foodChoices.includes("Pastries")) {
        dietAdvice += "Pastries & Baked Goods : Limit consumption. Opt for whole-grain or low-sugar alternatives .";
        riskAnalysis += "Pastries & Baked Goods : High in sugar, refined flour, and unhealthy fats. ";
    }
    if(foodChoices.includes("alcohol")) {
        dietAdvice += "Alcohol : Limit consumption.Mostly not recommended ";
        riskAnalysis += "Alcohol :High in empty calories, linked to liver disease and addiction . ";
    }
    if(foodChoices.includes("sweeteners")) {
        dietAdvice += "Artificial Sweeteners :Use sparingly. Opt for natural sweeteners like stevia or monk fruit.";
        riskAnalysis += "Artificial Sweeteners : May cause digestive issues or cravings for sweet foods . ";
    }
    if(foodChoices.includes("soft Drinks")) {
        dietAdvice += " Soft Drinks:High Sugar Content Empty Calories, Try to avoid ,go electolytes.";
        riskAnalysis += "Soft Drinks : weight gain, obesity, and type 2 diabetes(if consume more often) . ";
    }

    let sleepAdvice = sleepDuration < 7 ? "You should try to sleep at least 7-9 hours for optimal health." : "Great! You're getting enough sleep.";
    let strengthRecovery = "Eat protein-rich foods (meat, eggs, lentils) and stay hydrated(commonfor all),it differ based on the person diet";

    // Water Intake Analysis
    let recommendedWater = weight * 0.033; // 33ml per kg
    let hydrationAdvice = "";
    if (waterIntake < recommendedWater * 0.8) {
        hydrationAdvice = "🚰 You're drinking too little water! Increase your intake.";
    } else if (waterIntake > recommendedWater * 1.5) {
        hydrationAdvice = "⚠ Too much water can cause issues! Reduce intake.";
    } else {
        hydrationAdvice = "✅ Good job! Your hydration level is balanced.";
    }

    document.getElementById("results").innerHTML = `
        <h2>Health Analysis for ${name}</h2>
        <p><strong>BMI:</strong> ${bmi} (Healthy Range: 18.5 - 24.9)</p>
        <p><strong>BMR:</strong> ${bmr.toFixed(2)} calories/day(this is the amount of calories need to a person to do regular work like breathing,circulation)</p>
        <p><strong>You Slept for:</strong> ${sleepDuration} hours</p>
        <p><strong>Risk Analysis:</strong> ${riskAnalysis}</p>
        <p><strong>Diet Advice:</strong> ${dietAdvice}</p>
        <p><strong>Recommended Sleep Schedule:</strong> ${sleepAdvice}</p>
        <p><strong>How to Regain Strength:</strong> ${strengthRecovery}</p>
        <p><strong>Hydration Analysis:</strong> ${hydrationAdvice}</p>
        <h3>Your Health, Our Priority.</h3>
        <h3><strong>please consider a DOCTOR for a specified health analysis . Thank You!</h3>
    `;
}

function calculateSleepDuration(bedtime, wakeTime) {
    let [bedHour, bedMin] = bedtime.split(":").map(Number);
    let [wakeHour, wakeMin] = wakeTime.split(":").map(Number);

    let bedTimeMinutes = bedHour * 60 + bedMin;
    let wakeTimeMinutes = wakeHour * 60 + wakeMin;
    let sleepMinutes = wakeTimeMinutes - bedTimeMinutes;

    if (sleepMinutes < 0) sleepMinutes += 1440; // Handle past midnight

    return (sleepMinutes / 60).toFixed(1);
}

function calculateBMR(gender, weight, height, age) {
    if (gender === "male") {
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
}