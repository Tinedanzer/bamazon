const mysql = require("mysql");
const inquirer = require('inquirer');
// stores database loginfo in an object, can be placed in .env if wanted. No need to do it this time b/c of localserver.
function sqlObj(arg) {
    return{
    host: "localhost",
    port: 3306,
    user: "root",
    password: "stupid",
    database: arg
    }
};
// establishes my variable to the connection of the 'bamazon' databaze in MySQL
const connection = mysql.createConnection(sqlObj("bamazon"));
// establishes connection to MySQL database bamazon
connection.connect(function(error_error_womp_womp) {
    if (error_error_womp_womp) throw error_error_womp_womp;
    console.log("connected as id " + connection.threadId +'\n');
    twistedMetal();
});
// to show the list of items  for the user when program is run
const twistedMetal = () =>{
    let qball = 'SELECT ?? FROM ??';
    let values= ['*', 'products'];
    // qball = mysql.format(qball, values);
connection.query(qball, values, (e,r)=>{
    if (e) throw e;
// I ran a for loop to better see the categories in a table-like dilly dally.
    for (let i = 0; i < r.length; i++) {
    console.log(`Item id: ${r[i].item_id}   Quantity: ${r[i].stock_quantity}  Price:${r[i].price}             
    Product: ${r[i].product_name}
    ---------------------------------------------------`)
    }
// e?console.log(e):console.log(r);**
// replacement for if(e) throw e; else{console.log(r)}
});
};
// creating empty objects for the user responses from the two prompts.
let output1= [];
let output2= [];
// store matching output requests, inventory and price, from the database
// storing inventory to check to see if we  have enough; and price to output the customer's total.
let storage1=[];
let storagePrice=[];
// needed to convert inquirer script to a function,
// in order  to setTimeout, one of the ways to prevent the prompt from loading
// before the server data table is retrieved and displayed.
setTimeout(aroo2, 600);
// this uses node package inquirer to prompt questions.
// I use validate to make sure these responses are numbers, as well as within a certain range.
function aroo2() {inquirer.prompt([
    {name: "unitId",
    message: "What is the ID of the product you would like to buy?",
    validate: function(value) {
        if (isNaN(value) === false && value<11 === true && value>0=== true) 
        {return true;}
        console.log('\n Enter a better number dummy!');return false;}
    },
    {name: "unitP",
    message:"How many units would you like to purchase?",
    validate: function(value) {
        if (isNaN(value) === false) 
          {return true;}
          console.log('\n Enter a number dummy!');return false;}
    },
    // we then use the user's answers to push data to the above objects, in order to access the database and complete the transaction.
]).then(answers=>{
output1.push(answers.unitId);
output2.push(answers.unitP);
checkId(answers.unitId);

function checkId(arg){
// Important: only one question mark when pulling from the JS,
// like the 4th value in the values object.
    let qball = 'SELECT ??,?? FROM products WHERE ?? = ?';
    let values= ['stock_quantity','price','item_id',arg];
connection.query(qball, values, (e,r)=>{
    if(e){throw e};
    // this throws stock and price from the database, into objects defined above.
    storage1.push(r[0].stock_quantity);
    storagePrice.push(r[0].price);
    // console.log(storage1);
    // console.log(storagePrice);
    let userPrice = storagePrice*output2;
    // console.log(userPrice);
// determines if the user request is higher than inventory
    if(output2>storage1 === true || storage1===0){
    console.log('Check our stock, and order again please!')
    //ending connection on user error.
    connection.end();
    }
    else{
    console.log('Congratulations on your marked-up purchase!');
    console.log(`Your total only comes to $${userPrice} !`);
    adjustInv();
    };
    });  
};
// function to Update inventory in the MySQL database, this also ends our connection.
function adjustInv() { 
    let aroo3 = answers.unitId;
    let aroo4 = answers.unitP;
    let qball = 'UPDATE products SET ?? = (stock_quantity-?) WHERE item_id = ?';
    let values= ['stock_quantity',aroo4,aroo3];
connection.query(qball, values, (e)=>{
    if(e){throw e};
    connection.end();
    })}
});
};