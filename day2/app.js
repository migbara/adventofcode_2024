let fs = require('fs');
const ln = '\n'; //\r\n en Windows
const day = 1;

const checkReport = (cad) => {
    const parts = cad.split(' ');
    let ant = '';
    let type = '';
    let valid = true;
    let i = 0;
    while (valid && i < parts.length) {
        let n = parts[i];
        if(ant!=''){
            let abs = Math.abs(n-ant);
            let dif = n-ant;
            if(abs == 0 || abs > 3)
                valid = false;
            if(valid && (dif > 0 && type == 'dec' || dif < 0 && type == 'inc'))
                valid = false;
            if(valid && i==1)
                type = dif > 0 ? 'inc' : 'dec';
        }
        ant = n;
        i++;
    }
    // console.log(`${parts} - ${valid} - ${type}`);
    return {valid,type};
};

const checkReport2 = (cad) => {
    const parts = cad.split(' ');
    let cont = parts.length;
    let found = false;
    let type = '';
    let i = 0;
    while (!found && i < cont) {
        let cad = parts.filter( (el,index) => index != i).join(' ');
        // console.log(cad);
        let result = checkReport(cad);
        found = result.valid;
        type = result.type;
        i++;
    }
    // console.log(`${parts} - ${found} - ${type}`);
    return {valid: found,type};
};

function part1() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const cadenas = data1.split(ln);
    
    let sum = 0;
    for (let i = 0; i < cadenas.length; i++) {
        sum += checkReport(cadenas[i]).valid ? 1 : 0;
    }

    console.log(`The solution for Day ${day} - Part 1 is: ${sum}`);
};

function part2() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const cadenas = data1.split(ln);
    
    let sum = 0;
    for (let i = 0; i < cadenas.length; i++) {
        let ok = checkReport(cadenas[i]).valid;
        sum += ok ? 1 : checkReport2(cadenas[i]).valid ? 1 : 0;
    }

    console.log(`The solution for Day ${day} - Part 2 is: ${sum}`);
};

function main(){

    console.log(`DAY ${1}`);

    part1();

    part2();
};

main();