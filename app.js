const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const age = document.getElementById("age");
const department = document.getElementById("department");

const submit = document.getElementById("submit");
const reset = document.getElementById("reset");
const tbody = document.getElementById("tbody");

let payload = {};
const addData = [];
let clickEdit = false;
let dataIndex;

const regexpName = /^[A-Za-z]*$/;
const regexpeDpartment = /^[A-Za-z ]*$/;

const clearInput = () => {
  firstName.value = "";
  lastName.value = "";
  age.value = "";
  department.value = "";
};
reset.addEventListener("click", clearInput);

let inputValidation = () => {
  if (firstName.value !== "" && firstName.value.match(regexpName)) {
    if (lastName.value !== "" && lastName.value.match(regexpName)) {
      if (
        age.value != "" &&
        Number(age.value) >= 10 &&
        Number(age.value) < 99
      ) {
        if (
          department.value != "" &&
          department.value.match(regexpeDpartment)
        ) {
          return true;
        } else {
          alert("department only contains texts and spaces");
        }
      } else {
        alert("age should be between 10 and 99");
      }
    } else {
      alert(
        "name must not be empty and should only contain text without spaces"
      );
    }
  } else {
    alert("name must not be empty and should only contain text without spaces");
  }
};

const submitData = (e) => {
  if (inputValidation()) {
    let localdata = JSON.parse(localStorage.getItem("data"));
    e.preventDefault();
    payload.firstName = firstName.value;
    payload.lastName = lastName.value;
    payload.age = age.value;
    payload.department = department.value;
    // const localStorageData = localStorage.getItem('Data') && JSON.parse(localStorage.getItem('Data'));
    if (clickEdit === false) {
      if (!localdata) {
        addData.push(payload);
        localStorage.setItem("data", JSON.stringify(addData));
      } else {
        localdata.push(payload);
        localStorage.setItem("data", JSON.stringify(localdata));
      }
      alert("data submitted");
      location.reload();
    } else {
      console.log(localdata);
      console.log(localdata[dataIndex]);
      localdata[dataIndex] = payload;
      console.log(localdata);
      localStorage.setItem("data", JSON.stringify(localdata));
      alert(`employee ${dataIndex} is edited`);
      clickEdit = !clickEdit;
    }
    payload = {};
    loadTable();
    clearInput();
  }
};

submit.addEventListener("click", submitData);

const loadTable = () => {
  tbody.innerHTML = "";
  const fetchedData = JSON.parse(localStorage.getItem("data"));
  fetchedData.map((item, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${index + 1}</td><td>${item.firstName}</td><td>${
      item.lastName
    }</td><td>${item.age}</td><td>${
      item.department
    }</td><td> <button id="edit" value=${index} class="btn btn-primary" >Edit</button><button id="delete" value=${index} class="btn btn-primary" >Delete</button></td>`;
    tbody.appendChild(tr);
  });
  if (document.getElementsByTagName("td")) {
    const edit = document.querySelectorAll("#edit");
    edit.forEach((e) => {
      e.addEventListener("click", () => {
        clickEdit = !clickEdit;
        dataIndex = e.value;
        const fetchedEdit = JSON.parse(localStorage.getItem("data"))[dataIndex];
        firstName.value = fetchedEdit.firstName;
        lastName.value = fetchedEdit.lastName;
        age.value = fetchedEdit.age;
        department.value = fetchedEdit.department;
      });
    });
    const deleteButton = document.querySelectorAll("#delete");
    deleteButton.forEach((e) => {
      e.addEventListener("click", () => {
        dataIndex = e.value;
        const fetcheddelete = JSON.parse(localStorage.getItem("data"));
        console.log(fetcheddelete.splice(dataIndex, 1));
        localStorage.setItem("data", JSON.stringify(fetcheddelete));
        loadTable();
      });
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  loadTable();
});
