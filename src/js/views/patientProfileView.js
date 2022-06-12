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
    return `${this._data.firstName} ${this._data.middleName} ${this._data.lastName}`;
  }

  age() {
    let ageInMilliseconds = new Date() - new Date(this._data.birthDate);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
  }

  _generateMarkup() {
    return `
    <div class="card-patient-profile">
    <h3>Patient Information</h3>
    <p>
      <span class="profile-info">📝Full Name:</span>
      <span class="patient-info">${this._formatText(this.fullName())}</span>
    </p>
    <p>
      <span class="profile-info">🎂Birthdate:</span>
      <span class="patient-info">${this._formatDate(
        this._data.birthDate
      )}</span>
    </p>
    <p>
      <span class="profile-info">🎉Age:</span>
      <span class="patient-info">${this.age()}</span>
    </p>
    <p>
      <span class="profile-info">📱Contact Number:</span>
      <span class="patient-info">${this._data.contactNumber}</span>
    </p>
    <p>
      <span class="profile-info">🧬Gender:</span>
      <span class="patient-info">${this._formatText(this._data.gender)}</span>
    </p>
    <p>
      <span class="profile-info">📌Address:</span>
      <span class="patient-info">${this._data.address}</span>
    </p>
  </div>
  <div class="card-patient-medical">
    <h3>Medical Profile</h3>
    <p>
      <span class="profile-info">🧾Medical History:</span>
      <span class="patient-info">${this._formatText(
        this._data.medicalHistory.join(", ")
      )}</span>
    </p>
    <p>
      <span class="profile-info">😷Current Symptom:</span>
      <span class="patient-info">${this._formatText(
        this._data.currentSymptoms.join(", ")
      )}</span>
    </p>
    <p>
      <span class="profile-info">💊Medications:</span>
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
