let fs = require('fs');
const ln = '\n'; //\r\n en Windows

const numberFromFirstLastnumericChars = (cad) => {
    let first = -1;
    let last = -1;
    for (let index = 0; index < cad.length; index++) {
        if(!isNaN(cad[index])){
            last = Number(cad[index]);
            if(first==-1)
                first = Number(cad[index]);
        }
    }
    return first == -1 && last == -1 ? 0 : first * 10 + last;
};

function part1() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const cadenas = data1.split(ln);

    
    let izq = [];
    let der = [];
    
    for (let index = 0; index < cadenas.length; index++) {

        const parts = cadenas[index].split('   ');
        // console.log(parts);
        
        izq.push(parts[0]);
        der.push(parts[1]);
        
    }
    // console.log(izq);
    // console.log(der);
    
    izq.sort();
    der.sort();
    
    // console.log(izq);
    // console.log(der);
    
    let sum = 0;
    for (let i = 0; i < izq.length; i++) {
        const el_izq = izq[i];
        const el_der = der[i];

        const dif = Math.abs(el_izq - el_der);
        // console.log(`${el_izq} - ${el_der} : ${dif}`);
        
        sum += dif;
    }

    console.log(`The solution for Day 1 - Part 1 is: ${sum}`);
};

function part2() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const cadenas = data1.split(ln);

    let izq = [];
    let der = [];
    
    for (let index = 0; index < cadenas.length; index++) {

        const parts = cadenas[index].split('   ');
        // console.log(parts);
        
        izq.push(parts[0]);
        der.push(parts[1]);
        
    }
    // console.log(izq);
    // console.log(der);
    
    izq.sort();
    der.sort();
    
    // console.log(izq);
    // console.log(der);
    
    let sum = 0;
    for (let i = 0; i < izq.length; i++) {
        const el_izq = izq[i];
        
        const found = der.filter((element) => element == el_izq);
        const value = found.length * el_izq;
        
        console.log(`${el_izq} - ${found.length} : ${value}`);
        sum += value;
    }
    console.log(`The solution for Day 1 - Part 2 is: ${sum}`);
};

function main(){

    console.log("DAY 1");

    // part1();

    part2();
};

main();