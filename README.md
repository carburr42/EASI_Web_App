## EASI Web Application ##
 
This web-application is based on the Estimate of Adversary Sequence Interruption (EASI) model.
The EASI model was developed by Sandia National Laboratories in the 1970's.
The model was initially created to assess the physical security systems of nuclear facilities.
However, in recent years, the model has been used to evaluate a broad variety of physical security systems.
The original model analyses an "adversary path" broken down into sequential "tasks".
Through analysis of an adversary path, the EASI model returns a Probability of Interruption.
This probability of interruption is essentially the probability that security personnel will successfully intervene and stop the adversary.
A path outlines a sequential list of tasks that an adversary is required to perform before reaching their desired target/outcome.
For example, a path may detail the steps required for an adversary to infiltrate a nuclear facility and sabotage hazardous materials.
However, this is just one scenario, and the use case is very broad.
 
One major limitation of the EASI algorithm is that it only supports the analysis of a singular path.
In most cases, there are a number of different paths leading to the same desired outcome that the adversary could traverse.
There are also some external factors that are excluded from the model/algorithm that may impact the overall probability of interruption.
In this web application, we aim to address these limitations, whilst also adhering to the core principles of the EASI model.
This goal is achieved through the implementation of Multi Path Analysis and an adjusted probability of detection algorithm:
 
**Multi Path Analysis:** 
 
The web application we have developed iterates through each possible adversary path to determine the Most Vulnerable Path (MVP).
The MVP is essentially the adversary path that has the lowest probability of interruption (highest probability of success for the adversary).
 
**Adjusted Probability of Detection:** 
 
We have added two new parameters (P(A) & P(T)) to the EASI model to provide a more accurate probability of detection.
 
  **Parameters:** 
 
    P(D) = Probability of Detection 
    
    P(A) = Probability of Assessment 
    
    P(T) = Probability of Transmission 
      
   **Calculation/Formula:** 
   
      i) Adjusted Probability of Detection = P(D) x P(A) x P(T) 
 
## File Overview ## 
 
index.html 
 
The index.html file defines the interactive web interface (front-end).
This is where the user provides input values for detection probabilities, delay times, guard response metrics, etc.
 
EASI.js 
 
The EASI.js file contains the core EASI method/algorithm (back-end).
Using JavaScript, the file determines the MVP and overall probability of interruption.
All the algorithms and equations used by the EASI model are stored within this file.
 
 
## Global User Inputs ## 
 
The following user inputs are required to calculate the MVP and Overall Probability of Interruption.
Please note, for probability based input(s) we ask the user to provide a decimal input.
This means zero (0) equates to a 0% probability and one (1) equates to a 100% probability.
Additional example: 0.75 indicates a probability of 75%.
 
  **Global Parameters:** 
 
      i) Probability of Guard Communication:
         The probability that guards will successfully communicate when a threat/adversary is identified.    
        
     ii) P(Assessment):
         The probability that guards will successfully identify/assess an adversary/threat.
        
    iii) P(Transmission):
         The probability that alarms and security systems successfully transmit a signal.
        
     iv) Response Mean:    
         The average response time (in seconds) for guards to arrive after an adversary is detected.
        
      v) Force Time (in Seconds) Standard Deviation:
         The standard deviation of guard response time.
 
## Multi Path Layout ## 
 
We have broken down the adversary path into separate ‘layers’, or stages, where tasks can be grouped together.
The logic behind this is that there are certain tasks that may occur at the same stage of an adversary path.
For example, you may have a Nuclear Facility that is protected by a large perimeter fence on all sides.
There could be a main gate, that is guarded at all times, this would be considered a singular point of entry.
In theory, if the main gate is guarded at all times, the likelihood of sneaking past the front gate is quite low.
For example, a nuclear facility may be surrounded by a large perimeter gate on all sides.
This would be considered the first layer of physical protection.
However, there may be multiple avenues of “getting past” this first layer of physical security.
For example, there could be a main gate that is guarded at all times – this would be considered a singular point of entry.
The likelihood of sneaking past this gate is very unlikely, if guarded, so it may be one of the more secure tasks along a potential adversary path and would likely return a high probability of interruption.
Alternatively, the adversary may choose to cut the fence at the rear of the facility.
If there are no sensors or alarms, this would be the much more effective and successful route of gaining unauthorised access and would likely return a very low probability of interruption.
So, in theory, these two tasks would be grouped together (e.g., ‘sneak past the front gate’ or ‘cut the fence’) as they are two different methods of breaking the same initial layer of physical security.
The program itself is designed to analyse both options and select/return the task with the lower probability of interruption.
Which in this scenario would likely be ‘cut the fence’.
This is done recursively to determine which combination of tasks result in the lowest overall probability of interruption.
To adequately address real world scenarios, the web-application allows users to add additional layers and group tasks together within these stages.
 
## Multi Path Inputs ##
 
For probability based input(s) we ask the user to provide a decimal input.
Zero (0) equates to a 0% probability and one (1) equates to a 100% probability.
Example: 0.75 indicates a probability of 75%.
 
  **Inputs:** 
 
      i) Task Header/Description:
         This is where the user enters the task description.
         i.e., essentially a brief description explaining what the task involves.
         e.g., "Cut Fence"
        
     ii) P(Detection):
         This is where the user enters the probability of detection for the given task.
         i.e., the probability that an adversary will be detected whilst completing the task.
         This will be a decimal input (Example: 0.75 indicates a probability of 75%).
        
    iii) Location (Timing):
         At what point during the step are guards notified of the adversary's action?
        
           - B for Beginning:
             The "B" value is assigned a weight of 1.
             If guards are notified at the Beginning of a task -
             they have the full (1) duration of the task to respond.
            
           - M for Middle:
             The "M" value is assigned a weight of 0.5.
             If guards are notified halfway through a task -
             they only have half (0.5) of the task duration to respond.
            
           - E for End:
             The "E" value is assigned a weight of 0.
             If guards are notified at the end of a task -
             there is no time left (0) in the task duration to respond.
        
     iv) Delay Mean(s):
         This is the average delay time (in seconds) to perform a given task.
         i.e., how many seconds on average does it take to perform the current task?
        
      v) Delay Standard Deviation(s):
         This is the standard deviation of the delay time entered above.
 
 
## Web Output ## 
 
The web application operates by generating a two dimensional array from the user input.
This two dimensional array is traversed to enumerate every single possible path.
All possible paths are evaluated using the adjusted EASI algorithm.
The result of this is a list of all possible paths with the associated probability of interruption.
This list is sorted from the most vulnerable path (MVP) (highest chance of success for the adversary) to the least vulnerable path (lowest chance of success for the adversary).
Users have the option of displaying the probability of interruption and individual task metrics for the MVP or selecting their own custom path to analyse.
This was implemented to provide the user flexibility and simulate real world scenarios.
Users are able to choose their own custom path by selecting a desired task from each layer to create a unique combination.
