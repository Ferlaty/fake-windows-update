const numInput = document.getElementById('startPercent');

numInput.addEventListener('input', function() {
    let value = this.valueAsNumber;

    if (value > 99) {
        this.value = 99;
    } 
    else if (value < 0) {
        this.value = 0;
    }
});