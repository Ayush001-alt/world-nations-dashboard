const countryName= new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1 ')
const nativeName = document.querySelector('.native-Name');
const population = document.querySelector('.population ')
const region = document.querySelector('.region  ')
const subregion = document.querySelector('.sub-region ')
const capital = document.querySelector('.capital  ')
const topleveldomain = document.querySelector('.top-level-domain  ')
const currency = document.querySelector('.currency ')
const languages = document.querySelector('.language ')
const borderCountries = document.querySelector('.border-countries ')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=>res.json())
.then(([country])=>{

    
    flagImage.src = country.flags.svg
    countryNameH1.innerText = country.name.common;
    population.innerText = country.population.toLocaleString('en-IN')
    region.innerText = country.region
    topleveldomain.innerText = country.tld.join(', ')

    if(country.capital){
        capital.innerText = country.capital?.[0]
    }

    if(country.subregion){
        subregion.innerText = country.subregion
    }
   
    if(country.name.nativeName){
      nativeName.innerText =Object.values(country.name.nativeName)[0].common
    }else{
        nativeName.innerText = country.name.common
    }

    if(country.currencies){
      currency.innerText=(Object.values(country.currencies).map((currency)=> currency.name).join(', ' ))
    }
    if(country.languages){
      languages.innerText=Object.values(country.languages).join(', ' )
    }
    
    if(country.borders){
        country.borders.forEach((border)=>{
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res)=> res.json())
            .then(([borderCountry])=>{
                // console.log(borderCountry);
                const borderCountryTag = document.createElement('a')
                borderCountryTag.innerText = borderCountry.name.common
                borderCountryTag.href = `country.html?name=${ borderCountry.name.common}`
                // console.log( borderCountryTag)
                borderCountries.append(borderCountryTag)
            })
        })
    }
    

        
})
const themeChanger = document.querySelector('.theme-changer');
const body = document.body;

// Apply saved theme on load
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  if (themeChanger) {
    themeChanger.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp; Light Mode`;
  }
}

// Handle theme change click
if (themeChanger) {
  themeChanger.addEventListener('click', () => {
    body.classList.toggle('dark');

    if (body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
      themeChanger.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp; Light Mode`;
    } else {
      localStorage.setItem('theme', 'light');
      themeChanger.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp; Dark Mode`;
    }
  });
}
