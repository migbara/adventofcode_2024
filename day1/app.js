let fs = require('fs');
const ln = '\n'; //\r\n en Windows
const day = 1;

const obtenerListas = (cads) => {
    let izq = [];
    let der = [];

    for (let index = 0; index < cads.length; index++) {

        const parts = cads[index].split('   ');
        // console.log(parts);
        
        izq.push(parts[0]);
        der.push(parts[1]);
        
    }
    izq.sort();
    der.sort();
    // console.log(izq);
    // console.log(der);
    return {izq,der}
};

function part1() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const cadenas = data1.split(ln);

    const {izq,der} = obtenerListas(cadenas);
    
    let sum = 0;
    for (let i = 0; i < izq.length; i++) {
        const el_izq = izq[i];
        const el_der = der[i];

        const dif = Math.abs(el_izq - el_der);
        // console.log(`${el_izq} - ${el_der} : ${dif}`);
        
        sum += dif;
    }

    console.log(`The solution for Day ${day} - Part 1 is: ${sum}`);
};

function part2() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const cadenas = data1.split(ln);

    const {izq,der} = obtenerListas(cadenas);
    
    let sum = 0;
    for (let i = 0; i < izq.length; i++) {
        const el_izq = izq[i];
        
        const found = der.filter((element) => element == el_izq);
        const value = found.length * el_izq;
        
        // console.log(`${el_izq} - ${found.length} : ${value}`);
        sum += value;
    }
    console.log(`The solution for Day ${day} - Part 2 is: ${sum}`);
};

function main(){

    console.log(`DAY ${day}`);

    part1();

    part2();
};

main();