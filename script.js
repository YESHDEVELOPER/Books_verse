// Global Variable for using multiple Times
const errorMessage = document.getElementById('error-message');
const totalFound = document.getElementById('total-found');
const searchResult = document.getElementById('search-result');


//loading spinner function
const loadingDisplay = display => {
  document.getElementById('loading').style.display = display;
}
const searchResultDisplay = display => {
  document.getElementById('search-result').style.display = display;
}


const loadData = () => {
  // input value
  const inputValue = document.getElementById('search-field');

  const loading = document.getElementById('loading');
  // error
  if (inputValue.value == '') {

    totalFound.innerHTML = '';
    errorMessage.innerHTML = `
       <span class='d-block text-gray'>Please, Input a Valid Book Name..!</span>
       `;
    searchResult.innerHTML = '';

  } else {

    // display spiner 
    loadingDisplay('block');
    searchResultDisplay('none')


    // Loading data
    const url = `https://openlibrary.org/search.json?q=${inputValue.value}`;
    fetch(url)
      .then(res => res.json())
      .then(data => displayData(data))
      .catch(error => {
        errorMessage.innerHTML = `
                     <span class='d-block text-gray'>Couldn't Get Data API Error</span>
                 `;

        loadingDisplay('none');
      });

    // clear error message
    errorMessage.innerHTML = '';

  }
  // clear input value
  inputValue.value = '';
  totalFound.innerHTML = '';


}
const displayData = (books) => {



  // search found
  totalFound.innerHTML = `

    <span class='d-block text-white'>About ${books.numFound} Results Found Searching '${books.q}' keyword</span>
    
    `;
  // No result found Message 
  if (books.numFound === 0) {
    errorMessage.innerText = `No Result's Found !`;
    loadingDisplay('none');
    totalFound.innerHTML = '';
  }

  // All About Search Result 
  const minBooks = books.docs;
  console.log(minBooks);
  searchResult.innerHTML = '';

  minBooks.forEach(book => {
    const div = document.createElement('div');
    div.classList.add('col');

    // Getting Details 
    let cover = book.cover_i;
    let title = book.title.slice(0, 10);
    let author = book.author_name;
    let publisher = book.publisher;
    let publishYear = book.first_publish_year;

    div.innerHTML = `
  <div class="card mb-4 shadow rounded mx-auto" style="max-width: 800px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          src="https://covers.openlibrary.org/b/id/${cover === undefined ? '10675600' : book.cover_i}-M.jpg"
          alt="${title ? title : "Unknown"}"
          class="img-fluid rounded-start w-100 h-100 object-fit-cover"
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h4 class="card-title text-success">${title === undefined ? 'Unknown' : title}</h4>
          <hr />
          <p class="lead mb-2"><span class="fw-bold">Author:</span> ${author === undefined ? 'Unknown' : author[0]}</p>
          <p class="lead mb-2"><span class="fw-bold">Publisher:</span> ${publisher === undefined ? 'Unknown' : publisher[0]}</p>
          <p class="card-text">
            <small class="text-muted">First Published: ${publishYear === undefined ? 'Unknown' : publishYear}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
`;

    searchResult.appendChild(div);
    // display spinner 
    loadingDisplay('none');
    searchResultDisplay('flex')
  });




}