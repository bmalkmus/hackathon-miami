import React from 'react';
import { 
    Button, 
    Grid, 
    ListItem, 
    Typography, 
    makeStyles, 
    FormControl, 
    MenuItem, 
    Select, 
    InputLabel, 
    TextField } from "@material-ui/core";
import TagSet from '../TagSets/index';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    test: {
        height:"100vh"
    }
  }));


function MainView({collection, collectionsCount, setNameBtn, addTag, tagContract, users}) {
    console.log("collection", collection, collectionsCount, )
    const classes = useStyles();
    const inputRef = React.useRef();
    const containerRef=React.useRef([]);
    const [inputField, changeInput]=React.useState("");
    const [drop, changeDrop]=React.useState("Set Tag Name");
    const [unique, setUnique] = React.useState(true)

    React.useEffect(()=>{
        for (let i = 0; i < collection.length; i++){

            if (inputField === collection[i].name){
                console.log("They are the same", inputField)
                inputRef.current.style.color="red"
                setUnique(false);
            }
            else {
                inputRef.current.style.color="inherit"
                setUnique(true);
            }
        }
    }, [collection, inputField])

    const handleDropChange = (event) => {
        changeDrop(event.target.value)
        const element = containerRef.current[event.target.value]
        console.log(element, "div")
        window.scrollTo({
            behavior: "smooth",
            top: element.offsetTop
          });
        // element.scrollIntoView({alignToTop: true, behavior: "smooth"})
        element.scrollTo(0,0);
        console.log("changed")
    }

    const inputChange = () => {
        console.log(inputRef.current.value)
        changeInput(inputRef.current.value)
    }

  
  return (
      <Grid container item xs={12} direction="column" justify="center">
          <Typography alignSelf = "center" variant="h1">Welcome to Digital Golf Tags</Typography>
          <Grid>
              <Grid className={classes.test}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Tag Set Name</InputLabel>
                        <Select
                            placeholder="Select Tag"
                            onChange={handleDropChange}
                            displayEmpty
                            value={drop}
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="Set Tag Name" disabled>
                                Tag Set Name
                            </MenuItem>
                            {collection.sort((a, b) => a.name.localeCompare(b.name)).map((ele, index)=>{
                                return (
                                <MenuItem 
                                    key ={index}
                                    value={ele.name}
                                >
                                    {ele.name}
                                </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
              <Grid item xs={12}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Set Name" variant="outlined" inputRef ={inputRef} onChange={inputChange}/>
                </form>
                <Button size="large" variant="outlined" onClick={()=>{setNameBtn(inputField, unique)}}>Add a new Tag Set</Button>
              </Grid>
              {collection.map((ele, index)=>{
                  return (
                    //   <div id={ele.name} key = {index} ref={el => containerRef.current[ele.name] = el}>
                    //       <h2>{ele.name}</h2>
                    //   </div>
                    <div id={ele.name} key = {index} ref={el => containerRef.current[ele.name] = el}>
                      <TagSet name = {ele.name} key = {index} addTag={addTag} tagContract={tagContract} users={users}/>
                    </div>
                  )
              })}
          </Grid>
      </Grid>
  )
}

export default MainView