
function extract_content(){

// Get all the job card articles
const jobCards = document.querySelectorAll('article[data-card-type="JobCard"]');
const logo_id = "192bd642af06ed95cc40f63f11fd14c0283d0a2c";

// Create a new div to hold all the job card HTML
let jobCardsContainer = document.querySelector('#jobCardsContainer');
if (!jobCardsContainer) {
  jobCardsContainer = document.createElement('div');
  jobCardsContainer.id = 'jobCardsContainer';
  document.body.appendChild(jobCardsContainer);
} else {
  jobCardsContainer.innerHTML = '';
}

// Loop through each job card article and extract the necessary data
jobCards.forEach((article) => {
  const titleElement = article.querySelector('[data-automation="jobTitle"]');
  const logo_element = article.querySelector('[data-automation="company-logo"] img');
  const title = titleElement ? titleElement.textContent.trim() : '';
  let titleHref = titleElement ? titleElement.getAttribute('href') : '';
  let logo_id_found = false;
  let titleHrefFull;

  console.log('titleHref:', titleHref);

 /* Query each job post and check html for links to logo containing specifified logo_id*/
  if(logo_element && logo_element.src){
      //let url = logo_element.src;
      let url = 'https://www.seek.com.au' + titleHref;
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", url, false ); // false for synchronous request
      xmlHttp.send( null );
      logo_id_found = xmlHttp.responseText.includes(logo_id);
  }

    if(!logo_id_found ){
        return;
    }

  console.log('Title:', title);
  console.log('titleHref:', titleHref);
  if (titleHref) {
    titleHrefFull = 'https://www.seek.com.au' + titleHref;

  }

  const companyElement = article.querySelector('[data-automation="jobCompany"]');
  const company = companyElement ? companyElement.textContent.trim() : '';
  console.log('Company:', company);

  const locationElement = article.querySelector('[data-automation="jobLocation"]');
  const location = locationElement ? locationElement.textContent.trim() : '';
  console.log('Location:', location);

  const salaryElement = article.querySelector('[data-automation="jobSalary"]');
  const salary = salaryElement ? salaryElement.textContent.trim() : '';
  console.log('Salary:', salary);

  const classificationElement = article.querySelector('[data-automation="jobClassification"]');
  const classification = classificationElement ? classificationElement.textContent.trim() : '';
  console.log('Classification:', classification);

  const subClassificationElement = article.querySelector('[data-automation="jobSubClassification"]');
  const subClassification = subClassificationElement ? subClassificationElement.textContent.trim() : '';
  console.log('Sub Classification:', subClassification);

  const descriptionElement = article.querySelector('[data-automation="jobShortDescription"]');
  const description = descriptionElement ? descriptionElement.textContent.trim() : '';
  console.log('Description:', description);

  // Extract the list items from the description
  let descriptionUl = '';
  const descriptionUlElement = article.querySelector('ul');
  if (descriptionUlElement) {
    const listItems = descriptionUlElement.querySelectorAll('li');
    for (let i = 0; i < listItems.length; i++) {
      descriptionUl += `<li>${listItems[i].textContent.trim()}</li>`;
    }
  }
  console.log('DescriptionUl: Generated:');
  //console.log('DescriptionUl:', descriptionUl);

  // Create the HTML code for this job card
  const html = `
    <div class="job-card">
      ${titleHrefFull ? `<h3><a href="${titleHrefFull}" target="_blank">${title}</a></h3>` : `<h3>${title}</h3>`}
      <p class="company">${company}</p>
      <p class="location">${location}</p>
      <p class="salary">${salary}</p>
      <p class="classification">${classification}</p>
      <p class="sub-classification">${subClassification}</p>
      <ul class="descriptionUl">${descriptionUl}</ul>
      <p class="description">${description}</p>
      <p class="apply"><button class="apply-button"${titleHrefFull ? `><a href="${titleHrefFull}" target="_blank">Apply Now</a></button>` : ' disabled>Not available</button>'}</p>
    </div>
  `;

  // Add the HTML code for this job card to the container
  jobCardsContainer.innerHTML += html;
});

let text = document.querySelector('#jobCardsContainer').outerHTML;
//copy(text);
//console.log('DescriptionUl: Copied to Clipboard:');
navigator.clipboard.writeText(text)

}

// Run function
extract_content()
