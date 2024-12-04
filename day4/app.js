let fs = require('fs');
const ln = '\n'; //\r\n en Windows
const day = 4;

function foundWord(map,word,i,j){

    let result = {
        cont: 0,
        data: []
    };
    
    //Find down if i<=map.length-word.length
    if(i <= map.length - word.length){
        let k = 0;
        let y = i;
        let x = j;
        let p = '';
        while(p==word.substring(0,p.length) && k < word.length){
            // console.log(`DOWN  ${p} - ${y} - ${x} - ${map[y][x]}`);
            p += map[y][x];
            k++;
            y++;
        }
        result.cont += p==word ? 1 : 0;
        if(p==word)
            result.data.push({x: j, y: i, dir: 'DOWN'});
    }

    //Find up if i>=word.length-1
    if(i >= word.length-1){
        let k = 0;
        let y = i;
        let x = j;
        let p = '';
        while(p==word.substring(0,p.length) && k < word.length){
            // console.log(`UP    ${p} - ${y} - ${x} - ${map[y][x]}`);
            p += map[y][x];
            k++;
            y--;
        }
        result.cont += p==word ? 1 : 0;
        if(p==word)
            result.data.push({x: j, y: i, dir: 'UP'});
    }

    //Find right if j<=map.length-word.length
    if(j <= map[0].length - word.length){
        let k = 0;
        let y = i;
        let x = j;
        let p = '';
        while(p==word.substring(0,p.length) && k < word.length){
            // console.log(`RIGHT ${p} - ${y} - ${x} - ${map[y][x]}`);
            p += map[y][x];
            k++;
            x++;
        }
        result.cont += p==word ? 1 : 0;
        if(p==word)
            result.data.push({x: j, y: i, dir: 'RIGHT'});
    }

    //Find left if j>=word.length-1
    if(j >= word.length-1){
        let k = 0;
        let y = i;
        let x = j;
        let p = '';
        while(p==word.substring(0,p.length) && k < word.length){
            // console.log(`LEFT  ${p} - ${y} - ${x} - ${map[y][x]}`);
            p += map[y][x];
            k++;
            x--;
        }
        result.cont += p==word ? 1 : 0;
        if(p==word)
            result.data.push({x: j, y: i, dir: 'LEFT'});
    }

    // ---------------------------------------

    //Find down & right if i<=map.length-word.length & j<=map.length-word.length
    if(i <= map.length - word.length && j <= map[0].length-word.length){
        let k = 0;
        let y = i;
        let x = j;
        let p = '';
        while(p==word.substring(0,p.length) && k < word.length){
            // console.log(`D & R ${p} - ${y} - ${x} - ${map[y][x]}`);
            p += map[y][x];
            k++;
            x++;
            y++;
        }
        result.cont += p==word ? 1 : 0;
        if(p==word)
            result.data.push({x: j, y: i, dir: 'D&R'});
    }

    //Find up & right if i>=word.length-1 & j<=map.length-word.length
    if(i >= word.length-1 && j <= map[0].length-word.length){
        let k = 0;
        let y = i;
        let x = j;
        let p = '';
        while(p==word.substring(0,p.length) && k < word.length){
            // console.log(`U & R ${p} - ${y} - ${x} - ${map[y][x]}`);
            p += map[y][x];
            k++;
            x++;
            y--;
        }
        result.cont += p==word ? 1 : 0;
        if(p==word)
            result.data.push({x: j, y: i, dir: 'U&R'});
    }

    //Find down & left if i<=map.length-word.length & j >= word.length-1
    if(i <= map.length - word.length && j >= word.length-1){
        let k = 0;
        let y = i;
        let x = j;
        let p = '';
        while(p==word.substring(0,p.length) && k < word.length){
            // console.log(`D & L ${p} - ${y} - ${x} - ${map[y][x]}`);
            p += map[y][x];
            k++;
            x--;
            y++;
        }
        result.cont += p==word ? 1 : 0;
        if(p==word)
            result.data.push({x: j, y: i, dir: 'D&L'});
    }

    //Find up & left if i>=word.length-1 & j >= word.length-1
    if(i >= word.length-1 && j >= word.length-1){
        let k = 0;
        let y = i;
        let x = j;
        let p = '';
        while(p==word.substring(0,p.length) && k < word.length){
            // console.log(`U & R ${p} - ${y} - ${x} - ${map[y][x]}`);
            p += map[y][x];
            k++;
            x--
            y--;
        }
        result.cont += p==word ? 1 : 0;
        if(p==word)
            result.data.push({x: j, y: i, dir: 'U&L'});
    }

    return result;
}

function foundWord_part2(map,word,i,j){
    let result = {
        cont: 0,
        data: []
    };

    if(i != 0 && i != map.length-1 && j != 0 && j != map[0].length-1){
        const cond_A = map[i][j]=='A';
        const cond_TL_DR = (map[i-1][j-1]=='M' && map[i+1][j+1]=='S') || (map[i-1][j-1]=='S' && map[i+1][j+1]=='M');
        const cond_TR_DL = (map[i+1][j-1]=='M' && map[i-1][j+1]=='S') || (map[i+1][j-1]=='S' && map[i-1][j+1]=='M');
        
        if(cond_A && cond_TL_DR && cond_TR_DL){

        }
        result.cont = cond_A && cond_TL_DR && cond_TR_DL ? 1 : 0;
        if(result.cont)
            result.data.push({x: j, y: i});
    }
    return result;
}

function part1() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    // const data1 = fs.readFileSync('./example2.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const map = data1.split(ln);

    // console.log(cadenas);

    const word = 'XMAS';

    let sum = 0;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            const result = foundWord(map,word,i,j);
            sum += result.cont;
            // if(result.cont)
            //     console.log(result.data);
        }
    }

    console.log(`The solution for Day ${day} - Part 1 is: ${sum}`);
};

function part2() {
    // const data1 = fs.readFileSync('./example3.txt','utf-8');
    // const data1 = fs.readFileSync('./example4.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const map = data1.split(ln);

    // console.log(cadenas);

    const word = 'MAS';

    let sum = 0;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            const result = foundWord_part2(map,word,i,j);
            sum += result.cont;
            // if(result.cont)
            //     console.log(result.data);
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