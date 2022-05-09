//create elements
const body = document.querySelector('body');
const gridContainer = document.createElement('div');
gridContainer.setAttribute('class', 'grid-container');
const buttonContainer = document.createElement('div');
buttonContainer.setAttribute('class', 'button-container');
const newGrid = document.createElement('button');
newGrid.textContent = 'New Grid';
const randomMode = document.createElement('button');
randomMode.textContent = "Random Mode";
const shadeMode = document.createElement('button');
shadeMode.textContent = "Shade Mode";
body.appendChild(buttonContainer);
buttonContainer.appendChild(randomMode);
buttonContainer.appendChild(shadeMode);
buttonContainer.appendChild(newGrid);
body.appendChild(gridContainer);
//create booleans for random mode and shade mode, initialized to false
var isRandom = false;
var isShade = false;
//change cell background-colors to random on hover if isRandom = true
function makeRandom() {
    isRandom = true;
    isShade = false;
    randomMode.style.backgroundColor = 'purple';
    shadeMode.style.backgroundColor = 'rgb(56, 56, 56)';
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.add('random'));
    let randomized = document.querySelectorAll('.random');
    randomized.forEach(cell => cell.addEventListener('mouseover', () => {
        if (isRandom) {
            cell.style.filter = 'none';
            cell.style['background-color'] = getRandomColor();
            cell.style.transition = '.5s';
        } else return;
    }))
}

//make cell background-color 10% darker after each pass
function makeShade() {
    isShade = true;
    isRandom = false;
    randomMode.style.backgroundColor = 'rgb(56, 56, 56)'
    shadeMode.style.backgroundColor = 'purple';
    const darken = currentColor => currentColor.replace(/\d+/g, num => num - (Math.floor(num * .1)))
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('mouseover', () => {
        if (isShade) {
            if (cell.style.backgroundColor) {
            cell.style.backgroundColor = darken(cell.style.backgroundColor);
            } else {
                cell.style.backgroundColor = darken("rgb(116, 116, 116)");
            }
        } else return;
    }))
}
//set default background-color on hover
function defaultHover() {
    isShade = false;
    isRandom = false;
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('mouseover', () => {
        if (!isShade && !isRandom) {
        cell.style['background-color'] = 'black';
        cell.style.transition = '.5s'
        }
    }))
    
}
//generate grid of any size passed as argument <= 100. defaults to 16
function getGrid(size = 16) {
    gridArr = [];
    size = size > 100 ? 100 : size;
    const cellHeight = ('height: ' + ((960 - size) / size) + 'px;').toString();
    for (let i = 0; i < size; i++) {   
        const rowContainer = document.createElement('div');
        rowContainer.id = 'r' + i;
        gridArr.push([])
        rowContainer.setAttribute('class', 'row-container');
        rowContainer.style.height = cellHeight;
        gridContainer.appendChild(rowContainer);
        for (let n = 0; n < size; n++) {
            const cell = document.createElement('div');
            cell.setAttribute('class', 'cell');
            cell.id = 'r' + i + 'c' + n;
            gridArr[i].push(cell.id);
            rowContainer.appendChild(cell);
        }
    }
    //initialize hover color to black unless Random/Shade Mode is active
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.setAttribute('style', cellHeight));
    //set default color to black
    defaultHover();
    } 
function getRandomColor() {
    const random = () => Math.floor(Math.random() * 256);
    return ('rgb(' + random() + ', ' + random() + ', ' + random() + ')').toString();
}


getGrid();
newGrid.addEventListener('click', () => {
    shadeMode.style.backgroundColor = 'rgb(56, 56, 56)';
    randomMode.style.backgroundColor = 'rgb(56, 56, 56)';
    const rows = document.querySelectorAll('.row-container');
    rows.forEach(row => row.remove());
    getGrid(prompt('Enter new grid size: \n(Maximum size = 100)'));
})
randomMode.addEventListener('click', makeRandom);
shadeMode.addEventListener('click', makeShade);