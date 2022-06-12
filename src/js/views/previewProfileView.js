class PreviewProfileView {
  _parentElement = document.querySelector(".patients-preview");
  _data;

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  render(data) {
    this._data = data;
    if (!this._data) return;
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

  //   fullName() {
  //     return `${this._data.firstName} ${this._data.middleName} ${this._data.lastName}`;
  //   }

  //   age() {
  //     let ageInMilliseconds = new Date() - new Date(this._data.birthDate);
  //     return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
  //   }
  //
  _generateMarkup() {
    return this._data
      .map((el) => {
        if (el.middleName === "") {
          return `<li>
      <a class="patient-preview" href="#${el.id}">
      <span>${this._formatText(`${el.firstName} ${el.lastName}`)}</span>
    </a>
     </li>
     `;
        } else {
          return `<li>
      <a class="patient-preview" href="#${el.id}">
      <span>${this._formatText(
        `${el.firstName} ${el.middleName} ${el.lastName}`
      )}</span>
    </a>
     </li>
     `;
        }
      })
      .join("");
  }
}

export default new PreviewProfileView();
