function startInput() {
    document.getElementById("inputSection").style.display = "block";
}
function validateAndAnalyze() {
    clearErrors();
    let isValid = true;

    // Show the loading GIF
    document.getElementById("loadingGif").style.display = "block";

    // Validate all fields
    let name = document.getElementById("name").value.trim();
    if (name === "") {
        document.getElementById("nameError").innerText = "Name is required.";
        isValid = false;
    }

    let age = document.getElementById("age").value;
    if (age === "" || age < 1 || age > 100) {
        document.getElementById("ageError").innerText = "Age must be between 1 and 100.";
        isValid = false;
    }

    let weight = document.getElementById("weight").value;
    if (weight === "" || weight < 10 || weight > 250) {
        document.getElementById("weightError").innerText = "Weight must be between 10 and 250 kg.";
        isValid = false;
    }

    let height = document.getElementById("height").value;
    if (height === "" || height < 20 || height > 250) {
        document.getElementById("heightError").innerText = "Height must be between 20 and 250 cm.";
        isValid = false;
    }

    let gender = document.getElementById("gender").value;
    if (gender === "") {
        document.getElementById("genderError").innerText = "Gender is required.";
        isValid = false;
    }

    let activityLevel = document.getElementById("activityLevel").value;
    if (activityLevel === "") {
        document.getElementById("activityLevelError").innerText = "Activity Level is required.";
        isValid = false;
    }

    let waterIntake = document.getElementById("waterIntake").value;
    if (waterIntake === "" || waterIntake <= 0) {
        document.getElementById("waterIntakeError").innerText = "Water intake must be a positive number.";
        isValid = false;
    }

    if (isValid) {
        // Simulate a delay for analysis (e.g., 2 seconds)
        setTimeout(() => {
            analyzeHealth();
            // Do NOT hide the GIF after analysis
        }, 2000); // Adjust the delay as needed
    } else {
        // Hide the loading GIF if validation fails
        document.getElementById("loadingGif").style.display = "block";
    }
}


function clearErrors() {
    let errorElements = document.querySelectorAll(".error");
    errorElements.forEach((element) => {
        element.innerText = "";
    });
}

function analyzeHealth() {
    document.getElementById("resultContainer").style.display = "block";

    let name = document.getElementById("name").value;
    let age = parseInt(document.getElementById("age").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);
    let gender = document.getElementById("gender").value;
    let waterIntake = parseFloat(document.getElementById("waterIntake").value);
    let activityLevel = parseFloat(document.getElementById("activityLevel").value);

    let foodChoices = [];
    document.querySelectorAll(".food-options input:checked").forEach((item) => {
        foodChoices.push(item.value);
    });

    let bedtime = document.getElementById("bedtime").value;
    let wakeTime = document.getElementById("wakeTime").value;

    let sleepDuration = calculateSleepDuration(bedtime, wakeTime);

    let heightMeters = height / 100;
    let bmi = (weight / (heightMeters * heightMeters)).toFixed(2);

    let bmr = calculateBMR(gender, weight, height, age);
    let tdeeDaily = bmr * activityLevel;
    let tdeeWeekly = tdeeDaily * 7;

    // Calculate Calorie Intake (Weekly)
    let calorieIntakeWeekly = calculateCalorieIntake(foodChoices) * 7;

    // Calculate Calories Needed (Weekly)
    let caloriesNeededWeekly = tdeeWeekly - calorieIntakeWeekly;

    // Determine calorie status
    let calorieStatus = "";
    if (caloriesNeededWeekly > 0) {
        calorieStatus = `You need to consume <strong>${caloriesNeededWeekly.toFixed(2)} calories/week</strong> more to meet your weekly energy needs.`;
    } else if (caloriesNeededWeekly < 0) {
        calorieStatus = `You are consuming <strong>${Math.abs(caloriesNeededWeekly).toFixed(2)} calories/week</strong> more than your weekly energy needs. These excess calories will be stored as fat.`;
    } else {
        calorieStatus = "Your calorie intake matches your weekly energy needs. You are in balance.";
    }
    let breakfastTime = document.getElementById("breakfastTime").value;
    let lunchTime = document.getElementById("lunchTime").value;
    let dinnerTime = document.getElementById("dinnerTime").value;

    let mealTimingAdvice = "";

    // Breakfast timing advice
    let breakfastHour = parseInt(breakfastTime.split(":")[0]);
    if (breakfastHour > 9) {
        mealTimingAdvice += "Breakfast: Try to eat breakfast within 1-2 hours of waking up to kickstart your metabolism.||";
    }

    // Lunch timing advice
    let lunchHour = parseInt(lunchTime.split(":")[0]);
    if (lunchHour < 12 || lunchHour > 14) {
        mealTimingAdvice += "Lunch: Aim to eat lunch between 12 PM and 2 PM to maintain energy levels.||";
    }
     // Dinner timing advice
     let dinnerHour = parseInt(dinnerTime.split(":")[0]);
     if (dinnerHour > 20) {
         mealTimingAdvice += "Dinner: Try to eat dinner at least 2-3 hours before bedtime for better digestion and sleep.||";
     }



    let dietAdvice = "";
    let riskAnalysis = "";

    // Add diet advice and risk analysis based on food choices
    if (foodChoices.includes("rice")) {
        dietAdvice += "Rice: Opt for brown rice or whole grains for more fiber and nutrients||ss.";
        riskAnalysis += "Rice: High glycemic index (white rice), may lead to blood sugar spikes if consumed in excess||.";
    }
    if (foodChoices.includes("fastfood")) {
        dietAdvice += "Fast food is high in unhealthy fats. Reduce intake and eat more whole foods||. ";
        riskAnalysis += "Fast food Increased risk of obesity and heart disease.|| ";
    }
    if (foodChoices.includes("dairy")) {
        dietAdvice += "Milk: Provides calcium and vitamin D for strong bones||. ";
        riskAnalysis += "Milk: Risk of discomfort for those with lactose intolerance||. ";
    }
    if (foodChoices.includes("meat")) {
        dietAdvice += "Meat:High in saturated fat, Choose lean cuts for protein without excess fat||. ";
        riskAnalysis += "Meat: High consumption may increase cardiovascular risk||. ";
    }
    if (foodChoices.includes("flour")) {
        dietAdvice += "Flour Items:wheat with skin (Whole-grain) options improve fiber content.|| ";
        riskAnalysis += "Flour Items: Refined flour can lead to blood sugar spikes||. ";
    }
    if (foodChoices.includes("fried")) {
        dietAdvice += "Fried Items: Minimize intake to reduce trans fat consumption.|| ";
        riskAnalysis += "Fried Items: Increased risk of heart disease due to unhealthy fats||. ";
    }
    if (foodChoices.includes("sugary")) {
        dietAdvice += "Sugary Food: Limit intake. Use natural sweeteners like honey or fruits in moderation||.";
        riskAnalysis += "Sugary food:  High in empty calories, linked to obesity,diabetes,and tooth decay||. ";
    }
    if (foodChoices.includes("caffeine")) {
        dietAdvice += "Caffeinated Drinks: Limit to 1-2 cups per day. Avoid late in the day||.";
        riskAnalysis += "Caffeinated Drinks:May cause insomnia, anxiety, or increased heart rate||. ";
    }
    if (foodChoices.includes("alcohol")) {
        dietAdvice += "Alcohol : Limit consumption.Mostly not recommended||. ";
        riskAnalysis += "Alcohol :High in empty calories, linked to liver disease and addiction||. ";
    }
    if (foodChoices.includes("soft Drinks")) {
        dietAdvice += " Soft Drinks:High Sugar Content Empty Calories, Try to avoid ,go electolytes||.";
        riskAnalysis += "Soft Drinks : weight gain, obesity, and type 2 diabetes(if consume more often)||. ";
    }
    if (foodChoices.includes("seafood")) {
        dietAdvice += "seafood :it has vitaminB12,vitamin B,omega 3-fatty acid||.";
        riskAnalysis += "try to avoid oilfried seafood||.";
    }
    if (foodChoices.includes("processed")) {
        dietAdvice += "processed food: limit intake,mostly not recommended||.";
        riskAnalysis += "processed food: high sodium contunt , artificial preservativs,low nutrients||.";
    }
    if (foodChoices.includes("nuts")) {
        dietAdvice += "nuts & millets has vitamin B6,vitamin E,healthy fat,zinc||.";
        riskAnalysis += "nuts & millets do not go for excess consume||.";
    }
    if (foodChoices.includes("fruits")) {
        dietAdvice += "fruits have vitamins A,vitamin K,vitamin C,potassium,solubel fiber||.";
        riskAnalysis += "";
    }
    if (foodChoices.includes("vegetables")) {
        dietAdvice += "vegetables : take more lettuce for irons,its good to consume more often||.";
        riskAnalysis += "";
    }

    let sleepAdvice = sleepDuration < 7 ? "You should try to sleep at least 7-9 hours for optimal health." : "Great! You're getting enough sleep.";
    let strengthRecovery = "Eat protein-rich foods (meat, eggs, lentils) and stay hydrated (common for all). It differs based on the person's diet.";

    let recommendedWater = weight * 0.033; // 33ml per kg
    let hydrationAdvice = "";
    if (waterIntake < recommendedWater * 0.8) {
        hydrationAdvice = "🚰 You're drinking too little water! Increase your intake ⬆ .";
    } else if (waterIntake > recommendedWater * 1.5) {
        hydrationAdvice = "⚠ Too much water can cause issues! Reduce intake ⬇.";
    } else {
        hydrationAdvice = "✅ Good job! Your hydration level is balanced.";
    }

    document.getElementById("results").innerHTML = `
        <h2>Health Analysis for ${name}</h2>
        <p><strong>BMI:</strong> ${bmi} (Healthy Range: 18.5 - 24.9)</p>
        <p><strong>BMR:</strong> ${bmr.toFixed(2)} calories/day (for breathing, circulation)</p>
        <p><strong>Total Calories required per week (TDEE):</strong> ${tdeeWeekly.toFixed(2)} calories/week</p>
        <p><strong>Calorie Intake (Weekly):</strong> ${calorieIntakeWeekly.toFixed(2)} calories/week</p>
        <p><strong>Calorie Status:</strong> ${calorieStatus}</p>
         <p><strong>Meal Timing Advice:</strong> ${mealTimingAdvice}</p>
        <p><strong>You Slept for:</strong> ${sleepDuration} hours</p>
        <p><strong>Risk Analysis:</strong> ${riskAnalysis}</p>
        <p><strong>Diet Advice:</strong> ${dietAdvice}</p>
        <p><strong>Recommended Sleep Schedule:</strong> ${sleepAdvice}</p>
        <p><strong>How to Regain Strength:</strong> ${strengthRecovery}</p>
        <p><strong>Hydration Analysis:</strong> ${hydrationAdvice}</p>
        <h3>Your Health, Our Priority.</h3>
        <h3><strong>Please consider a DOCTOR for a specified health analysis. Thank You!</strong></h3>
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

function calculateCalorieIntake(foodChoices) {
    const calorieMap = {
        "rice": 200,       // 200 calories per serving of rice
        "meat": 250,       // 250 calories per serving of meat
        "flour": 150,      // 150 calories per serving of flour items
        "fastfood": 300,   // 300 calories per serving of fast food
        "fried": 400,      // 400 calories per serving of fried items
        "fruits": 100,     // 100 calories per serving of fruits
        "vegetables": 50,  // 50 calories per serving of vegetables
        "nuts": 200,       // 200 calories per serving of nuts
        "sugary": 300,     // 300 calories per serving of sugary foods
        "seafood": 200,    // 200 calories per serving of seafood
        "dairy": 150,      // 150 calories per serving of dairy products
        "caffeine": 50,    // 50 calories per serving of caffeinated drinks
        "alcohol": 200,    // 200 calories per serving of alcohol
        "processed": 250,  // 250 calories per serving of processed food
        "soft Drinks": 150 // 150 calories per serving of soft drinks
    };

    let totalCalories = 0;
    foodChoices.forEach((food) => {
        // Get the selected serving range for the food item
        let servings = parseFloat(document.getElementById(`${food}Servings`).value);
        totalCalories += (calorieMap[food] || 0) * servings;
    });

    return totalCalories;
}