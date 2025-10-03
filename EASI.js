// #######   #######################################
// ## 1 ##   ## Adjusted Probability of Detection ##
// #######   #######################################

// The purpose of this function is to return an adjusted probability of detection.
// This is achieved by applying external factors of reliability to the original probability of detection P(D)
// Input/parameters:
//    – P(D) = Probability of Detection
//    – P(A) = Probability of Assessment
//    – P(T) = Probability of Transmission
// Calculation/Formula:
//    i) Adjusted Probability of Detection = P(D) x P(A) x P(T)

function AdjustedProbabilityOfDetection(PD, PA, PT) {
    // "parseFloat" converts the inputs to numbers.
    // If the input is blank the function argument assigns a value:
    //    i) "|| 0" assigns a value of 0
    //    ii) "|| 1" assigns a value of 1
    // Parameters:
    //    – PD = Probability of Detection
    //    – PA = Probability of Assessment
    //    – PT = Probability of Transmission
    PD = parseFloat(PD) || 0;
    PA = parseFloat(PA) || 1;
    PT = parseFloat(PT) || 1;
    // Formula/Caluculation
    return PD * PA * PT;
}


// #######   #####################################
// ## 2 ##   ## Probability of Missed Detection ##
// #######   #####################################

// This function calculates the overall probability that an adversary will perform a task without being detected.
// Calculation/Formula:
//    i) = Probability of Missed Detection = 1 - Adjusted Probability of Detection
// For example:
//    – if AdjustedDetection = 0.75 (80%)
//      then MissedDetection = 1 - 0.75 = 0.25 (25% Probability of Missed Detection)

function ProbabilityOfMissedDetection(AdjustedDetection) {
    // "parseFloat" converts the input(s) to a number.
    // if the input is blank the function argument assigns a value:
    //     i) "|| 0" assigns a value of 0
    AdjustedDetection = parseFloat(AdjustedDetection) || 0;
    //Calculation/Formula
    let MissedDetection = 1 - AdjustedDetection;
    // Return the Probability of Missed Detection
    return MissedDetection;
}


// #######   #############################################
// ## 3 ##   ## Probability of First Point of Detection ##
// #######   #############################################

// This function calculates the probability that a given task is the first point of detection.
// Input/parameters:
//    — AdjustedDetection: Adjusted Probability of Detection
//    — PreviousPoMD: The probability of missed detection from the previous task
// Calculation/Formula:
//    i) Probability of First Point of Detection = AdjustedDetection x PreviousPoMD

function FirstPointOfDetection(AdjustedDetection, PreviousPoMD) {
    // "parseFloat" converts the input(s) to a number.
    // if the input is blank the function argument assigns a value:
    //     i) "|| 0" assigns a value of 0
    AdjustedDetection = parseFloat(AdjustedDetection) || 0;
    PreviousPoMD = parseFloat(PreviousPoMD) || 0;
    // Calculation/Formula
    let FirstDetection = AdjustedDetection * PreviousPoMD;
    // Return the Probability of First Point of Detection
    return FirstDetection;
}


// #######   #####################################
// ## 4 ##   ## Cumulative Delay Time (Seconds) ##
// #######   #####################################

// This function calculates the cumulative delay time of all tasks (in seconds)
// Input/parameters:
//    — DelayMean: The average delay time (in seconds) for a given task
//    - NextCumulativeDelay: The cumulative delay time (in seconds) of the next task
// Calculation/Formula:
//    i) Cumulative Delay Time = DelayMean + NextCumulativeDelay
// Note:
// The logic of this had me stuck for a while as it starts from the last task backwards.
// This figure basically tells you the delay time at any given task in the adversary path.
// Therefore, the first task has the largest corresponding cumulative delay
// as the total delay time of the whole path remains.
// The further down the sequence or adversary path, the less time you have.

function CalculateCumulativeDelay(DelayMean, NextCumulativeDelay) {
    // "parseFloat" converts the input(s) to a number.
    // if the input is blank the function argument assigns a value:
    //     i) "|| 0" assigns a value of 0
    DelayMean = parseFloat(DelayMean) || 0;
    NextCumulativeDelay = parseFloat(NextCumulativeDelay) || 0;
    // Calculation/Formula
    let CumulativeDelay = DelayMean + NextCumulativeDelay;
    // Return the Cumulative Delay Time
    return CumulativeDelay;
}


// #######   #########################
// ## 5 ##   ## Cumulative Variance ##
// #######   #########################

// This function calculates the cumulative variance/variance of all tasks
// In this scenario, variance is the measurement of how much task times can differ from the average
// Input/parameters:
//    – Delay_SDev: The Standard Deviation of Delay Time
//    – NextCumulativeVariance (The cumulative variance time (in seconds) for the next task)
// Calculation/Formula:
//    i) Cumulative Variance Time = (Delay_SDev x Delay_SDev) + NextCumulativeVariance

function CalculateCumulativeVariance(Delay_SDev, NextCumulativeVariance) {
    // "parseFloat" converts the input(s) to a number.
    // if the input is blank the function argument assigns a value:
    //     i) "|| 0" assigns a value of 0
    Delay_SDev = parseFloat(Delay_SDev) || 0;
    NextCumulativeVariance = parseFloat(NextCumulativeVariance) || 0;
    // Calculation/Formula
    let CumulativeVariance = (Delay_SDev * Delay_SDev) + NextCumulativeVariance;
    // Return Cumulative Variance
    return CumulativeVariance;
}


// #######   ###############
// ## 6 ##   ## True Mean ##
// #######   ###############

// The purpose of this function is to determine the 'true' mean/average delay time (cumulative).
// This figure is calculated based on the weight assigned to the 'locationTiming' value.
// Input/parameters:
//     – locationTiming: At what point during the step are guards notified of the adversary's action?
//         i) B for Beggining
//            The "B" value is assigned a weight of 1
//            If guards are notified at the beginning of an task
//            they have the full (1) duration of the task to respond
//         ii) M for Middle
//             The "M" value is assigned a weight of 0.5
//             If guards are notified halfway through of an task
//             they only have half (0.5) of the task duration to respond
//         iii) E for End
//             The "E" value is assigned a weight of 0
//             If guards are notified at the end of a task
//             there is no time left (0) in the task duration to respond
//     – DelayMean: The average delay (in seconds) for each action/step in the adversary path. 
//     – NextCumulativeDelay: The cumulative delay time (in seconds) for the next task
// Formula/Calculation: 
//     – True Mean = (Weight * Delay Mean) + Next Cumulative Delay
// Note:
// The logic of this had me stuck for a while as it starts from the last task backwards.
// This figure basically tells you the delay time at any given task in the adversary path
// (accounting for the time at which detection occurs)
// Therefore, the first task has the largest corresponding cumulative delay
// as the total delay time of the whole path remains.
// The further down the sequence or adversary path, the less time you have.

function CalculateTrueMean(locationTiming, DelayMean, NextCumulativeDelay) {
    // "parseFloat" converts the input(s) to a number.
    // if the input is blank the function argument assigns a value:
    //     i) "|| 0" assigns a value of 0
    DelayMean = parseFloat(DelayMean) || 0;
    NextCumulativeDelay = parseFloat(NextCumulativeDelay) || 0;
    // Set the default Timing Weight to 0
    let weight = 0;
    // If the Timing is "B" (Beginning) set the weight to 1
    if (locationTiming === "B") weight = 1;
    // If the Timing is "M" (Middle) set the weight to 0.5
    else if (locationTiming === "M") weight = 0.5;
    // For everything else (e.g., "E" (End)) set the weight to 0
    else weight = 0;
    // Calculation/Formula
    let TrueMean = (weight * DelayMean) + NextCumulativeDelay;
    // Return the True Mean value
    return TrueMean;
}


// #######   ###################
// ## 7 ##   ## True Variance ##
// #######   ###################

// The purpose of this function is to determine the 'true' variance of delay times (cumulative).
// In this scenario, variance is the measurement of how much task times can differ from the average
// Input/parameters:
//     – Timing: At what point during the step are guards notified of the adversary's action?
//         i) B for Beggining
//            The "B" value is assigned a weight of 1
//            If guards are notified at the beginning of an task
//            they have the full (1) duration of the task to respond
//         ii) M for Middle
//             The "M" value is assigned a weight of 0.5
//             If guards are notified halfway through of an task
//             they only have half (0.5) of the task duration to respond
//         iii) E for End
//             The "E" value is assigned a weight of 0
//             If guards are notified at the end of a task
//             there is no time left (0) in the task duration to respond
//     – Delay_SDev: The Standard Deviation of Delay Time
//     – NextCumulativeVariance: The cumulative variance time (in seconds) for the next task
// Formula/Calculation:
//     – True Variance = ((weight * weight) * (Delay S-Dev * Delay S-Dev)) + Next Cumulative Variance

function CalculateTrueVariance(locationTiming, Delay_SDev, NextCumulativeVariance) {
    // "parseFloat" converts the input(s) to a number.
    // if the input is blank the function argument assigns a value:
    //     i) "|| 0" assigns a value of 0
    Delay_SDev = parseFloat(Delay_SDev) || 0;
    NextCumulativeVariance = parseFloat(NextCumulativeVariance) || 0;
    // Set the default Timing Weight to 0
    let weight = 0;
    // If the Timing is "B" (Beginning) set the weight to 1
    if (locationTiming === "B") weight = 1;
    // If the Timing is "M" (Middle) set the weight to 0.5
    else if (locationTiming === "M") weight = 0.5;
    // For everything else (e.g., "E" (End)) set the weight to 0
    else weight = 0;
    // Calculate the variance of the current task
    let CurrentTaskVariance = Delay_SDev * Delay_SDev;
    // Apply the timing weight to the variance
    let TrueVariance = ((weight * weight) * CurrentTaskVariance) + NextCumulativeVariance;
    // Return the True Variance value
    return TrueVariance;
}


// #######   #############
// ## 8 ##   ## Z Value ##
// #######   #############

// This value tells us how far ahead or behind the attacker is in relation to the guards.
// Input/parameters:
//    – TrueMean: the average delay time accounting for detection timing
//    — TrueVariance: the variance/variance time of tasks accounting for detection timing
//    – GuardResponseMean: the average response time for guards to arrive
//    – GuardResponse_SDev: the Standard Deviation of the response time
//        i) GuardResponseVariance = GuardResponse_SDev x GuardResponse_SDev
// Calculation/Formula:
//    i) Z = (GuardResponseMean - TrueMean) / Square Root(GuardResponseVariance + TrueVariance)

function Calculate_Z_Value(TrueMean, TrueVariance, GuardResponseMean, GuardResponse_SDev) {
    // "parseFloat" converts the input(s) to a number.
    // if the input is blank the function argument assigns a value:
    //     i) "|| 0" assigns a value of 0
    TrueMean = parseFloat(TrueMean) || 0;
    TrueVariance = parseFloat(TrueVariance) || 0;
    GuardResponseMean = parseFloat(GuardResponseMean) || 0;
    GuardResponse_SDev = parseFloat(GuardResponse_SDev) || 0;
    // Formula for calculating Guard Response Variance
    let GuardResponseVariance = GuardResponse_SDev * GuardResponse_SDev;
    // Formula for calculating the latter half of the equation 
    //    i) Square Root(GuardResponseVariance + CumulativeVariance)
    let Formula_Division = Math.sqrt(GuardResponseVariance + TrueVariance);
    // Final formula
    let Z_Value = (GuardResponseMean - TrueMean) / Formula_Division;
    // Return Z Value
    return Z_Value;
}


// #######   ##########################
// ## 9 ##   ## Error Function (erf) ##
// #######   ##########################
// This function implements the error function equation (erf).
// Specifically, formula 7.1.26 by Abramowitz & Stegun (1972).
// APA 7th Reference:
//    i) Abramowitz, M., & Stegun, I. A. (1972). 
//       Handbook of mathematical functions with formulas, graphs, and mathematical tables 
//       (10th print., with corrections). U.S. Dept. of Commerce : U.S. G.P.O. 
//       http://books.google.com/books?id=ZboM5tOFWtsC
// The function below is taken directly from the picomath 'erf.js' interpretation of the error function.
// APA 7th Reference(s):
//    i) Hegwill, G. (n.d.). Picomath Javascript erf.js. 
//       Retrieved from https://hewgill.com/picomath/javascript/erf.js.html
//    ii) Hegwill, G. (n.d.). erf.js.
//        GitHub. Retrieved from https://github.com/ghewgill/picomath/blob/master/javascript/erf.js

function erf(x) {
    // constants
    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var p  =  0.3275911;

    // Save the sign of x
    var sign = 1;
    if (x < 0) {
        sign = -1;
    }
    x = Math.abs(x);

    // A&S formula 7.1.26
    var t = 1.0/(1.0 + p*x);
    var y = 1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-x*x);

    return sign*y;
}


// ########   ##################################
// ## 10 ##   ## Standard Normal Distribution ##
// ########   ##################################

// This function uses the Cumulative Distribution Function (CDF) of Standard Normal Distribution.
// Using CDF, the function converts the z value to a probability between 0 and 1. 
// This probability (0 to 1) indicates the probability that guards will arrive before the adversary finishes a task. 
// Standard Normal Distribution CDF Formula:
//    i) (1/2)*(1+erf(x/sqrt(2)))
//        ii) MATLAB Reference:
//            iii) https://www.mathworks.com/help/matlab/ref/erf.html

function CumulativeDistributionFunction(Z_Value) {
    // Calculation/Formula (taken/adapted from MATLAB reference)
    let CDF_Probability = 0.5 * (1 + erf(Z_Value / Math.sqrt(2)));
    // Return the CDF Value/Probability
    return CDF_Probability;
}

// ########   ###################################################
// ## 11 ##   ## Probability of Interruption (Individual Task) ##
// ########   ###################################################

// This function calculates the Probability of Interruption for each individual task
// Input/parameters:
//     – FirstDetection: the probability that a given task is the first point of detection.
//     – CDF_Probability: the probability that guards will arrive before the adversary finishes a task.
// Calculation/Formula:
//     – Probability of Interruption (Individual Task) = First Detection x CDF Probability
// Note: 
// I was initially confused in regard to the difference between this and the figure produced by Standard Normal Distribution (CDF).
// The figure produced above by Standard Normal Distribution is a probability that guards will arrive IF the adversary is detected.
// This formula produces a figure that is simply the probability of interruption for any given task (similar, but different).
function CalculateTaskProbabilityOfInterruption(FirstDetection, CDF_Probability) {
    // Calculation/Formula
    let TaskProbabilityOfInterruption = FirstDetection * CDF_Probability;
    return TaskProbabilityOfInterruption;
}


// ########   #########################################
// ## 12 ##   ## Overall Probability of Interruption ##
// ########   #########################################

// This is the last 'core' function that ties everything together.
// It calculates the Overall Probability of Interruption.

function CalculateOverallProbabilityOfInterruption(SumOfInterruption, GuardCommunication) {
    let OverallProbabilityOfInterruption = SumOfInterruption * GuardCommunication;
    return OverallProbabilityOfInterruption;
}


function tablePrint(mainTable) {
    let results = [];
    results.push(`-----------------------`);

    let row = smallTable.rows[0];
    // Front End Values (Direct Inputs of upper table)
    const GuardCommunication = row.cells [1].querySelector("input").value
    const PAssessment = row.cells [2].querySelector("input").value;
    const PTransmission = row.cells [3].querySelector("input").value;
    const GuardResponseMean = row.cells [4].querySelector("input").value;
    const GuardResponse_SDev = row.cells [5].querySelector("input").value;

    results.push(`Guard Comms: ${GuardCommunication}, P(A): ${PAssessment}, P(T): ${PTransmission}, Response Mean: ${GuardResponseMean}, Force Time: ${GuardResponse_SDev}\n`);
    results.push(`-----------------------`);

6
    // BACKWARDS PASSING (For "next" loop/row values)
    const rows = [...mainTable.rows];
    const n = rows.length;

    // Delay Mean
    const DelayMeanArray = rows.map(r => parseFloat(r.cells[4].querySelector("input").value) || 0);

    const NextCumulativeDelay_Marker = new Array(n);
    const CumulativeDelay_Marker = new Array(n);

    let NextCumulativeDelay = 0;
    for (let i = n - 1; i >= 0; i--) {
        NextCumulativeDelay_Marker[i] = NextCumulativeDelay;
        const cd = CalculateCumulativeDelay(DelayMeanArray[i], NextCumulativeDelay);
        CumulativeDelay_Marker[i] = cd;
        NextCumulativeDelay = cd;
    }

    // Delay S_Dev
    const VarianceArray = rows.map(r => parseFloat(r.cells[5].querySelector("input").value) || 0);

    const NextCumulativeVariance_Marker = new Array(n);
    const CumulativeVariance_Marker = new Array(n);

    let NextCumulativeVariance = 0;
    for (let i = n - 1; i >= 0; i--) {
        NextCumulativeVariance_Marker[i] = NextCumulativeVariance;
        const cd = CalculateCumulativeVariance(VarianceArray[i], NextCumulativeVariance);
        CumulativeVariance_Marker[i] = cd;
        NextCumulativeVariance = cd;
    }



    // Initialisers
    let PreviousPoMD = 1;
    let SumOfInterruption = 0;

    rows.forEach((row, index) => {

        // Front End Values (Direct Inputs)
        const PDetection = row.cells[2].querySelector("input").value;

        const locationTiming = row.cells[3].querySelector("select").value;

        const DelayMean = DelayMeanArray[index]; 

        const Delay_SDev = VarianceArray[index]; 


        results.push(`R O W  ${index + 1} :\n`);
        results.push(`P(D): ${PDetection}, Location: ${locationTiming}, Mean: ${DelayMean}, Deviation: ${Delay_SDev}\n`);

        // Back End Values (Function Calculations)
        const AdjustedDetection = AdjustedProbabilityOfDetection(PDetection, PAssessment, PTransmission);

        const MissedDetection = ProbabilityOfMissedDetection(AdjustedDetection);

        const FirstDetection = FirstPointOfDetection(AdjustedDetection, PreviousPoMD);

        const NextCumulativeDelay = NextCumulativeDelay_Marker[index];
        const CumulativeDelay = CalculateCumulativeDelay(DelayMean, NextCumulativeDelay);

        const NextCumulativeVariance = NextCumulativeVariance_Marker[index];
        const CumulativeVariance = CalculateCumulativeVariance(Delay_SDev, NextCumulativeVariance);

        const TrueMean = CalculateTrueMean(locationTiming, DelayMean, NextCumulativeDelay);

        const TrueVariance = CalculateTrueVariance(locationTiming, Delay_SDev, NextCumulativeVariance);

        const Z_Value = Calculate_Z_Value(TrueMean, TrueVariance, GuardResponseMean, GuardResponse_SDev);

        const CDF_Probability = CumulativeDistributionFunction(Z_Value);

        const TaskProbabilityOfInterruption = CalculateTaskProbabilityOfInterruption(FirstDetection, CDF_Probability);

    
        results.push(`Adjusted P(d): ${AdjustedDetection}, Miss Detection: ${MissedDetection}, First Detection: ${FirstDetection}\n`);
        results.push(`Cumulative Delays: ${CumulativeDelay}, Cumulative Var: ${CumulativeVariance}, True Mean: ${TrueMean}, True Var: ${TrueVariance}\n`);
        results.push(`Z-Value: ${Z_Value}, Normal Value: ${CDF_Probability}, Task Interruption Probability: ${TaskProbabilityOfInterruption}`);
        
        results.push(`-----------------------`);

        // Update values for NEXT loop / row
        PreviousPoMD *= MissedDetection;
        SumOfInterruption += TaskProbabilityOfInterruption;
        
    });

    const OverallProbabilityOfInterruption = CalculateOverallProbabilityOfInterruption(SumOfInterruption, GuardCommunication);
    results.push(`PROBABILITY OF INTERRUPTION: ${OverallProbabilityOfInterruption}`)

    return results;
}
