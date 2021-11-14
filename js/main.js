

/* -------------------------------------------------------------------------- */
/*                                  carousel                                  */
/* -------------------------------------------------------------------------- */
function carousel(containerCarousel,indicator,film,leftArrow,rightArrow){

  const thread = document.querySelector(containerCarousel);
  const films = document.querySelectorAll(film);

  const arrowLeft = document.getElementById(leftArrow);
  const arrowRight = document.getElementById(rightArrow);

  arrowRight.addEventListener('click', () => {
    thread.scrollLeft += thread.offsetWidth;
    const  indicatorActive  =  document.querySelector(indicator +'.active') ;
    if(indicatorActive.nextSibling) {
      indicatorActive.nextSibling.classList.add('active') ;
      indicatorActive.classList.remove('active') ;
    }
  });

  arrowLeft.addEventListener('click', () => {
    thread.scrollLeft -= thread.offsetWidth;
    const indicatorActive = document.querySelector(indicator +'.active');
    if(indicatorActive.previousSibling){
      indicatorActive.previousSibling.classList.add('active');
      indicatorActive.classList.remove('active');
    }
  
  });

  /* -------------------------------------------------------------------------- */
/*                                 pagination                                 */
/* -------------------------------------------------------------------------- */

  // const nbPaginations = Math.ceil(films.length / 4);

  // for(let i = 0; i < nbPaginations; i++){
  //   const indicators = document.createElement('button');

  //   if(i === 0){
  //     indicator.classList.add('active');
  //   }

  //   document.querySelector(indicator).appendChild(indicators);
  //   console.log(document.querySelector(indicator),'tttttttttttttttttttttttt')
  //   indicator.addEventListener('click', (e) => {
  //     thread.scrollLeft = i * thread.offsetWidth;

  //     document.querySelector(indicator +'.active').classList.remove('active');
  //     e.target.classList.add('active');
  //   }); 
  //   }

  // films.forEach((film) => {
  //   film.addEventListener('mouseenter', (e) => {
  //     const element = e.currentTarget;
  //     setTimeout(() => {
  //       films.forEach(film => film.classList.remove('hover'));
  //       element.classList.add('hover');
  //     }, 300);
  //   });
  // });

  // thread.addEventListener('mouseleave', () => {
  //   films.forEach(film => film.classList.remove('hover'));
  // });

    

}



/* -------------------------------------------------------------------------- */
/*                              Fetch Best Movie                              */
/* -------------------------------------------------------------------------- */
async function fetchMovieJSON() {
  const response = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score');
  const movie = await response.json();
  return movie;
}
fetchMovieJSON().then(movie => {
  movie; // fetched movies
  bestFilm = movie.results[0];
  let title = document.getElementById("title")
  let texte = document.createTextNode(bestFilm.title)
  title.appendChild(texte)

  picture = document.getElementsByClassName("best-film")[0]
  picture.setAttribute("style","background-image : url("+bestFilm.image_url+"); background-repeat= fixed; background-size: 100%");
  // picture.style.backgroundSize="100%";
  // picture.style.backgroundRepeat="fixed";

  // picture = document.getElementsByClassName("img-dynamic")[0]//.style.backgroundImage = "linear-gradient(rgba(129, 88, 88, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%),url("+bestFilm.image_url+")";
  // console.log(picture,'------------------')
  
  // picture.setAttribute('src',bestFilm.image_url)

  let btn = document.getElementsByClassName("button-information");
	btn[0].addEventListener("click", function () {
		  createModal(bestFilm.id);
		})
});


/* -------------------------------------------------------------------------- */
/*                                    Import Image                            */
/* -------------------------------------------------------------------------- */


  
// async function fetchMovies() {
//   const [moviesPage, categoriesPage] = await Promise.all([
//     fetch('http://localhost:8000/api/v1/titles/?imdb_score_min=9'),
//     fetch('http://localhost:8000/api/v1/titles/?imdb_score_min=9&page=2')
//   ]);

//   const movies = await moviesPage.json();
//   const categories = await categoriesPage.json();
  
//   return [movies, categories];
// };

// fetchMovies().then(([movies, categories]) => {
//   movies;     // fetched movies
//   categories; // fetched categories
  
//   let imageSuite=categories.results;
//   let imageTest=movies.results;
//   let cmt=0;
  

//   imageTest.forEach(i => {
//     let mod = document.getElementsByClassName('film')[cmt];
//     cmt +=1
//     let image = document.getElementsByClassName(`img${cmt}`)[0];
//     image.setAttribute('src',`${i.image_url}`);
//     mod.addEventListener("click",()=>{createModal(i.id)});
    
//   });
  
//   imageSuite.forEach(i => {
//     let mod = document.getElementsByClassName('film')[cmt];
//     cmt +=1
//     let image = document.getElementsByClassName(`img${cmt}`)[0]
//     image.setAttribute('src',`${i.image_url}`)
//     mod.addEventListener("click",()=>{createModal(i.id)});
  
//   })
   
// }).catch(error => {
//   //request failed
// });

/* -------------------------------------------------------------------------- */
/*                                    Modal                                   */
/* -------------------------------------------------------------------------- */

function createModal(id) {
  let modal = document.getElementById("myModal");
  let span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  test=id
  

  fetch("http://localhost:8000/api/v1/titles/"+test)

  .then(function(res) {
      if (res.ok) {
        
        return res.json();
      }
  })
    .then(function(data) {
      
      
      let modal_img = document.getElementsByClassName("modal__img")[0];
      modal_img.innerHTML = "<p><img src='" +  data.image_url + "'></p>";
      
      let modal_title = document.getElementsByClassName("title")[1];
      modal_title.innerHTML = `Title :  ${data.title}`;
      let modal_genre = document.getElementsByClassName("genre")[0];
      modal_genre.innerHTML = `Genre :  ${data.genres}`;
      let modal_release_date = document.getElementsByClassName("release-date")[0];
      modal_release_date.innerHTML = `Release date :  ${data.year}`;
      let modal_rated = document.getElementsByClassName("rated")[0];
      modal_rated.innerHTML = `Rated :  ${data.rated}`;
      let modal_Imdb_score = document.getElementsByClassName("Imdb-score")[0];
      modal_Imdb_score.innerHTML = `Imbd score :  ${data.imdb_score}`;
      let modal_director = document.getElementsByClassName("director")[0];
      modal_director.innerHTML = `Directors :  ${data.directors}`;
      let modal_list_of_actors = document.getElementsByClassName("list-of-actors")[0];
      modal_list_of_actors.innerHTML = `Actors :<br/>  ${data.actors}`;
      let modal_duration = document.getElementsByClassName("duration")[0];
      modal_duration.innerHTML = `Duration : ${data.duration} min`;
      let modal_country_of_origin = document.getElementsByClassName("country-of-origin")[0];
      modal_country_of_origin.innerHTML = `Country : ${data.countries}`;
      let modal_result_box_office = document.getElementsByClassName("result-box-office")[0];
      modal_result_box_office.innerHTML = `Box Office : ${data.worldwide_gross_income}`;
      let modal_summary = document.getElementsByClassName("summary")[0];
      modal_summary.innerHTML = `Summary :<br/>  ${data.description}`;

      
      span.onclick = function() {
      modal.style.display = "none";

      
      
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
        
        }
      }
  
})
  .catch(function(error) {
    console.error('Error:', error);
});
};


/* -------------------------------------------------------------------------- */
/*                             test factorisation                             */
/* -------------------------------------------------------------------------- */


function factorisationAsync(url1,url2,img,film){

  async function fetchMovies() {
  const [moviesPage, categoriesPage] = await Promise.all([
    fetch(url1),
    fetch(url2)
  ]);

  const movies = await moviesPage.json();
  const categories = await categoriesPage.json();
  return [movies, categories];
  };


  fetchMovies().then(([movies, categories]) => {
    movies;     //fetched movies
    categories; //fetched categories
    
    let imageSuite=categories.results;
    let imageTest=movies.results;
    let cmt=0;
    

    imageTest.forEach(i => {
      let mod = document.getElementsByClassName(`${film}`)[cmt];
      cmt +=1
      let image = document.getElementsByClassName(`${img+cmt}`)[0];
      image.setAttribute('src',`${i.image_url}`);
      mod.addEventListener("click",()=>{createModal(i.id)});
      
    });
    
    imageSuite.forEach(i => {
      let mod = document.getElementsByClassName(`${film}`)[cmt];
      cmt +=1
      let image = document.getElementsByClassName(`${img+cmt}`)[0]
      image.setAttribute('src',`${i.image_url}`)
      mod.addEventListener("click",()=>{createModal(i.id)});
      
    
    })
    
  }).catch(error => {
    //request failed
  });
};
factorisationAsync('http://localhost:8000/api/v1/titles/?imdb_score_min=9', 'http://localhost:8000/api/v1/titles/?imdb_score_min=9&page=2','img','film');

factorisationAsync('http://localhost:8000/api/v1/titles/?genre_contains=horror&sort_by=-imdb_score', 'http://localhost:8000/api/v1/titles/?genre_contains=horro&sort_by=-imdb_score&page=2','h_img','h_film');

factorisationAsync('http://localhost:8000/api/v1/titles/?genre_contains=action&sort_by=-imdb_score', 'http://localhost:8000/api/v1/titles/?genre_contains=action&sort_by=-imdb_score&page=2', 'a_img','a_film');

carousel(".container-carousel2",".indicators1",".h_film",'left-arrow1','right-arrow1');
carousel(".container-carousel",".indicators",".film",'left-arrow','right-arrow');
carousel(".container-carousel3",".indicators2",".a_film",'left-arrow2','right-arrow2');