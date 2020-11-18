import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));


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
      label: "Девочка"
    },
    {
      value: 2,
      label: "Мальчик"
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
    if (parseInt(e.target.value, 10) === 1) {
      setSexMultiplier(161);
    }
    if (parseInt(e.target.value, 10) === 2) setSexMultiplier(-5);
    setSexValue(e.target.value);
  }

  const handleCheck = (e) => {
    e.preventDefault();
    const result =
      ((10 * parseInt(weigthValue, 10) || 0) +
        6.25 * parseInt(heightValue, 10) -
        5 * parseInt(ageValue, 10) - (sexMultiplier)) *
      multiplier;

    setMaintainingWeigthCalories(parseInt(result));

    const fatCal = ((weigthValue*fatValue));
    setFatCal(parseInt(fatCal))

    const proCal = ((weigthValue*proteinValue));
    setProCal(parseInt(proCal))

    const carbCal = ((result-((fatCal*9)+(proCal*4)))/4)
    setCarbCal(parseInt(carbCal))

    
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleCheck}
    >
      <div>1 - нет физических нагрузок и сидячая работа</div>
      <div>
        2 - совершаете небольшие пробежки или делаете легкую гимнастику 1–3 раза
        в неделю
      </div>
      <div>3 - занимаетесь спортом со средними нагрузками 3–5 раз в неделю</div>
      <div>4 - полноценно тренируетесь 6–7 раз в неделю</div>
      <div>
        5 - ваша работа связана с физическим трудом, вы тренируетесь 2 раза в
        день и включаете в программу тренировок силовые упражнения
      </div>
      <br/>
      <br/>
      <br/>
      <div>
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
        <div>
        <TextField
          id="age-number"
          label="Ваш возраст"
          type="number"
          value={ageValue}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => {
            setAgeValue(e.target.value);
          }}
      >
      </TextField>
        <TextField
          id="weight-number"
          label="Ваш вес"
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
          label="Ваш рост"
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

      <div>
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
          label="Соотношение в котором расчитывать белок"
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
          label="Соотношение в котором расчитывать жир"
          type="float"
          value={fatValue}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => {
            setFatValue(e.target.value);
          }}
        />
        <button type="submit">Посчитать</button>
      </div>

      <br/>
      <br/>
      <br/>

      <div>
      Калораж для поддержания веса: {maintainingWeigthCalories}
      </div>

      <div>
      Дневная норма белковых калорий: {proCal}
      </div>

      <div>
      Дневная норма жировых калорий: {fatCal}
      </div>

      <div>
      Дневная норма углеводных калорий: {carbCal}
      </div>

      <div>
        <DenseTable/>
      </div>
    </form>

    
  );
}

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs};
}

const rows = [
  createData('Calories', FormPropsTextFields.maintainingWeigthCalories, 6.0, 24, 4.0),
  createData('Белки', FormPropsTextFields.proCal, 9.0, 37, 4.3),
  createData('Жиры', FormPropsTextFields.fatCal, 16.0, 24, 6.0),
  createData('Углеводы', FormPropsTextFields.carbCal, 3.7, 67, 4.3),
];

export function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Ваши результаты</TableCell>
            <TableCell align="center">Для поддержания веса</TableCell>
            <TableCell align="center">Для похудения&nbsp;(-10%)</TableCell>
            <TableCell align="center">Для набора веса&nbsp;(+10%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

