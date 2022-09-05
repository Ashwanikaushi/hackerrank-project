const fs= require("fs");
console.log("before");
fs.readFile("f1.txt",cb);

function cb(err, data){
    if(err){
        console.log("err", err);
    }else{
        console.log("content ", data);// yha agr m , ki jagah + kru to output words me aayegi pr , me output buffer me aayegi.

    }

}

// console.log("after");
// ******************setTimeout example*********************
//async await
// function myfn(){
//     console.log("I am myfn");
// }
// console.log("before");
// setTimeout(myfn, 5000);// is function se hmara myfn function 5000 milisecond ke badd execute hoga ya 5s ke bad
// console.log("after");
//************************************************ */
// promise example
// console.log("before");
// // asynchronous function -> returns a promise
// let promise = fs.promises.readFile("f1.txt");
// console.log("Promise before", promise);
// console.log("After");

// function myfn(){
//     console.log("line number 29", promise);// agr yha +var(promise) likhte to output words me aati mgr yha hmne var, likha h to output buffer me aayegi .

// }
// setTimeout(myfn, 2000);
// what is async function?
// await is only valid in async function
async function myfn(){
    console.log("before");
    let promise = fs.promises.readFile("f1.txt");
    console.log("Promise before", promise);
    console.log("After");
    // it stops the myfn function till promise is fullfilled 
    // and return value of that promise
    let value = await promise;
    console.log(value + "");
}
myfn();