let fs = require('fs');
const { start } = require('repl');
const ln = '\n'; //\r\n en Windows
const day = 6;

let path = [];

const obtenerMapa = (cads) => {
    let map = [];
    let startPoint = {
        x: null,
        y: null
    };
    for (let i = 0; i < cads.length; i++) {
        map.push([]);
        for (let j = 0; j < cads[0].length; j++) {
            if(cads[i][j]=='^'){
                startPoint.x = j;
                startPoint.y = i;
            }
            map[i].push(cads[i][j]);
        }
    }
    return {map,startPoint}
};

const drawMap = (map) => {
    for (let i = 0; i < map.length; i++) {
        console.log(map[i].join('') + "\n");
    }
}

function advance (map,point,dir) {
    let c = point;
    // console.log(`Estamos en ${JSON.stringify(c)} yendo en dirección ${dir}`);
    // console.log(`Marcamos ${c.x} ${c.y}`);
    map[c.y][c.x] = 'X';
    // drawMap(map);
    if(dir=='up'){
        if(map[c.y-1] == undefined || map[c.y-1][c.x]=='#' ){
            if(map[c.y][c.x+1] != undefined && map[c.y][c.x+1] != '#')
                advance(map,c,'right');
        }
        else{
            c.y--;
            advance(map,c,'up')
        }
    }
    else if(dir=='down'){
        if(map[c.y+1] == undefined || map[c.y+1][c.x]=='#' ){
            if(map[c.y][c.x-1] != undefined && map[c.y][c.x-1] != '#')
                advance(map,c,'left');
        }
        else{
            c.y++;
            advance(map,c,'down');
        }
    }
    else if(dir=='left'){
        if(map[c.y][c.x-1] == undefined || map[c.y][c.x-1]=='#'){
            if(map[c.y-1][c.x] != undefined && map[c.y-1][c.x] != '#')
                advance(map,c,'up');
        }
        else{
            c.x--;
            advance(map,c,'left');
        }
    }
    else if(dir=='right'){
        if(map[c.y][c.x+1] == undefined || map[c.y][c.x+1]=='#'){
            if(map[c.y+1][c.x] != undefined && map[c.y+1][c.x] != '#')
                advance(map,c,'down');
        }
        else{
            c.x++;
            advance(map,c,'right');
        }
    }
} 

function part1() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const cadenas = data1.split(ln);

    const {map,startPoint} = obtenerMapa(cadenas);

    
    advance(map,startPoint,'up');
    // drawMap(map);

    let sum = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            sum += map[i][j] == 'X' ? 1 : 0;
        }
    }

    console.log(`The solution for Day ${day} - Part 1 is: ${sum}`);
};

function part2() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const cadenas = data1.split(ln);

    const {rules,updates} = obtenerDatos(cadenas);

    // console.log(rules,updates);


    let sum = 0;
    for (let i = 0; i < updates.length; i++) {
        if(!isOK(updates[i],rules)){
            while(!isOK(updates[i],rules)){
                sortArr(updates[i],rules);
            }
            // console.log(updates[i]);
            let middle = Math.round(updates[i].length / 2);
            let value = Number(updates[i][middle-1]);
            // console.log(updates[i],middle-1,value);
            // console.log(updates[i][middle-1]);
            sum += value;
        }
    }
    console.log(`The solution for Day ${day} - Part 2 is: ${sum}`);
};

function main(){

    console.log(`DAY ${day}`);

    part1();

    // part2();
};

main();