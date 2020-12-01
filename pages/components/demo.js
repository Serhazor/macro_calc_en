import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import DenseTable from "./DenseTable";
import Button from '@material-ui/core/Button';
import styles from '../../styles/Home.module.css';
import { sendData } from "next/dist/next-server/server/api-utils";
//import mysql from 'mysql';



const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));


function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

export default function FormPropsTextFields() {
  const classes = useStyles();
  const [ageValue, setAgeValue] = useState("");
  const [weigthValue, setWeigthValue] = useState("");
  const [heightValue, setHeightValue] = useState("");
  const [intencityValue, setIntencityValue] = useState("");
  const [proteinValue, setProteinValue] = useState("");
  const [fatValue, setFatValue] = useState("");
  const [multiplier, setMultiplier] = useState(1);
  const [maintainingWeigthCalories, setMaintainingWeigthCalories] = useState(0);
  const [fatCal, setFatCal] = useState("");
  const [proCal, setProCal] = useState("");
  const [carbCal, setCarbCal] = useState("");
  const [sexValue, setSexValue] = useState(1);
  const [sexMultiplier, setSexMultiplier] = useState(0);

  const sexes = [
    {
      value: 1,
      label: <em>Tap me</em>
    },
    {
      value: 2,
      label: "Female"
    },    
    {
      value: 3,
      label: "Male"
    }
  ];

  const handleIntensityChange = (e) => {
    if (parseInt(e.target.value, 10) === 1) {
      setMultiplier(1.2);
    }
    if (parseInt(e.target.value, 10) === 2) setMultiplier(1.375);
    setIntencityValue(e.target.value);
    if (parseInt(e.target.value, 10) === 3) setMultiplier(1.55);
    setIntencityValue(e.target.value);
    if (parseInt(e.target.value, 10) === 4) setMultiplier(1.725);
    setIntencityValue(e.target.value);
    if (parseInt(e.target.value, 10) === 5) setMultiplier(1.9);
    setIntencityValue(e.target.value);
  };
  // Для женщин: (10 × вес в килограммах) + (6,25 × рост в сантиметрах) − (5 × возраст в годах) − 161

  const handleSexChange = (e) => {
    if (parseInt(e.target.value, 10) === 2) setSexMultiplier(161);
    setSexValue(e.target.value);
    if (parseInt(e.target.value, 10) === 3) setSexMultiplier(-5);
    setSexValue(e.target.value);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    const result =
      //(((10 * weigthValue) + (6.25 * heightValue) - (5 * ageValue)) - (sexMultiplier)) * ();
      (((10 * weigthValue) + (6.25 * heightValue) - (5 * ageValue)) - (sexMultiplier)) * (multiplier);

    setMaintainingWeigthCalories(parseInt(result));

    const fatCal = weigthValue * fatValue;
    setFatCal(parseInt(fatCal));

    const proCal = weigthValue * proteinValue;
    setProCal(parseInt(proCal));

    const carbCal = (result-((proCal*4)+(fatCal*9)))/4;
    setCarbCal(parseInt(carbCal));
  };

 
  function handleSendData(){

    //const mysql = require('serverless-mysql');
    
    const con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });
  
    {/*const dataToBeSent = {
      sex: sexes.label,
      age: ageValue,
      weight: weigthValue,
      height: heightValue,
      intensity: intencityValue,
      protein: proteinValue,
      fat: fatValue,
    };*/}

    con.connect(function(err) {
      if (err) throw err;
      //console.log("Connected!");
      var sql = "INSERT INTO macros_stats (sex, age, weight, height, intensity, protein, fat) VALUES ?";
      var values = [
        [sexes.label, ageValue, weigthValue, heightValue, intencityValue, proteinValue, fatValue],
      ];
      con.query(sql, [values], function (err, results) {
        if (err) throw err;
        //console.log("Number of records inserted: " + result.affectedRows);
      });
    });
    

  };

  const rows = [
    createData(
      "Daily calorie limit (kcal)",
      (parseInt(maintainingWeigthCalories)),
      (parseInt(maintainingWeigthCalories-(maintainingWeigthCalories*0.1))),
      (parseInt(maintainingWeigthCalories-(maintainingWeigthCalories*0.15))),
    ),
    createData("Daily Protein limit (gramms)", proCal, (parseInt(proCal)), (parseInt(proCal))),
    createData("Daily Fats limit (gramms)", fatCal, (parseInt(fatCal)), (parseInt(fatCal))),
    createData("Daily Carbohydrate limit (gramms)", carbCal,(parseInt((((maintainingWeigthCalories-(maintainingWeigthCalories*0.1))-((fatCal*9)+(proCal*4)))/4))), (parseInt((((maintainingWeigthCalories-(maintainingWeigthCalories*0.15))-((fatCal*9)+(proCal*4)))/4))))
  ];
  return (
    <form
      //{/*className={classes.root}*/}
      className={styles.grid}
      noValidate
      autoComplete="off"
      onSubmit={handleCheck}
    > <br />

      <div style={{margin:20}}>
        <TextField
          id="sex-number"
          select
          label="Your sex"
          type="number"
          value={sexValue}
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleSexChange}
        >
          {sexes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div style={{margin:20}}>
        <TextField
          id="age-number"
          label="Your age (15+)"
          type="number"
          value={ageValue}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => {
            setAgeValue(e.target.value);
          }}
        ></TextField>
        <TextField
          id="weight-number"
          label="Your weight (kg)"
          type="number"
          value={weigthValue}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => {
            setWeigthValue(e.target.value);
          }}
        />
        <TextField
          id="height-number"
          label="Your height (cm)"
          type="number"
          value={heightValue}
          min={1.0}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => {
            setHeightValue(e.target.value);
          }}
        />
      </div>

      <div style={{margin:20}}>
        <TextField
          id="intencity-number"
          label="Your activity level"
          type="number"
          value={intencityValue}
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleIntensityChange}
        />
        <TextField
          id="protein-number"
          label="Protein value (gr per kg of current weight)"
          type="float"
          value={proteinValue}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => {
            setProteinValue(e.target.value);
          }}
        />
        <TextField
          id="fat-number"
          label="Fat value (gr per kg of current weight)"
          type="float"
          value={fatValue}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => {
            setFatValue(e.target.value);
          }}
        />
      </div>
      <div className={classes.root} style={{margin:20}} >
        <Button type="submit" variant="contained" color="secondary" >
          Calculate
        </Button>
      </div>
      <br />
      <div>
          <b>Enter one of the following numbers in to "Activity level" field:</b>
      </div>
      <div >
        <ul style={{fontSize: "small"}}>
          <li><b>1</b> - activity is low/no regular physica excercises</li>
          <li><b>2</b> - fairly active (daily walks, cycling, morning excercises) OR moderate incencity training sessions 3 times a week</li>
          <li><b>3</b> - Intensive training sessions 3-4 times a week (strenght or Cardio)</li>
          <li><b>4</b> - Intensive training sessions 5-6 times a week (strenght or Cardio)</li>
          <li><b>5</b> - Daily intensive training sessions (Strength or cardio, including olympic weightlifting and long distance running)</li>
        </ul>
        </div>
        <div style={{textAlign: "left"}}>
        <h4>Protein and Fat ration should be recommended by your coach/dietician, but you can also use the following recommendations:</h4>
        </div>
        <div>
          <b>How much Protein to use for the calculation (gramms per kilogramm of body weight):</b>
        </div>
        <div>
          <ul style={{fontSize: "small"}}>
            <li>You lifestyle is mainly static; you do some yoga or stretching: <b>1 - 1.1</b> gr/kg</li>
            <li>You're regulary training to build muscular endurance: <b>1.2 - 1.4</b> gr/kg</li>
            <li>You're regulare training to build muscular strength: <b>1.5 - 1.7</b> gr/kg</li>
            <li>You're regulare training to build muscular mass: <b>1.8 - 2.2</b> gr/kg</li>
            <li>You're in calorie deficite and you want to maintain muscle mass: <b>2.3 - 2.4</b> gr/kg</li>
            <li>Don't know what to choose and you traing regulary: <b>1.5</b> gr/kg</li>
          </ul>
        </div>
        <div style={{textAlign: "left"}}>
        <b>How much Fat to use for the calculation (gramms per kilogramm of body weight):</b>
        </div>
          <div>
            <ul style={{fontSize: "small"}}>
              <li>You you fairly overweight: <b>0.9</b> gr/kg</li>
              <li>You have a bit of extra weight but close to normal weight: <b>1 - 1.2</b> gr/kg</li>
              <li>You have a bit of extra weight but close to normal weight and also have craiving for something sweet: <b>1.3 - 1.5</b> gr/kg</li>
              <li>Not sure what to choose: <b>1.2</b> gr/kg</li>
            </ul>
          </div>
        <div style={{textAlign: "left"}}>
          Note: If your coach or dietisian is recommending you to eat less the 0.9gr/kg of Fat, you need to change the specialist ASAP!
        </div>
        <br />
        <br />

        <div style={{textAlign:"center"}}>
          <h3>Results</h3>
        </div>


      <div>
        <DenseTable
          rows={rows}
          maintainingWeigthCalories={maintainingWeigthCalories}
          proCal={proCal}
          fatCal={fatCal}
          carbCal={carbCal}
        />
      </div>
      <br/>
      <div style={{
        textAlign: "center"
        }}>
            <a href="https://www.alexsifitness.com/"><h4>www.alexsifitness.com</h4></a>
    </div>
    </form>
  );
}
