import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import DenseTable from "./DenseTable";
import Button from '@material-ui/core/Button';
import styles from '../../styles/Home.module.css';


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
      label: <em>Нажми на меня</em>
    },
    {
      value: 2,
      label: "Женский"
    },    
    {
      value: 3,
      label: "Мужской"
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
//(((maintainingWeigthCalories-(maintainingWeigthCalories*0.1))-((fatCal*9)+(proCal*4)))/4)
  const rows = [
    createData(
      "Общая дневная норма калорий",
      (parseInt(maintainingWeigthCalories)),
      (parseInt(maintainingWeigthCalories-(maintainingWeigthCalories*0.1))),
      (parseInt(maintainingWeigthCalories-(maintainingWeigthCalories*0.15))),
    ),
    createData("Дневная норма Белков (в граммах)", proCal, (parseInt(proCal)), (parseInt(proCal))),
    createData("Дневная норма Жиров (в граммах)", fatCal, (parseInt(fatCal)), (parseInt(fatCal))),
    createData("Дневная норма Углеводов (в граммах)", carbCal,(parseInt((((maintainingWeigthCalories-(maintainingWeigthCalories*0.1))-((fatCal*9)+(proCal*4)))/4))), (parseInt((((maintainingWeigthCalories-(maintainingWeigthCalories*0.15))-((fatCal*9)+(proCal*4)))/4))))
  ];
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleCheck}
    > <br />
      <div/>

      
      <br />
      <br />
      <div style={{margin:20}}>
        <TextField
          id="sex-number"
          select
          label="Ваш пол"
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
          label="Ваш возраст (15+)"
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
          label="Ваш вес (кг)"
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
          label="Ваш рост (см)"
          type="number"
          value={heightValue}
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
          label="Уровень физической активности"
          type="number"
          value={intencityValue}
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleIntensityChange}
        />
        <TextField
          id="protein-number"
          label="Количество Белка (г на кг веса тела)"
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
          label="Количество Жиров (г на кг веса тела)"
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
          Посчитать
        </Button>
      </div>

      <br />

      <div style={{textAlign: "center"}}>
          В разделе физической активности выставьте соответствующую цифру:
      </div>
    <br/>
      <div >
        <ul>
          <li>
            1 - низкая активность / нет регулярных физических нагрузок
          </li>
          
          <li>
            2 - довольно активны (ежедневно много приходится ходить, ездить на велосипеде, регулярная зарядка по утрам) ИЛИ тренировки средней интенсивности до 3 раз в неделю (не изнурительные силовые, HIIT, пилатес, йога, хайкинг) 
          </li>
          
          <li>
            3 - интенсивные тренировки 3-4 раза в неделю (силовые или кардио)
          </li>
          
          <li>
            4 - интенсивные тренировки 5-6 раз в неделю (силовые или кардио)
          </li>
          
          <li>  
            5 - ежедневные интенсивные тренировки (силовые или кардио, включая тяжелую атлетику и бег на длинные дистанции)
          </li>
        </ul>
        </div>
        <br />
        <div style={{textAlign: "center"}}>
            В разделе расчета количества Белка и Жиров выбирайте соотношение которое вам рекомендовал диетолог/тренер.
        </div>
        <div style={{textAlign: "center"}}>
          Пример: если вам порекомендовали выбрать 1.5 граммов белка на килограмм веса, то введите 1.5 в раздел белка. 
        </div>
        <div style={{textAlign: "center"}}>
          Примечание: Если ваш тренер или диетолог посоветовал вам употреблять жиры в соотношении меньше 1 грамма на килограмм - срочно меняйте тренера или диетолога. 
        </div>
        <br />

      <div>
        <DenseTable
          rows={rows}
          maintainingWeigthCalories={maintainingWeigthCalories}
          proCal={proCal}
          fatCal={fatCal}
          carbCal={carbCal}
        />
      </div>
    </form>
  );
}
