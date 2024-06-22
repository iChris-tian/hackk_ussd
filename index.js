const express = require("express");

const router = express.Router();

router.post("/ussd", (req, res) => {

  // Read variables sent via POST from our SDK
  
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  console.log('####################', req.body);
  let response = "";

  // Chained IF statements will take us through the USSD logic
    if (text === "") {
        console.log(text);
        // This is the first request 
        // Start responses with CON if they have further options/they CONtinue
        response = `CON Welcome to ClimaSync! Ikaze kuri ClimaSync
        Choose a language/ Hitamo ururimi:
        1. English
        2. Kinyarwanda `;
    } else if (text === "1") {
        // Business logic for first level response
        // response = `CON Please enter your registration number:
        //     1. Yes
        //     2. No`;
        response = `CON Select a service of your choice
    1. Weather Check
    2. Farming Consultation
    3. Pollution Report 
    4. Environmental Conservation `;

    } else if (text === "1*1") {
        response = `CON Enter your location:
      1. Kigali City
      2. Northern Province
      3. Eastern Province
      4. Western Province`;
    } else if (text === "1*1*1") {
        const weatherInfo = "Current weather: Sunny, 25°C";
        response = `END Kigali ${weatherInfo}`
    } else if (text === "1*1*2") {
        const weatherInfo = "Current weather: Sunny, 25°C";
        response = `END Northern Province ${weatherInfo}`
    } else if (text === "1*1*3") {
        const weatherInfo = "Current weather: Sunny, 25°C";
        response = `END Eastern Province ${weatherInfo}`
    } else if (text === "1*1*4") {
        const weatherInfo = "Current weather: Sunny, 25°C";
        response = `END Western Province ${weatherInfo}`
    } else if (text === "1*2") {
        response = `CON Select a service of your choice
    1. Farming Season
    2. About fertilizers
    3. Talk to our specialist`;
    } else if (text === "1*2*1") {
        
         fetch(
            "http://localhost:3004/farming/1")
        

        response = `END Check SMS`;
    } else if (text === "1*2*2") {
        fetch(
            "http://localhost:3004/fertilizers/1")
        response = `END Check SMS`;
    } else if (text === "1*2*3") {
        response = `END Call 100`;
    } else if (text === "1*3") {
        response = `END Pollution Report:
      1. Kigali City
      2. Northern Province
      3. Eastern Province
      4. Western Province`;
    } else if (text === "1*4") {
        response = `END Environmental Conservation:
      1. Reduce plastic use
      2. Plant trees
      3. Recycle `
    }
  
  
  
  
    /// kinyarwanda flow
  
    else if (text === "2") {
        // Business logic for first level response, option 2
        // Start the response with END since it does not proceed further, (terminal request) it ENDs
    
        response = `CON Hitamo serivisi wifuza
    1. Kuraba iteganyagihe
    2. Ubujyanama kubuhinzi
    3. Gutangaza amakuru yo kwangiza ikirere
    4. Gahunda yo kwita kubidukikije`;
      
    }
    else if (text === "2*1") {
        response = `CON Hitamo intara:
      1. Kigali
      2. Amajyaruguru
      3. Iburasirazuba
      4. Iburengerazuba`;
    }
    else if (text === "2*1*1") {
        const weatherInfo = "uko bimeze: Ubushyuhe bwiganje, 25°C";
        response = `END Kigali ${weatherInfo}`
    } else if (text === "2*1*2") {
        const weatherInfo = "uko bimeze: Ubushyuhe bwiganje, 25°C";
        response = `END Amajyaruguru ${weatherInfo}`
    } else if (text === "2*1*3") {
        const weatherInfo = "uko bimeze: Ubushyuhe bwiganje, 25°C";
        response = `END Iburasirazuba ${weatherInfo}`
    } else if (text === "2*1*4") {
        const weatherInfo = "uko bimeze: Ubushyuhe bwiganje, 25°C";
        response = `END Iburengerazuba ${weatherInfo}`
    } else if (text === "2*2") {
        response = `CON Hitamo
    1. Kumenya ibyigihe cy'ihinga
    2. Kumenya ibyifumbire
    3. Vugana ni impuguke`;
    } else if (text === "2*2*1") {
        fetch(
            "http://localhost:3004/farming/2")
        response = `END reba ubutumwa tubohereje`;
    } else if (text === "2*2*2") {
        fetch(
            "http://localhost:3004/fertilizers/2")
        response = `END reba ubutumwa tubohereje`;
    } else if (text === "2*2*3") {
        response = `END Hamagara 100`;
    } else if (text === "2*3") {
        response = `END Raporo y'iyangiza rwibidukikije:
      1. Kigali : 30%
      2. Amajyaruguru : 13% 
      3. Ibirasirazuba: 19%
      4. Iburengerazuba: 16%`; 
    } else if (text === "2*4") {
        response = `END Uko wabungabunga ibidukikije:
      1. Ntukoreshe palisike
      2. Tera ibiti
      3. Bungabunga ibyakoreshejwe`
    }
  

  // Print the response onto the page so that our SDK can read it
  res.set("Content-Type: text/plain");
  res.send(response);
});

module.exports = router;
