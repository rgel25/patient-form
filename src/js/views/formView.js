class FormView {
  _parentElement = document.querySelector(".form");
  _btnSubmit = document.querySelector("#form-submit");
  _btnReset = document.querySelector("#form-reset");
  _btnTest = document.querySelector("#test");
  _cbNone = document.querySelector("#none-cb");
  _cbOthers = document.querySelector("#others");
  _cbYesMedication = document.querySelector("#yes-medication");
  _cbNoMedication = document.querySelector("#no-medication");
  _errorContainer = document.querySelector(".error");
  _formOverlay = document.querySelector(".form-overlay");

  constructor() {
    this._btnTest.addEventListener("click", () => {
      document.querySelector("input[name='first-name']").value = "randomfirst";
      document.querySelector("input[name='middle-name']").value =
        "randommiddle";
      document.querySelector("input[name='last-name']").value = "randomlast";
      document.querySelector("input[name='address']").value = "randomaddress";
      document.querySelector("input[name='birth-date']").value = "2018-07-22";
      document.querySelector("input[name='contact-number']").value =
        "09276302875";
      document.querySelector("input[value='male']").checked = true;
      document.querySelector("input[name='history-asthma']").checked = true;
      document.querySelector("input[name='history-cancer']").checked = true;
      document.querySelector("#yes-medication").checked = true;
      document.querySelector("#test-symptom1").selected = true;
      document.querySelector("#test-symptom2").selected = true;
    });

    this._cbNone.addEventListener("change", () => {
      if (this._cbNone.checked) {
        document
          .querySelectorAll(".history-cb")
          .forEach((cb) => cb.setAttribute("disabled", true));
      } else {
        document
          .querySelectorAll(".history-cb")
          .forEach((cb) => cb.removeAttribute("disabled"));
      }
    });

    this._cbOthers.addEventListener("change", () => {
      document.querySelector(".others-feedback").classList.toggle("hidden");
    });

    this._cbYesMedication.addEventListener("change", () => {
      if (this._cbYesMedication.checked) {
        document.querySelector("#medications").disabled = false;
      }
    });

    this._cbNoMedication.addEventListener("change", () => {
      if (this._cbNoMedication.checked) {
        document.querySelector("#medications").setAttribute("disabled", true);
      }
    });

    this._formOverlay.addEventListener("click", (e) => {
      const btn = e.target.closest("#confirm-registration");
      if (!btn) return;
      console.log("clicked");
      this._formOverlay.classList.add("form-overlay--inactive");
      this._formOverlay.innerHTML = "";
    });

    this._btnReset.addEventListener("click", (e) => {
      e.preventDefault();
      this.clearForm();
    });
  }

  addHandlerFormSubmit(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      handler(dataArr);
    });
  }

  renderError(message) {
    this._errorContainer.innerHTML = `${message}`;
  }

  renderSuccess() {
    console.log(this._formOverlay);
    this._formOverlay.classList.remove("form-overlay--inactive");
    const html = `
        <p>Patient registration succesful!</p>
        <button class="button is-primary" id="confirm-registration">Okay</button>
    `;
    this._formOverlay.innerHTML = html;
  }

  clearForm() {
    this._parentElement.reset();
    document.querySelector("#medications").disabled = false;
    this._errorContainer.innerHTML = ``;
  }
}

export default new FormView();
