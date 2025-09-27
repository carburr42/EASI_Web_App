function calcScaling(detection) {
    // "Pd (scaling)" ???
    scalingFactor = 1; // Setting the factor inside this function for now

    // INSERT LOGIC HERE
    scaling = 0;

    return scaling; // <- rename appropriately if needed
}

function calcMiss(scaling) {
    // "1 - Pd" probability that the adversary wont be detected.

    // INSERT LOGIC HERE
    // (You will need to figure out how to pass previous values)
    miss = 1;
    
    return miss; // <- rename appropriately if needed
}

function calcFirstPoint(scaling) {

    // "P(first detn)" probability that a given task is the frst point of detection

    // INSERT LOGIC HERE
    firstPoint = 2;
    
    return firstPoint; // <- rename appropriately if needed
}

function calcSumDelay(delayMean) {
    // "cum delays" the cumulative delay time

    // INSERT LOGIC HERE
    // (This could benefit from being inside the main loop instead of a function?)
    // (Making everything a function for now just for clarity)
    sumDelay = 3;

    return sumDelay; // <- rename appropriately if needed
}

function calcSumVar(delayDeviation) {
    // "Cum Var" the cumulative variance (standard deviation) 

    // INSERT LOGIC HERE
    // (This could benefit from being inside the main loop instead of a function?)
    // (Making everything a function for now just for clarity)
    sumVar = 4;

    return sumVar; // <- rename appropriately if needed
}

function calcTrueMean(location, delayMean, sumDelay) {
    // "True Mean" a modifier to sumDelay that accounts for 'Location'

    // INSERT LOGIC HERE
    trueMean = 5;

    return trueMean; // <- rename appropriately if needed
}

function calcTrueVar(location, delayDeviation, sumVar) {
    // "True Var" a modifier to sumVar that accounts for 'Location'

    // INSERT LOGIC HERE
    trueVar = 6;

    return trueVar; // <- rename appropriately if needed
}

function calcZValue(trueMean, trueVar, responseMean, forceTime) {
    // "z-values" how ahead / behind attacker is in relation to guards

    // INSERT LOGIC HERE
    zValue = 7;

    return zValue; // <- rename appropriately if needed
}

function calcNormalValues(zValue) {
    // "Normal values" probability of guards arriving before attackers finish the given step

    // INSERT LOGIC HERE
    // (3rd page Excel logic probably all goes in here)
    normalValue = 8;

    return normalValue; // <- rename appropriately if needed
}

function calcProduct(firstPoint, normalValue) {
    // "prod h?*n?" The product of multiplying normalValue with firstPoint
    // Gives overall probability that the specific task (the row) is interrupted

    // INSERT LOGIC HERE
    product = 9;

    return product; // <- rename appropriately if needed
}


function tablePrint(mainTable) {
    let results = [];
    results.push(`-----------------------`);

    let row = smallTable.rows[0];
    // Front End Values (Direct Inputs of upper table)
    const guardComms = row.cells [1].querySelector("input").value;
    const responseMean = row.cells [3].querySelector("input").value;
    const forceTime = row.cells [4].querySelector("input").value;

    results.push(`Guard Comms: ${guardComms}, Response Mean: ${responseMean}, Force Time: ${forceTime}`);
    results.push(`-----------------------`);

    [...mainTable.rows].forEach((row, index) => {

        // Front End Values (Direct Inputs)
        const detection = row.cells[2].querySelector("input").value;
        const location = row.cells[3].querySelector("select").value;
        const delayMean = row.cells[4].querySelector("input").value;
        const delayDeviation = row.cells[5].querySelector("input").value;

        //

        // Back End Values (Function Calculations)
        const scaling = calcScaling(detection);
        const miss = calcMiss(scaling);
        const firstPoint = calcFirstPoint(scaling);
        const sumDelay = calcSumDelay(delayMean);
        const sumVar = calcSumVar(delayDeviation);
        const trueMean = calcTrueMean(location, delayMean, sumDelay);
        const trueVar = calcTrueVar(location, delayDeviation, sumVar);
        const zValue = calcZValue(trueMean, trueVar, responseMean, forceTime);
        const normalValue = calcNormalValues(zValue);
        const product = calcProduct(firstPoint, normalValue);

        results.push(`R O W  ${index + 1} :\n`);
        results.push(`Detection: ${detection}, Location: ${location}, Mean: ${delayMean}, Deviation: ${delayDeviation}\n`);
        results.push(`Pd(scaling): ${scaling}, 1-Pd: ${miss}, P(first detn): ${firstPoint}\n`);
        results.push(`Sum Delays: ${sumDelay}, Sum Var: ${sumVar}, True Mean: ${trueMean}, True Var: ${trueVar}\n`);
        results.push(`z-values: ${zValue}, Normal Values: ${normalValue}, prod h?*n?: ${product}`);
        results.push(`-----------------------`);
        
    });

    return results;
}