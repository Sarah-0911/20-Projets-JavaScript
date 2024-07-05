const tableResults = document.querySelector('.table-results');
let dataArray;

const getUsers = async() => {
  try {
    const url = 'https://randomuser.me/api/?nat=fr&results=50';
    const response = await fetch(url);

    const {results} = await response.json();

    orderList(results);
    dataArray = results;
    createUsersList(dataArray);

  } catch (error) {
    console.log(error);
  }
};

getUsers()

const orderList = (data) => {
  data.sort((a,b) => {
    if (a.name.last < b.name.last) {
      return - 1;
    } else if (a.name.last > b.name.last) {
      return 1;
    }
    else {
      return 0;
    }
  });
  return data;
};

const createUsersList = (array) => {
  array.forEach(user => {
    const listItems = document.createElement('li');
    listItems.classList.add('table-item');

    listItems.innerHTML = `
      <p class="main-info">
        <img
          src="${user.picture.thumbnail}"
          alt="avatar picture"
        />
        <span>${user.name.last} ${user.name.first}</span>
      </p>
      <p class="email">${user.email}</p>
      <p class="phone">${user.phone}</p>
    `;
    tableResults.appendChild(listItems);
  })
};
