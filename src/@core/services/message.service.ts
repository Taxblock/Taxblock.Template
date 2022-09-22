import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  ltaDatePeriod: string = "Travelling period should be within 30 days";
  startDateEndDateError: string = "Please check start date & end date";
  validationError: string = "Please enter valid details";
  applicationError: string = "Failed due to application error";
  serviceError: string = "Failed to load due to service error";
  addedSuccessfully: string = "Record added successfully";
  savedSuccessfully: string = "Record saved successfully";
  removedSuccessfully: string = "Record removed successfully";
  statusChangedSuccessfully: string = "Status updated successfully";
  addedProofsSuccessfully: string = "Proofs added successfully";
  removedProofsSuccessfully: string = "Proofs removed successfully";
  passwordChangedSuccessfully: string = "Password changed successfully";
  alreadyExists: string = "User already exists";
  alreadyPANExists: string = "User PAN already exist";
  alreadyEmailExists: string = "User EmailID already exist";
  alreadyUsernameExists: string = "Username already exist";
  alreadyEmpIdExists: string = "Emp ID already exist";
  notFound: string = "Record not found";
  deactivatedSuccessfully = "Record deactivated successfully";
  activatedSuccessfully = "Record activated successfully";
  notAllowed = "Submit not allowed";
  InvestmentCycleCheck = "No Investment Cycle open currently";
  poiSubmitValidationFailed = "One or more attched files are missing";
  poiTrackingConsiderFailed = "One or more category is pending";
  releaseCycleAcceptTerm = "Please accept terms";
  deactivatedUser = "Your account is currently deactivated by administrator";
  submitConfirmation = "Are you sure you want to confirm?";
  regimeConfirmation = "Please select Regime before proceed";
  removeConfirmation = "Are you sure you want to remove?";
  deactivateConfirmation = "Are you sure you want to deactivate?";
  activateConfirmation = "Are you sure you want to activate?";
  editConfirmation = "Are you sure you want to edit?";
  editHousingLoanConfirmation = "Are you sure you want to edit Housing Loan?";
  recoveredAmountValidation = "Recovered amount shouldn't exceed value amount.";
  declaredAmountValidation =
    "Declared amount should be greater than TDS amount";
  investedAmountValidation =
    "Invested amount should be greater than TDS amount";
  CheckInputValue = "Please check input value,Only accept the numbers";
  regimeUpdatedSuccessfully = "Regime updated successfully";
  pleaseSelectRegime = "Please select Regime";
  emailSent = "Email sent successfully";
  notificationSent = "Notification sent successfully";
  emailandNotificationSent = "Email and Notification sent successfully";
  noInternetConnection = "No Internet Connection";
  detailsRequired = "All details are required";
}
