let fs = require('fs');
const ln = '\n'; //\r\n en Windows
const day = 5;


const isOK = (arr,rules) => {
    if(arr.length > 1){
        return rules.filter(el => arr[0]==el[0] && arr[1]==el[1]).length == 0 ? false : isOK(arr.slice(1),rules);
    }
    else{
        return true;
    }
}

const sortArr = (arr,rules) => {
    for (let i = 0; i < arr.length-1; i++) {
        if(rules.filter(el => arr[i]==el[0] && arr[i+1]==el[1] ).length == 0){
            let p = arr[i+1];
            arr[i+1] = arr[i];
            arr[i] = p;
        }
    }
    return arr;
}

const obtenerDatos = (cads) => {
    let rules = [];
    let updates = [];

    let mode = 'rules';

    for (let index = 0; index < cads.length; index++) {
        if(cads[index]==''){
            mode = 'updates';
        }
        else{
            if(mode=='rules'){
                rules.push(cads[index].split('|'));
            }
            if(mode=='updates'){
                updates.push(cads[index].split(','));
            }
        }
    }
    return {rules,updates}
};

function part1() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const cadenas = data1.split(ln);

    const {rules,updates} = obtenerDatos(cadenas);

    // console.log(rules,updates);


    let sum = 0;
    for (let i = 0; i < updates.length; i++) {
        let middle = Math.round(updates[i].length / 2);
        let value = Number(updates[i][middle-1]);
        // console.log(updates[i],middle-1,value);
        // console.log(updates[i][middle-1]);
        sum += isOK(updates[i],rules) ? value : 0;
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

    part2();
};

main();