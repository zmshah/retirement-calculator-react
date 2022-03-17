import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import { Table } from 'react-bootstrap';

//Results component
const Results = ({results}) => {

    //Assign props to local variables for calculation
    var age = results.age;
    var retAge = results.retAge;
    //var yearsToRet = retAge - age;
    var salary = results.salary;
    var increase = results.increase;
    var cont = results.cont;
    var contAmount = salary * (cont/100);
    var savings = results.savings;
    var interest = results.interest;
    var retSavings = savings;
    var retExpenses = 0;
    var retSavingsFinal;

    //To format the results as dollar value
    const formatter = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})

    //Array to store objects to be mapped onto table
    const savingsList = [];

    //loop starting at age and ending at 100
    for(var i = age; i <= 100; ++i)
    {
        //Object with table values
        let savingsObj = {age: i, salary: salary, contAmount: contAmount, retSavings: retSavings, retExpenses: retExpenses}
        //savingsList.push(savingsObj);

        //Calculations when age is less than retirement age
        if(i <= retAge)
        {
            //Add object to array
            savingsList.push(savingsObj);

            //Calculate new salary using estimated increase
            salary += salary * (increase/100);

            //Calculate contribution amounts from salary
            contAmount = salary * (cont/100);

            //Calculate retirement savings. this is the current savings + contribution amount + interest earned on savings
            //retSavings +=  salary*(cont/100) + retSavings*(interest/100);
            retSavings +=  contAmount + retSavings*(interest/100);
        }

        //When retirement age is reached, calculate the expenses
        if( i === retAge)
        {
            retSavingsFinal = retSavings;
        
        /*
            Retirement expenses is 90% of salary
            retExpenses = salary * (90/100)
        */

            //Withdraw 4% from retirement expenses
            retExpenses = retSavings*(4/100)
            
            //Contribution amount will become 0
            contAmount = 0;
        }

        //When retired, start withdrawing from savings
        if(i > retAge)
        {
            //Assuming that salary will become 0
            savingsObj.salary = 0;
            savingsList.push(savingsObj);
            //retExpenses = salary * (90/100);  

            //When savings run out, this condition will change savings to 0 rather than a negative amount
            if(retSavings - retExpenses >= 0)
            {
                retSavings -= retExpenses; 
            }
            else
            {
                retSavings = 0;
            }

            //add 3% to expenses for each consecutive year
            retExpenses += retExpenses*(3/100);
        }
    }

    //Testing the array
    console.log(savingsList);

    return(
        <><div className='results'>
            <h3> At retirement age of {retAge}, {results.name} will have a total savings of {formatter.format(retSavingsFinal)}</h3>
        </div>
        <div className='results-table'>
            <Table bordered hover variant="dark">
                <thead><tr>
                    <th>Age</th>
                    <th>Salary</th>
                    <th>Contribution Amount</th>
                    <th>Retirement Savings</th>
                    <th>Retirement Expenses</th>
                </tr>
                </thead>
                <tbody>
                   {savingsList.map(savings =>  
                    <tr  style={{ color: eval(savings.retSaving) === 0 ? 'red': 'black' }}>
                    <td>{ savings.age }</td>
                    <td>{ formatter.format(savings.salary) }</td>
                    <td>{ formatter.format(savings.contAmount) }</td>
                    <td>{ formatter.format(savings.retSavings) }</td>
                    <td>{ formatter.format(savings.retExpenses)}</td>
                   </tr>                  
                   )} 
                </tbody>
            </Table>
        </div></>
    )
}

export default Results