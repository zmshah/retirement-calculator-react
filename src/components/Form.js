import React, { useState, useEffect } from 'react';
import Button from "./Button";
import PropTypes from 'prop-types'

const Form = ({onCalculate}) => {
    
    //Initial values from local storage
    const initialName = String(localStorage.getItem("name") || "");
    const initialAge = Number(localStorage.getItem("age") || 20);
    const initialRetAge = Number(localStorage.getItem("retAge") || 67);
    const initialSalary = Number(localStorage.getItem("salary") || 20000);
    const initialIncrease = Number(localStorage.getItem("increase") || 5);
    const initialCont = Number(localStorage.getItem("cont") || 4);
    const initialSavings = Number(localStorage.getItem("savings") || 5000);
    const initialInterest = Number(localStorage.getItem("interest") || 4);

    //Assigning state
    const [name, setName] = useState(initialName)
    const [age, setAge] = useState(initialAge)
    const [retAge, setRetAge] = useState(initialRetAge)
    const [salary, setSalary] = useState(initialSalary)
    const [increase, setIncrease] = useState(initialIncrease)
    const [cont, setCont] = useState(initialCont)
    const [savings, setSavings] = useState(initialSavings)
    const [interest, setInterest] = useState(initialInterest)

    //Updating local storage
    useEffect(() => {
        localStorage.setItem("name", name);
        localStorage.setItem("age", age);
        localStorage.setItem("retAge", retAge);
        localStorage.setItem("salary", salary);
        localStorage.setItem("increase", increase);
        localStorage.setItem("cont", cont);
        localStorage.setItem("savings", savings);
        localStorage.setItem("interest", interest);
    });

    //Passing the input values to the paren component
    const onSubmit = (e) => {
        e.preventDefault()

        if(!name){
            alert('Please type your name')
        }

        onCalculate({name, age, retAge, salary, increase, cont, savings, interest})
    }

    return(
        <form className='calculator-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>
                    Name:
                    <input type = "text" placeholder="Enter Name" 
                    value={name} onChange = {(e) => setName(e.target.value)}/>
                </label>
            </div>
            <div className='form-control'>
                <label>
                    Current Age:
                    <input type = "number" placeholder="Enter Age" 
                    value={age} onChange = {(e) => setAge(parseInt(e.target.value))}/>
                </label>
            </div>
            <div className='form-control'>
                <label>
                    Desired Retirement Age:
                    <input type = "number" placeholder="Enter Age" 
                    value={retAge} onChange = {(e) => setRetAge(parseInt(e.target.value))}/>
                </label>
            </div>
            <div className='form-control'>
                <label>
                    Current salary:
                    <input type = "number" placeholder="Enter current salary" 
                    value={salary} onChange = {(e) => setSalary(parseInt(e.target.value))}/>
                </label>
            </div>
            <div className='form-control'>
                <label>
                    Salary increase rate(%):
                    <input type = "number" placeholder="Enter estimated salary increase" 
                    value={increase} onChange = {(e) => setIncrease(parseInt(e.target.value))}/>
                </label>
            </div>
            <div className='form-control'>
                <label>
                    Contribution to Savings from salary(%):
                    <input type = "number" placeholder="Enter contributions to savings(%)" 
                    value={cont} onChange = {(e) => setCont(parseInt(e.target.value))}/>
                </label>
            </div>
            <div className='form-control'>
                <label>
                    Current Savings:
                    <input type = "number" placeholder="Enter current savings" 
                    value={savings} onChange = {(e) => setSavings(parseInt(e.target.value))}/>
                </label>
            </div>
            <div className='form-control'>
                <label>
                    Interest rate on savings
                    <input type = "number" placeholder="Enter interest rate" 
                    value={interest} onChange = {(e) => setInterest(parseInt(e.target.value))}/>
                </label>
            </div>

            <input type='submit' value='Calculate' className='btn btn-calculate'/>
            {/*<input type='reset' value='Clear' className='btn btn-calculate'/>*/}
            {/*<Button color='black' text='Calculate' onCLick={onClick}/>*/}
        </form>
    )
}

export default Form