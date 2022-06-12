export const state = {
  patient: {},
  patients: [],
};

class Patient {
  constructor(
    firstName,
    middleName,
    lastName,
    address,
    birthDate,
    contactNumber,
    gender,
    medicalHistory,
    currentSymptoms
  ) {
    (this.firstName = firstName),
      (this.middleName = middleName),
      (this.lastName = lastName),
      (this.address = address),
      (this.birthDate = birthDate),
      (this.contactNumber = contactNumber),
      (this.gender = gender),
      (this.medicalHistory = medicalHistory),
      (this.currentSymptoms = currentSymptoms);
    this.medications;
  }

  fullName() {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  }

  age() {
    let ageInMilliseconds = new Date() - new Date(this.birthDate);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
  }
}

const createId = function () {
  return Date.now() + Math.floor(Math.random() * 10 + 1);
};

export const submitPatientInformation = function (data, history, symptoms) {
  const id = createId();
  const patient = new Patient(
    data["first-name"],
    data["middle-name"],
    data["last-name"],
    data.address,
    data["birth-date"],
    data["contact-number"],
    data.gender,
    history,
    symptoms
  );
  if (data.medications) patient.medications = data.medications;
  patient.id = id;
  state.patient = patient;
};

const persistPatients = function () {
  localStorage.setItem("patients", JSON.stringify(state.patients));
};

export const addPatient = function (patient) {
  state.patients.push(patient);

  persistPatients();
};

const init = function () {
  const storage = localStorage.getItem("patients");
  if (storage) state.patients = JSON.parse(storage);
  console.log(state.patients);
};

init();
