import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const Graph = ({graph}) => {

    var age = graph.age;
    var retAge = graph.retAge;
    //var yearsToRet = retAge - age;
    var salary = graph.salary;
    var increase = graph.increase;
    var cont = graph.cont;
    var contAmount = graph * (cont/100);
    var savings = graph.savings;
    var interest = graph.interest;
    var retSavings = savings;
    var retExpenses = 0;
    var retSavingsFinal;

    //To format the results as dollar value
    const formatter = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})

    //Arrays to store savings and age
    const ySavings = [];
    const xAge = [];

    //loop starting at age and ending at 100
    for(var i = age; i <= 100; ++i)
    {
        //Add age to array for x axis
        xAge.push(i);

        //Calculations when age is less than retirement age
        if(i <= retAge)
        {
            //Add savings to array for y axis
            ySavings.push(retSavings);

            //Calculate new salary using estimated increase
            salary += salary * (increase/100);

            //Calculate contribution amounts from salary
            contAmount = salary * (cont/100);

            //Calculate retirement savings
            //retSavings +=  salary*(cont/100) + retSavings*(interest/100);
            retSavings +=  contAmount + retSavings*(interest/100);
        }

        //When retirement age is reached, calculate the expenses
        if(i === retAge)
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
            salary = 0;

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
            ySavings.push(retSavings);
        }
    }

    //Testing arrays
    console.log(ySavings);
    console.log(xAge);

    //Assigning the graph values
    //Using Chart.js Library for this
    const retGraph = {
        labels: xAge,
      
        datasets: [
          {
            label: 'Retirement Savings',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: ySavings
          }
        ]
      }

    return (
        <div className="graph">
            <Line
                data={retGraph}
                options={{
                    title:{
                        display:true,
                        text:'Retirement Savings per year',
                        
                    },

                    legend:{
                        display:true,
                        position:'right'
                    }
                }}
            /> 
        </div>
    )
}

export default Graph