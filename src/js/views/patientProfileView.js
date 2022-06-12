class PatientProfileView {
  _parentElement = document.querySelector(".profile-card");
  _data;

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  render(data) {
    this._data = data;
    const html = this._generateMarkup();
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  _formatText(str) {
    return str
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }

  _formatDate(date) {
    // prettier-ignore
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const toFormat = new Date(date);
    const formatedDate = `${
      month[toFormat.getMonth()]
    } ${toFormat.getDate()}, ${toFormat.getFullYear()}`;
    return formatedDate;
  }

  fullName() {
    if (this._data.middleName === "") {
      return `${this._data.firstName} ${this._data.lastName}`;
    } else {
      return `${this._data.firstName} ${this._data.middleName} ${this._data.lastName}`;
    }
  }

  age() {
    let ageInMilliseconds = new Date() - new Date(this._data.birthDate);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
  }

  _generateMarkup() {
    return `
    <div class="card-patient-profile">
    <h3 class="has-text-weight-bold">Patient Information</h3>
    <p>
      <span class="profile-info has-text-weight-bold">📝Full Name:</span>
      <span class="patient-info">${this._formatText(this.fullName())}</span>
    </p>
    <p>
      <span class="profile-info has-text-weight-bold">🎂Birthdate:</span>
      <span class="patient-info">${this._formatDate(
        this._data.birthDate
      )}</span>
    </p>
    <p>
      <span class="profile-info has-text-weight-bold">🎉Age:</span>
      <span class="patient-info">${this.age()}</span>
    </p>
    <p>
      <span class="profile-info has-text-weight-bold">📱Contact Number:</span>
      <span class="patient-info">${this._data.contactNumber}</span>
    </p>
    <p>
      <span class="profile-info has-text-weight-bold">🧬Gender:</span>
      <span class="patient-info">${this._formatText(this._data.gender)}</span>
    </p>
    <p>
      <span class="profile-info has-text-weight-bold">📌Address:</span>
      <span class="patient-info">${this._data.address}</span>
    </p>
  </div>
  <div class="card-patient-medical">
    <h3 class="has-text-weight-bold">Medical Profile</h3>
    <p>
      <span class="profile-info has-text-weight-bold">🧾Medical History:</span>
      <span class="patient-info">${this._formatText(
        this._data.medicalHistory.join(", ")
      )}</span>
    </p>
    <p>
      <span class="profile-info has-text-weight-bold">😷Current Symptom:</span>
      <span class="patient-info">${this._formatText(
        this._data.currentSymptoms.join(", ")
      )}</span>
    </p>
    <p>
      <span class="profile-info has-text-weight-bold">💊Medications:</span>
      <span class="patient-info">${
        this._data.medications
          ? this._formatText(this._data.medications)
          : "N/A"
      }</span>
    </p>
  </div>
    `;
  }
}

export default new PatientProfileView();
