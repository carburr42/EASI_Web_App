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

// ###################
// ## MAIN FUNCTION ##
// ###################

function CalculateMVP() {
    const container = document.getElementById('layersContainer');
    if (!container) return;

    const lines = [];
    const safe = v => (v === undefined || v === null || String(v).trim() === '' ? '-' : String(v).trim());
    const toNum = v => {
        const x = parseFloat(v);
        return Number.isFinite(x) ? x : 0;
    };

    // Read 'small table' inputs
    const smallTable = document.getElementById('smallTable');
    const stRow = smallTable?.rows?.[0];

    const GuardCommunication = toNum(stRow?.cells?.[0]?.querySelector('input')?.value);
    const PAssessment = toNum(stRow?.cells?.[1]?.querySelector('input')?.value);
    const PTransmission = toNum(stRow?.cells?.[2]?.querySelector('input')?.value);
    const GuardResponseMean = toNum(stRow?.cells?.[3]?.querySelector('input')?.value);
    const GuardResponse_SDev = toNum(stRow?.cells?.[4]?.querySelector('input')?.value);

    // Collect layers from Document Object Model (DOM)
    const layers = container.querySelectorAll('.layer');

    // Path Building
    const paths = [[]]; // start with empty path
    layers.forEach((layer, idx) => {
        const layerNo = idx + 1;
        const taskTables = layer.querySelectorAll('.task-table');
        const isTaskLayer = taskTables.length > 0;

        if (!isTaskLayer) {
            // Transitional Layer (single fixed task)
            paths.forEach(p => p.push(`${layerNo}`));
        } else {
            // Task Layer (branch per task table)
            const branched = [];
            taskTables.forEach((_, tIdx) => {
                paths.forEach(p => branched.push([...p, `${layerNo}.${tIdx + 1}`]));
            });
            paths.length = 0;
            paths.push(...branched);
        }
    });

    // Helpers to extract data, per task, from a layer
    function readTransitionalStep(layerEl, layerNo) {
        const table = layerEl.querySelector('.transition-table');
        const headInput = table?.querySelector('thead input[type="text"]');
        const row = table?.querySelector('tbody tr');
        const step = {
            code: `${layerNo}`,
            desc: safe(headInput?.value),
            pDetection: toNum(row?.querySelector('td:nth-child(1) input')?.value),
            location: (row?.querySelector('td:nth-child(2) select')?.value || 'B'),
            mean: toNum(row?.querySelector('td:nth-child(3) input')?.value),
            sdev: toNum(row?.querySelector('td:nth-child(4) input')?.value),
        };
        return step;
    }

    function readTaskStep(layerEl, layerNo, taskIndex) {
        const table = layerEl.querySelectorAll('.task-table')[taskIndex];
        const headInput = table?.querySelector('thead input[type="text"]');
        const row = table?.querySelector('tbody tr');
        const step = {
            code: `${layerNo}.${taskIndex + 1}`,
            desc: safe(headInput?.value),
            pDetection: toNum(row?.querySelector('td:nth-child(1) input')?.value),
            location: (row?.querySelector('td:nth-child(2) select')?.value || 'B'),
            mean: toNum(row?.querySelector('td:nth-child(3) input')?.value),
            sdev: toNum(row?.querySelector('td:nth-child(4) input')?.value),
        };
        return step;
    }

    // Compute monopath metrics for a concrete path (array of step objects)
    function computePath(steps) {
        const n = steps.length;

        // Backward pass (cumulative mean delay)
        const NextCumulativeDelay_Marker = new Array(n);
        const CumulativeDelay_Marker = new Array(n);
        let nextCumDelay = 0;
        for (let i = n - 1; i >= 0; i--) {
            NextCumulativeDelay_Marker[i] = nextCumDelay;
            const cd = CalculateCumulativeDelay(steps[i].mean, nextCumDelay);
            CumulativeDelay_Marker[i] = cd;
            nextCumDelay = cd;
        }

        // Backward pass (cumulative variance)
        const NextCumulativeVariance_Marker = new Array(n);
        const CumulativeVariance_Marker = new Array(n);
        let nextCumVar = 0;
        for (let i = n - 1; i >= 0; i--) {
            NextCumulativeVariance_Marker[i] = nextCumVar;
            const cv = CalculateCumulativeVariance(steps[i].sdev, nextCumVar);
            CumulativeVariance_Marker[i] = cv;
            nextCumVar = cv;
        }

        // Forward pass (Missed Detection + Interruption Sum)
        let PreviousPoMD = 1; // product of missed detections
        let SumOfInterruption = 0; // sum of task interruptions
        const perStep = [];

        for (let i = 0; i < n; i++) {
            const s = steps[i];
            const AdjustedDetection = AdjustedProbabilityOfDetection(s.pDetection, PAssessment, PTransmission);
            const MissedDetection = ProbabilityOfMissedDetection(AdjustedDetection);
            const FirstDetection = FirstPointOfDetection(AdjustedDetection, PreviousPoMD);

            const NextCumulativeDelay = NextCumulativeDelay_Marker[i];
            const CumulativeDelay = CumulativeDelay_Marker[i];

            const NextCumulativeVariance = NextCumulativeVariance_Marker[i];
            const CumulativeVariance = CumulativeVariance_Marker[i];

            const TrueMean = CalculateTrueMean(s.location, s.mean, NextCumulativeDelay);
            const TrueVariance = CalculateTrueVariance(s.location, s.sdev, NextCumulativeVariance);

            const Z_Value = Calculate_Z_Value(TrueMean, TrueVariance, GuardResponseMean, GuardResponse_SDev);
            const CDF_Probability = CumulativeDistributionFunction(Z_Value);

            const TaskProbabilityOfInterruption = CalculateTaskProbabilityOfInterruption(FirstDetection, CDF_Probability);

            perStep.push({
                code: s.code,
                desc: s.desc,
                pDetection: s.pDetection,
                location: s.location,
                mean: s.mean,
                sdev: s.sdev,
                AdjustedDetection,
                MissedDetection,
                FirstDetection,
                CumulativeDelay,
                CumulativeVariance,
                TrueMean,
                TrueVariance,
                Z_Value,
                CDF_Probability,
                TaskProbabilityOfInterruption
            });

            PreviousPoMD *= MissedDetection;
            SumOfInterruption += TaskProbabilityOfInterruption;
        }

        const OverallProbabilityOfInterruption =
            CalculateOverallProbabilityOfInterruption(SumOfInterruption, GuardCommunication);

        return { perStep, OverallProbabilityOfInterruption };
    }

    // Build paths from DOM to get Probability of Interruption
    const evaluatedPaths = paths.map(codeList => {

        // Build steps array in order
        const steps = [];
        layers.forEach((layer, idx) => {
            const layerNo = idx + 1;
            const isTaskLayer = layer.querySelectorAll('.task-table').length > 0;

            if (!isTaskLayer) {
                steps.push(readTransitionalStep(layer, layerNo));
            } else {
                // Find matching ref for this layer [LAYER-#].[TASK-#]
                const layerRef = codeList.find(tok => tok.startsWith(`${layerNo}.`));
                const taskRef = layerRef ? Math.max(1, parseInt(layerRef.split('.')[1], 10)) : 1; // default 1
                steps.push(readTaskStep(layer, layerNo, taskRef - 1));
            }
        });

        const { perStep, OverallProbabilityOfInterruption } = computePath(steps);
        return {
            label: codeList.join(' -> '),
            steps,
            perStep,
            pInterrupt: OverallProbabilityOfInterruption
        };
    });

    // Sort by earliest path change (1.1 -> 2.1) -> (1.2 -> 2.1)
    // and identify Most Vulnerable Path (MVP)
    let mvpIdx = 0;
    for (let i = 1; i < evaluatedPaths.length; i++) {
        if (evaluatedPaths[i].pInterrupt < evaluatedPaths[mvpIdx].pInterrupt) mvpIdx = i;
    }

    // List of Paths (each with P(i) % )
    const pathLines = [];
    evaluatedPaths.forEach((p, i) => {
        const pct = (p.pInterrupt * 100).toFixed(6);
        const tag = (i === mvpIdx) ? ' [MVP]' : '';
        pathLines.push(`Path ${i + 1}: ${p.label}`);
        pathLines.push(`Probability of Interruption: ${pct} %${tag}`);
        pathLines.push('');
    });

    // MVP Reference
    const mvp = evaluatedPaths[mvpIdx];

    // MVP Probability of Interruption
    const mvpPInterruption = Number((mvp.pInterrupt * 100).toFixed(6));

    // MVP Text Print (Used for testing)
    const detailLines = [];
    detailLines.push('--------- MVP Path Details ---------\n');
    mvp.perStep.forEach((s) => {
        const layerNoStr = s.code.includes('.') ? s.code.split('.')[0] : s.code;
        detailLines.push(`Layer ${layerNoStr}:`);
        detailLines.push(`  - Task ${s.code}: ${safe(s.desc)}`);
        detailLines.push(`    - P(d): ${s.pDetection}, Location: ${s.location}, Delay Mean: ${s.mean}, Delay SDev: ${s.sdev}`);
        detailLines.push(`    - Adjust P(d): ${s.AdjustedDetection}, Missed Detection: ${s.MissedDetection}, First Detection: ${s.FirstDetection}`);
        detailLines.push(`    - Cumulative Delays: ${s.CumulativeDelay}, Cumulative Var: ${s.CumulativeVariance}, True Mean: ${s.TrueMean}, True Var: ${s.TrueVariance}`);
        detailLines.push(`    - Z-Value: ${s.Z_Value}, Normal Value: ${s.CDF_Probability}, Task Interruption Probability: ${s.TaskProbabilityOfInterruption}`);
        detailLines.push('');
    });

    return {
        pathText: pathLines.join('\n'),
        mvpDetailsText: detailLines.join('\n'),
        mvpPInterruption, // float (for %, not raw decimal)
        mvpPath: mvp.label
    };
}