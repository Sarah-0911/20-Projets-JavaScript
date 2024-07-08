const tableResults = document.querySelector('.table-results');
const searchInput = document.querySelector('#search');
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
  tableResults.textContent = '';
  array.forEach(user => {
    const listItem = document.createElement('li');
    listItem.classList.add('table-item');

    listItem.innerHTML = `
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
    tableResults.appendChild(listItem);
  })
};

const filterData = (e) => {
  const searchedString = e.target.value.replace(/\s/g, '').toLowerCase();
  const matchArray = findMatches(searchedString);
  createUsersList(matchArray);
}

const findMatches = (stringToMatch) => {
  return dataArray.filter(user => {
    const firstAndLast = (user.name.first + user.name.last).replace(/\s/g, '').toLowerCase();
    const lastAndFirst = (user.name.last + user.name.first).replace(/\s/g, '').toLowerCase();
    return firstAndLast.includes(stringToMatch) || lastAndFirst.includes(stringToMatch);
  })
};

searchInput.addEventListener('input', filterData);
