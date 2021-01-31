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
    root: {
        backgroundColor: "#343a40"
    },
    title: {
        color: "#259cac",
        textShadow: "3px 4px 6px #015486"
    },
    form: {
        backgroundColor: "white",
        color: '#259cac'
    },
    label: {
        color: "white"
    },
    button: {
        color: "white",
        borderColor: "#259cac",
        backgroundColor: "#a5a5a5",
        margin: "15px"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
      backgroundColor: "#a5a5a5",

    },
    test: {
        height:"100vh"
    },
    paragraph: {
        fontSize: "30px",
        color: "white"
    }
  }));


function MainView({collection, collectionsCount, setNameBtn, setUserNameBtn, addTag, tagContract, users, account}) {
    console.log("collection", collection, collectionsCount, )
    const classes = useStyles();
    const inputRef = React.useRef();
    const userNameRef = React.useRef();
    const containerRef=React.useRef([]);
    const [inputField, changeInput]=React.useState("");
    const [userNameField, changeName]=React.useState("");
    const [drop, changeDrop]=React.useState("Set Tag Name");
    const [unique, setUnique] = React.useState(true)
    const [uniqueUser, setUniqueUser] = React.useState(true)

    React.useEffect(()=>{
        for (let i = 0; i < collection.length; i++){

            if (inputField === collection[i].name){
                console.log("They are the same", inputField)
                inputRef.current.style.color="red"
                setUniqueUser(false);
            }
            else {
                inputRef.current.style.color="inherit"
                setUniqueUser(true);
            }
        }
    }, [collection, inputField])

    React.useEffect(()=>{
        for (let i = 0; i < users.length; i++){

            if (userNameField === users[i].username){
                inputRef.current.style.color="red"
                setUnique(false);
            }
            else {
                inputRef.current.style.color="inherit"
                setUnique(true);
            }
        }
    }, [users, userNameField])

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
    const userNameChange = () => {
        console.log(userNameRef.current.value)
        changeName(userNameRef.current.value)
    }

  
  return (
      <Grid container item xs={12} direction="column" justify="center" className={classes.root}>
          <Typography className={classes.title} alignSelf = "center" variant="h1">Digital Golf Tags</Typography>
          <Grid>
              <Grid  className={classes.test}>
                <Grid>
                        <FormControl className={classes.formControl}>
                            <InputLabel className={classes.label}>Tag Set Name</InputLabel>
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
                    <form noValidate autoComplete="off">
                        <TextField  className={classes.selectEmpty} id="outlined-basic" label="Set UserName" variant="outlined" inputRef ={userNameRef} onChange={userNameChange}/>
                    </form>
                    <Button className={classes.button} size="large" variant="outlined" onClick={()=>{setUserNameBtn(userNameField, uniqueUser)}}>Register Username</Button>
                </Grid>
                <Grid item xs={12}>
                    <form noValidate autoComplete="off">
                        <TextField className={classes.selectEmpty} id="outlined-basic" label="Set Name" variant="outlined" inputRef ={inputRef} onChange={inputChange}/>
                    </form>
                    <Button size="large" className={classes.button} variant="outlined" onClick={()=>{setNameBtn(inputField, unique)}}>Add a new Tag Set</Button>
                </Grid>
                <br/>
              <Typography variant="body1" className={classes.paragraph}>
                  Welcome to Digital Golf Tags! The One-Stop place to create sets, add individual tags, and trade tags after a round. No need to worry about losing your tag ever again or wondering which players have a higher value tag that the one you own! If you haven't Registed a name already, please do so. It helps other members know who has what tag.
              </Typography>
              </Grid>
              <Grid contianer item xs={12} justify="center" alignItems="center">
              {collection.map((ele, index)=>{
                  return (
                    //   <div id={ele.name} key = {index} ref={el => containerRef.current[ele.name] = el}>
                    //       <h2>{ele.name}</h2>
                    //   </div>
                    <Grid container item alignContent= "center" justify="center" id={ele.name} key = {index} ref={el => containerRef.current[ele.name] = el}>
                      <TagSet name = {ele.name} key = {index} addTag={addTag} tagContract={tagContract} users={users} account={account}/>
                    </Grid>
                  )
              })}
              </Grid>
          </Grid>
      </Grid>
  )
}

export default MainView