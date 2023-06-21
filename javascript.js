const data_path = 'database/exercise.json';

const img_path = 'media/';


const loadData = async function(){
  try{
    const response = await fetch(data_path);
    const json = await response.json();
    return json;
  }catch(error){
    console.error('Error:',error);
    throw error;
  }
    
};

const textClicked = function(event){

  let div;

  if (event.target.classList.contains("exercise")){
    div = event.target;
  }else{

    div = event.target.parentElement;

    while(!div.classList.contains("exercise")){
      div = div.parentElement;
    }
  }

  
  //maybe more than just the item i want is being 'clicked' ?
  div.querySelector('.exercise-description').classList.toggle('show');
  
}

const createDocument = function(jsonData){
  //console.log(jsonData.Exercises)
  const exercisesContainer = document.querySelector('#exercises');

  for (let [key,value] of Object.entries(jsonData.Exercises)){
    const temp  = document.createElement('div');
    temp.id = key;

    const h3 = document.createElement('h3');
    h3.textContent = key

    temp.appendChild(h3);

    //console.log(value)
    for (let [k, v] of Object.entries(value)){

        const tempEntries = document.createElement('div');
        
        tempEntries.classList.add('exercise');
        
        tempEntries.addEventListener('click',textClicked);

        tempEntries.innerHTML = 
            `<img src="${img_path}${v.image_location}" alt="${k}">
            <h4>${k}</h4>
            <div class="exercise-description">
              <p>${v.description}</p>
            </div>
            `
        temp.appendChild(tempEntries);
    }
    exercisesContainer.appendChild(temp)
  }


  



}

loadData().then(createDocument).catch((error) => {
  console.error(error)
})



// const exercises = document.querySelector('#exercises');


// window.addEventListener('DOMContentLoaded', (event) => {
//     const exerciseItems = document.querySelectorAll('.exercise');
//     exerciseItems.forEach(item => {
//       item.addEventListener('click', () => {
//         console.log("clicked")
//         //item.querySelector('.exercise-description').classList.toggle('show');
//       });
//     });
//   });