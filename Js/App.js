document.body.classList.add('js-loading');

window.addEventListener("load", showPage);

function showPage() {
  document.body.classList.remove('js-loading');
}

const modal = document.querySelector('.modal');
const previews = document.querySelectorAll('.previews');
const original = document.querySelector(".full-img");

previews.forEach(preview => {
    preview.addEventListener('click',() =>{
        modal.classList.add('open');
        original.classList.add('open');
        // Dynamic change image
        const originalSrc = preview.getAttribute("data-original");
        // console.log(originalSrc);
        original.src=`${originalSrc}`;
    });
});

modal.addEventListener('click',(e) => {
    if(e.target.classList.contains("modal")){
        modal.classList.remove("open");
        original.classList.remove('open');
    }
});


