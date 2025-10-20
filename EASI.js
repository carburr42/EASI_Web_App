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
    // Formula/Calculation
    return PD * PA * PT;
}

// #######   #####################################
// ## 2 ##   ## Probability of Missed Detection ##
// #######   #####################################

// This function calculates the overall probability that an adversary will perform a task without being detected.
// Calculation/Formula:
//    i) Probability of Missed Detection = 1 - Adjusted Probability of Detection
// For example:
//    – if AdjustedDetection = 0.75 (75%)
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
//    - AdjustedDetection: Adjusted Probability of Detection
//    - PreviousPoMD: The probability of missed detection from the previous task
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
//    - DelayMean: The average delay time (in seconds) for a given task
//    - NextCumulativeDelay: The cumulative delay time (in seconds) of the next task
// Calculation/Formula:
//    i) Cumulative Delay Time = DelayMean + NextCumulativeDelay
// Note:
// The logic of this had me stuck for a while as it starts from the last task backwards.
// This figure basically tells you the remaining delay time at any given task in the adversary path.
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

// This function calculates the cumulative variance of all tasks
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
//         i) B for Beginning
//            The "B" value is assigned a weight of 1
//            If guards are notified at the Beginning of a task
//            they have the full (1) duration of the task to respond
//         ii) M for Middle
//             The "M" value is assigned a weight of 0.5
//             If guards are notified halfway through a task
//             they only have half (0.5) of the task duration to respond
//         iii) E for End
//             The "E" value is assigned a weight of 0
//             If guards are notified at the end of a task
//             there is no time left (0) in the task duration to respond
//     – DelayMean: The average delay (in seconds) for each action/step in the adversary path. 
//     – NextCumulativeDelay: The cumulative delay time (in seconds) for the next task
// Formula/Calculation: 
//     – True Mean = (Location Timing * Delay Mean) + Next Cumulative Delay
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
//         i) B for Beginning
//            The "B" value is assigned a weight of 1
//            If guards are notified at the Beginning of a task
//            they have the full (1) duration of the task to respond
//         ii) M for Middle
//             The "M" value is assigned a weight of 0.5
//             If guards are notified halfway through a task
//             they only have half (0.5) of the task duration to respond
//         iii) E for End
//             The "E" value is assigned a weight of 0
//             If guards are notified at the end of a task
//             there is no time left (0) in the task duration to respond
//     – Delay_SDev: The Standard Deviation of Delay Time
//     – NextCumulativeVariance: The cumulative variance time (in seconds) for the next task
// Formula/Calculation:
//     – True Variance = ((locationTiming * locationTiming) * (Delay S-Dev * Delay S-Dev)) + Next Cumulative Variance

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
//    - TrueVariance: the variance/variance time of tasks accounting for detection timing
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
    var a1 = 0.254829592;
    var a2 = -0.284496736;
    var a3 = 1.421413741;
    var a4 = -1.453152027;
    var a5 = 1.061405429;
    var p = 0.3275911;

    // Save the sign of x
    var sign = 1;
    if (x < 0) {
        sign = -1;
    }
    x = Math.abs(x);

    // A&S formula 7.1.26
    var t = 1.0 / (1.0 + p * x);
    var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
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
    let CDF_Probability = 0.5 * (1 - erf(Z_Value / Math.sqrt(2)));
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

// This is the 'core' Probability of Interruption function that ties all the previous math together.
// It calculates the Overall Probability of Interruption for a singular path.
//     – SumOfInterruption: The sum of 'TaskProbabilityOfInterruption' for a singular path.
//     – GuardCommunication: The probability that guards will successfully communicate when a threat/adversary is identified.
// Calculation/Formula:
//     i) Overall Probability of Interruption = SumOfInterruption * GuardCommunication

function CalculateOverallProbabilityOfInterruption(SumOfInterruption, GuardCommunication) {
    // Calculation/Formula
    let OverallProbabilityOfInterruption = SumOfInterruption * GuardCommunication;
    // Return the Overall Probability of Interruption
    return OverallProbabilityOfInterruption;
}

// ########  ###########################################################################
// ## 13 ##  ################################## MAIN  ##################################
// ########  ###########################################################################

// The purpose of this section is to:
//     i) Read all user input from the front end HTML. 
//     ii) Build a two dimensional (2d) array of tasks. 
//     iii) Enumerate and determine every possible path within the 2d array. 
//     iv) Evaluate each path using the EASI algorithm.
//     v) Return a list of all possible paths ranked from MOST vulnerable (MVP) to LEAST vulnerable. 


// This is known as an Immediately Invoked Function Expression (IIFE). 
// The purpose of using this is to avoid pollution within the program. 
// By invoking the IIFE, all functions and variables remain private. 

(function () {

    // *************
    // ** Helpers **
    // *************

    // The lines of code below are helpers that assist with input handling
    // They essentially make the input safer and easier for JS to handle
    //     i) safe: this replaces blank/missing values with '-'
    //            a) '=>' is an arrow function (basically a shorter way to define a function)
    //            b) If the input is blank/missing (!v) or if it is blank after trimming (String(v).trim() === '')
    //               return a dash '-' (? '-'). 
    //               However, if the input is valid, return the trimmed value (: String(v).trim()).
    //     ii) toNum: this converts any text input to a number (default of 0 if the input is invalid)
    //            a) 'parseFloat(v)' converts the input to a number
    //            b) 'isFinite(parseFloat(v))' checks whether the number is valid
    //            c) '? parseFloat(v)' returns the number if it is valid
    //            d) ': 0' returns the default value 0 if the value/number is invalid
    //     iii) SelectElement: this selects a singular element.
    //     iv) Select_ALL_Elements: this selects all matching elements and returns an array. 
    const safe = v => (!v || String(v).trim() === '' ? '-' : String(v).trim());
    const toNum = v => (isFinite(parseFloat(v)) ? parseFloat(v) : 0);
    const SelectElement =  selector => document.querySelector(selector);
    const Select_All_Elements = selector => Array.from(document.querySelectorAll(selector));

    // ********************************
    // ** Retrieve Global Parameters **
    // ********************************

    // This function reads and returns the global input parameters from the HTML table:
    //     – Probability of Transmission
    //     – Probability of Assessment
    //     – Guard Response Mean
    //     – Guard Response Standard Deviation
    //
    //     – Guard Communication <- (below layer inputs)

    function RetrieveGlobalParameters() {
        // Retrieve the table row containing the global parameters
        const GlobalRow = SelectElement('#smallTable')?.rows?.[0];
        // Retrieve Guard Communication
        const GuardRow = SelectElement('#guardTable')?.rows?.[0];
        // Return the global parameters as numeric values
        return {
            GuardCommunication: toNum(GuardRow?.cells?.[0]?.querySelector('input')?.value),
            ProbabilityOfTransmission: toNum(GlobalRow?.cells?.[0]?.querySelector('input')?.value) || 1,
            ProbabilityOfAssessment:  toNum(GlobalRow?.cells?.[1]?.querySelector('input')?.value) || 1,
            GuardResponseMean:        toNum(GlobalRow?.cells?.[2]?.querySelector('input')?.value),
            GuardResponseS_Dev:       toNum(GlobalRow?.cells?.[3]?.querySelector('input')?.value)
        };
    }

    // *************************************
    // ** Read a Singular HTML Task Table **
    // *************************************

    // Read the user input of a singular task table and return the information:
    //     – Task Header/Task Description
    //     – Probability of Detection
    //     – Location/Timing Value
    //     – Delay Mean
    //     – Delay Standard Deviation

    function ReadTaskFromTable(Table, Task_ID) {
        
        const TaskHeaderInput = Table.querySelector('thead input[type="text"]');
        const TaskRow = Table.querySelector('tbody tr');
        
        return {
            Task_ID: Task_ID,
            Task_Description: safe(TaskHeaderInput?.value),
            PD: toNum(TaskRow?.querySelector('td:nth-child(1) input')?.value),
            location: (TaskRow?.querySelector('td:nth-child(2) select')?.value || 'B'), 
            mean: toNum(TaskRow?.querySelector('td:nth-child(3) input')?.value),
            sdev: toNum(TaskRow?.querySelector('td:nth-child(4) input')?.value)
        };
    }

    // ****************************
    // ** Build a 2-D Task Array **
    // ****************************
    
    function Build_2D_Array() {
        const layers = Select_All_Elements('.layer');
        const stages = layers.map((LayerElement, LayerIndex) => {
            const LayerNumber = LayerIndex + 1;
            const Tables = Array.from(LayerElement.querySelectorAll('.task-table'));
            return Tables.map((Table, i, arr) => {
                const Task_ID = (arr.length > 1) ? `${LayerNumber}.${i + 1}` : `${LayerNumber}`;
                return ReadTaskFromTable(Table, Task_ID);
            });
        });
        return stages.filter(stage => stage.length > 0);
    }

    // *****************************
    // ** Find all possible paths **
    // *****************************
    
    function Enumerate_Paths(Matrix2D) {
        const Output_Array = [];
        (function RecursiveFunction(LayerIndex, SelectedSteps, SelectedTaskIDs) {
            if (LayerIndex === Matrix2D.length) {
                Output_Array.push({
                    steps: SelectedSteps,
                    label: SelectedTaskIDs.join(' \u2192 ')
                        });
                return;
            }
            for (let i = 0; i < Matrix2D[LayerIndex].length; i++) {
                const CurrentStep = Matrix2D[LayerIndex][i];
                RecursiveFunction(
                    LayerIndex + 1,
                    SelectedSteps.concat(CurrentStep),
                    SelectedTaskIDs.concat(CurrentStep.Task_ID)
                );
            }
        })(0, [], []);
        return Output_Array;
    }

    // *****************************************************
    // ** Evaluate probabilities/metrics for a given path **
    // *****************************************************
    
    function Evaluate_Path(Steps, GlobalParameters) {
        const NumberOfSteps = Steps.length;
        const NextCumDelay = new Array(NumberOfSteps);
        const CumDelay = new Array(NumberOfSteps);
        const NextCumVar = new Array(NumberOfSteps);
        const CumVar = new Array(NumberOfSteps);
        let TotalDelay = 0;
        let TotalVariance = 0;
        
        for (let i = NumberOfSteps - 1; i >= 0; i--) {
            NextCumDelay[i] = TotalDelay;
            NextCumVar[i] = TotalVariance;
            CumDelay[i] = (TotalDelay = Steps[i].mean + TotalDelay);
            CumVar[i] = (TotalVariance = (Steps[i].sdev * Steps[i].sdev) + TotalVariance);
        }
        
        let PreviousPoMD = 1;
        let SumOfInt = 0;
        const PerStep = [];
        
        for (let i = 0; i < NumberOfSteps; i++) {
            const CurrentTask = Steps[i];
            const AdjustedDetection = AdjustedProbabilityOfDetection(
                CurrentTask.PD, GlobalParameters.ProbabilityOfAssessment, GlobalParameters.ProbabilityOfTransmission
            );
            const MissedDetection = ProbabilityOfMissedDetection(AdjustedDetection);
            const FirstDetection = FirstPointOfDetection(AdjustedDetection, PreviousPoMD);
            const TrueMean = CalculateTrueMean(CurrentTask.location, CurrentTask.mean, NextCumDelay[i]);
            const TrueVariance = CalculateTrueVariance(CurrentTask.location, CurrentTask.sdev, NextCumVar[i]);
            const Z_Value = Calculate_Z_Value(TrueMean, TrueVariance, GlobalParameters.GuardResponseMean, GlobalParameters.GuardResponseS_Dev);
            const CDF_Probability = CumulativeDistributionFunction(Z_Value);
            const TaskProbabilityOfInterruption = CalculateTaskProbabilityOfInterruption(FirstDetection, CDF_Probability);
            
            PerStep.push({
                Task_ID: CurrentTask.Task_ID,
                Task_Description: CurrentTask.Task_Description,
                PD: CurrentTask.PD,
                location: CurrentTask.location,
                mean: CurrentTask.mean,
                sdev: CurrentTask.sdev,
                AdjustedDetection,
                MissedDetection,
                FirstDetection,
                CumulativeDelay: CumDelay[i],
                CumulativeVariance: CumVar[i],
                TrueMean,
                TrueVariance,
                Z_Value,
                CDF_Probability,
                TaskProbabilityOfInterruption
            });
            PreviousPoMD *= MissedDetection;
            SumOfInt += TaskProbabilityOfInterruption;
        }
        const OverallProbabilityOfInterruption = CalculateOverallProbabilityOfInterruption(SumOfInt, GlobalParameters.GuardCommunication);
        return { PerStep, OverallProbabilityOfInterruption };
    }

    // **********************************
    // ** Calculate and sort all paths **
    // **********************************
    
    function Calculate_All_Paths() {
        const GlobalParameters = RetrieveGlobalParameters();
        const Task_Matrix_2D = Build_2D_Array();
        if (!Task_Matrix_2D.length) {
            return {
                PathText: '',
                MVP_Details_Text: '',
                MVP_Probability_Percentage: 0,
                MVP_Path_Label: '',
                PathResults: []
            };
        }
        
        const AllPathCombinations = Enumerate_Paths(Task_Matrix_2D);
        const PathResults = AllPathCombinations.map(p => {
            const { PerStep, OverallProbabilityOfInterruption } = Evaluate_Path(p.steps, GlobalParameters);
            return { ...p, PerStep, pInterrupt: OverallProbabilityOfInterruption };
        });
        PathResults.sort((a, b) => a.pInterrupt - b.pInterrupt);
        const TextLines = [];
        PathResults.forEach((p, idx) => {
            const Path_Percentage = (p.pInterrupt * 100).toFixed(6);
            const MostVulnerable = (idx === 0) ? ' [MVP]' : '';
            // list all possible paths and P(i)
            TextLines.push(`path ${idx + 1} p(i) = ${Path_Percentage}%${MostVulnerable}`);
        });
        const MostVulnerablePath = PathResults[0];
        const MVP_Probability_Percentage = Number((MostVulnerablePath.pInterrupt * 100).toFixed(6));
        const MVP_Details_Text = ['----------- MVP Path Details -----------'].concat(
            MostVulnerablePath.PerStep.flatMap(s => {
                const LayerNumber = s.Task_ID.includes('.') ? s.Task_ID.split('.')[0] : s.Task_ID;
                return [
                    `Layer ${LayerNumber}:`,
                    `    – Task: ${s.Task_ID}: ${safe(s.Task_Description)}`,
                    `    – P(d): ${s.PD}, Location: ${s.location}, Delay Mean: ${s.mean}, Delay SDev: ${s.sdev}`,
                    `    – Adjusted P(d): ${s.AdjustedDetection}, Missed Detection: ${s.MissedDetection}, First Detection: ${s.FirstDetection}`,
                    `    – Cumulative Delay(s): ${s.CumulativeDelay}, Cumulative Var: ${s.CumulativeVariance}, True Mean: ${s.TrueMean}, True Var: ${s.TrueVariance}`,
                    `    – Z-Value: ${s.Z_Value}, Normal Value: ${s.CDF_Probability}, Task Interruption Probability: ${s.TaskProbabilityOfInterruption}`, 
                    ''
                ];
            })
        ).join('\n');
        
        return {
            PathText: TextLines.join('\n'),
            MVP_Details_Text,
            MVP_Probability_Percentage,
            MVP_Path_Label: MostVulnerablePath.label,
            PathResults
        };
    }
    
    // ********************
    // ** User Interface **
    // ********************
    
    window.Handle_Change = function () {
        const {
            PathText,
            MVP_Details_Text,
            MVP_Probability_Percentage,
            MVP_Path_Label
        } = Calculate_All_Paths() || {};
        const MVP_Element = SelectElement('#MVPpath');
        const MVP_Percentage_Element = SelectElement('#EASIresult');
        const FullPathListElement = SelectElement('#PathList');
        const MVP_Detail_List = SelectElement('#MVPList');
        if (MVP_Element) MVP_Element.textContent = String(MVP_Path_Label || '');
        if (MVP_Percentage_Element) {
            const n = Number(MVP_Probability_Percentage);
            MVP_Percentage_Element.textContent = Number.isFinite(n) ? `p(i) = ${n.toFixed(6)}%` : '';
        }
        if (FullPathListElement) FullPathListElement.textContent = String(PathText || '');
        if (MVP_Detail_List) MVP_Detail_List.textContent = String(MVP_Details_Text || '');
    };
    document.addEventListener('input', e => { if (e.target && e.target.matches('input,select')) Handle_Change(); });
    document.addEventListener('change', e => { if (e.target && e.target.matches('input,select')) Handle_Change(); });
    window.addEventListener('DOMContentLoaded', Handle_Change);

    window.Compute_Selected_Path_Info = function (selectedIDs) {
    try {
        const Global = RetrieveGlobalParameters();
        const Matrix = Build_2D_Array();
        if (!Array.isArray(selectedIDs) || selectedIDs.length !== Matrix.length) {
        return { complete: false };
        }

        const Steps = [];
        for (let i = 0; i < Matrix.length; i++) {
        const id = selectedIDs[i];
        if (!id) return { complete: false };                  // must choose per layer
        const t = Matrix[i].find(x => x.Task_ID === id);
        if (!t) return { complete: false };                   // invalid Task_ID
        Steps.push(t);
        }

        // Evaluate the exact path chosen by the user
        const out = Evaluate_Path(Steps, Global);

        return {
        complete: true,
        PerStep: out.PerStep,
        OverallProbabilityOfInterruption: out.OverallProbabilityOfInterruption
        };
    } catch {
        return { complete: false };
    }
    };
    
    (function () {
        let pre = null;
        function dump() {
            const r = Calculate_All_Paths();
            if (!pre) { pre = document.createElement('pre'); document.body.appendChild(pre); }
            pre.textContent = 'P(i)\n' + (r.MVP_Details_Text || '') + '\nOverall Probability of Interruption: ' + (r.MVP_Probability_Percentage ?? '') + '%';
        }
        const _old = window.Handle_Change;
        window.Handle_Change = function () { _old(); dump(); };
        window.addEventListener('DOMContentLoaded', dump);
    })();
})();
