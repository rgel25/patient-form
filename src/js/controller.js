import * as model from "./model";
import formView from "./views/formView";
import patientProfileView from "./views/patientProfileView";
import previewProfileView from "./views/previewProfileView";

// Form validations
// contains numbers
const containsNumbers = (...inputs) => inputs.some((input) => /\d/.test(input));

const containsSpecialCharacters = (...inputs) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return inputs.some((input) => specialChars.test(input));
};

const isBlank = (...inputs) =>
  inputs.some((input) => input.trim().length === 0);

const isValidContactNo = function (input) {
  return input.toString().startsWith("09") && input.length === 11;
};

const controlFormSubmit = function (data) {
  const dataObject = Object.fromEntries(data);
  const [nameFields] = [
    dataObject["first-name"],
    dataObject["middle-name"],
    dataObject["last-name"],
  ];
  // VALIDATION
  // Validate Name fields - Special Character
  if (containsSpecialCharacters(nameFields))
    return formView.renderError(
      "Name must not contain special characters. Please double check the name fields and try again."
    );
  // Validate Name fields - No numbers string
  if (containsNumbers(nameFields))
    return formView.renderError(
      "Name must not contain numbers. Please double check the name fields and try again."
    );

  // Validate Name fields - blank name field
  if (isBlank(dataObject["first-name"], dataObject["last-name"]))
    return formView.renderError(
      "First and last name can't be blank. Please double check the name fields and try again."
    );
  // Validate Age
  const today = Date.now();
  const birthDate = new Date(`${dataObject["birth-date"]}`).getTime();
  if ((today - birthDate) / (1000 * 60 * 60 * 24) < 1)
    return formView.renderError("Patient must be at least a day old.");
  const currentYear = new Date(Date.now()).getFullYear();
  const birthYear = new Date(`${dataObject["birth-date"]}`).getFullYear();
  if (currentYear - birthYear > 90 && currentYear - birthYear < 120)
    return formView.renderError(
      "Patients 90 years old and above goes through a different registration process. Please inform the help desk directly."
    );
  if (currentYear - birthYear > 120)
    return formView.renderError("Please enter a valid birthdate");

  // Validate Contact number

  if (!isValidContactNo(dataObject["contact-number"]))
    return formView.renderError("Please enter a valid phone number");
  if (dataObject.gender !== "male" && dataObject.gender !== "female")
    // Validate gender
    return formView.renderError("Please select between male or female.");

  // extract multiple history
  const history = data
    .filter((el) => el[0].startsWith("history"))
    .map((el) => el[0].replaceAll("history-", ""));
  // Validate history
  if (history.length === 0)
    return formView.renderError(
      "Please select at least one field in the Medical History fields."
    );
  // extract multiple symptoms
  const symptoms = data.filter((el) => el[0] === "symptoms").map((el) => el[1]);
  // validate symptoms
  if (symptoms.length === 0)
    return formView.renderError(
      "Please select at least one field in the Current Symptoms fields."
    );

  // Validate medications
  if (dataObject.medication === "yes" && dataObject.medications === "")
    return formView.renderError("Please specify your current medications");

  model.submitPatientInformation(dataObject, history, symptoms);

  // SUCCESS FEEDBACK
  formView.renderSuccess();

  // CLEAR FORM
  formView.clearForm();
  // ADD PATIENT TO PATIENTS
  model.addPatient(model.state.patient);
  // RENDER ADDED PATIENT
  window.history.pushState(null, "", `#${model.state.patient.id}`);
  patientProfileView.render(model.state.patient);
  previewProfileView.render(model.state.patients);
};

const controlPatientCard = function () {
  const id = window.location.hash.slice(1);
  if (!id) return;
  model.state.patient =
    model.state.patients[
      model.state.patients.findIndex((patient) => +patient.id === +id)
    ];

  patientProfileView.render(model.state.patient);
};

const controlPreviewProfile = function () {
  previewProfileView.render(model.state.patients);
};

const init = function () {
  formView.addHandlerFormSubmit(controlFormSubmit);
  patientProfileView.addHandlerRender(controlPatientCard);
  previewProfileView.addHandlerRender(controlPreviewProfile);
};

init();
