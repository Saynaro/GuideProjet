const button = document.getElementById('view_more');
const extraItems = document.querySelectorAll('.extra');
let shown = false;

button.addEventListener('click', () => {
  extraItems.forEach(item => {
    item.classList.toggle('show'); // ajouter supprime class "show"
  });

  button.textContent = shown ? 'View More' : 'Hide';
  shown = !shown;
});

const buttons = document.querySelectorAll(".button")
buttons.forEach(touch => {
    touch.addEventListener("click",() =>{
        buttons.forEach(btn => btn.classList.remove("active")); 
            touch.classList.add("active");   
    });
});