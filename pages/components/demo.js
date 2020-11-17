import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  
  export default function FormPropsTextFields() {
    const classes = useStyles();
  
    return (
      <form className={classes.root} noValidate autoComplete="off" onChange={calculate}>
        <div>
        1 - нет физических нагрузок и сидячая работа
        </div>
        <div>			
        2 - совершаете небольшие пробежки или делаете легкую гимнастику 1–3 раза в неделю	
        </div>
        <div>		
        3 - занимаетесь спортом со средними нагрузками 3–5 раз в неделю
        </div>
        <div>			
        4 - полноценно тренируетесь 6–7 раз в неделю
        </div>
        <div>			
        5 - ваша работа связана с физическим трудом, вы тренируетесь 2 раза в день и включаете в программу тренировок силовые упражнения	
        </div>
        
        <div>
          <TextField
            id="age-number"
            label="Ваш возраст"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            />
            <TextField
            id="weight-number"
            label="Ваш вес"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            />
            <TextField
            id="height-number"
            label="Ваш рост"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            />
          </div>

          <div>
           
            <TextField
            id="intencity-number"
            label="Уровень физической активности"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            />            
            <TextField
            id="protein-number"
            label="Соотношение в котором расчитывать белок"
            type="float"
            InputLabelProps={{
              shrink: true,
            }}
            />
            <TextField
            id="fat-number"
            label="Соотношение в котором расчитывать жир"
            type="float"
            InputLabelProps={{
              shrink: true,
            }}
            />
        </div>
      </form>


    );
  }

  function calculate(){
      var age = document.getElementById("age-number").nodeValue;
      return age
      alert(age)
  }