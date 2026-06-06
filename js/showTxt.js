const checkboxESC = document.getElementById('ESC_btn');
const txt = document.getElementById('txtESC');

checkboxESC.addEventListener('change', (event) => {
  if (event.target.checked) {
    txt.style.display = 'block';
  } else {
    txt.style.display = 'none';
  }
});