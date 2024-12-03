let fs = require('fs');
const ln = '\n'; //\r\n en Windows
const day = 3;

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

    const regex = /mul\((-?\d{1,3}),(-?\d{1,3})\)/g;
    const found = data1.match(regex);

    // console.log(found);

    let sum = 0;

    for (let i = 0; i < found.length; i++) {
        const parts = found[i].substring(4,found[i].length-1).split(",");

        // console.log(parts);
        // console.log(`${parts[0]} - ${parts[1]} - ${parts[0] * parts[1]}`);

        sum += parts[0] * parts[1];
    }

    console.log(`The solution for Day ${day} - Part 1 is: ${sum}`);
};

function part2() {
    // const data1 = fs.readFileSync('./example2.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const regex = /mul\((-?\d{1,3}),(-?\d{1,3})\)|do\(\)|don't\(\)/g;

    const found = data1.match(regex);

    // console.log(found);

    let sum = 0;
    let apply = true;

    for (let i = 0; i < found.length; i++) {
        const id = found[i].substring(0,3);
        if(id == 'mul'){
            const parts = found[i].substring(4,found[i].length-1).split(",");
            if(apply){
                // console.log(parts);
                // console.log(`${parts[0]} - ${parts[1]} - ${parts[0] * parts[1]}`);
                sum += parts[0] * parts[1];
            }
        }
        else if(id == 'don'){
            apply = false;
        }
        else{
            apply = true;
        }
    }

    console.log(`The solution for Day ${day} - Part 2 is: ${sum}`);
};

function main(){

    console.log(`DAY ${day}`);

    part1();

    part2();
};

main();