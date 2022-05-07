const body = document.querySelector('body');
const gridContainer = document.createElement('div');
gridContainer.setAttribute('class', 'grid-container');

const newGrid = document.createElement('button');
newGrid.textContent = 'New Grid';
body.appendChild(newGrid);
body.appendChild(gridContainer);

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
    
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.setAttribute('style', cellHeight));
    cells.forEach(cell => cell.addEventListener('mouseover', () => {
        cell.style['background-color'] = 'aqua';
        cell.style.transition = '.5s'
    }))
}
    //cells.forEach(cell => cell.addEventListener('mouseout', () => cell.setAttribute('style', 'background-color: white; transition: .5s;')))


getGrid();
newGrid.addEventListener('click', () => {
    const rows = document.querySelectorAll('.row-container');
    rows.forEach(row => row.remove());
    getGrid(prompt('Enter new grid size: \n(Maximum size = 100)'));
})