import React from 'react';
import {Grid, Typography, Button, FormControl, InputLabel, Select, MenuItem, makeStyles, ButtonGroup } from "@material-ui/core";
import Tag from "./Card"

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "darkgrey",
        borderRadius: "15px",
        padding: "25px",
        color: "white",
        margin: "10px"
        
    },
    title: {
        textShadow: "3px 4px 4px black"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    buttonGroup: {
        alignSelf: "center",
        color: "white",
        backgroundColor: "#259cac"
    },
    card: {
        margin: "60"
    }
  }));

  const images = [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMqn6SqO8ka2FhuGGu0JnSRPmiwIePbRCcvQ&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXrAl7Q2y4gWLhMPLbsNuNE8esTaXOzB6d_Q&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRmdqchKcU3yhwD75BSvv2cPELKemmBEi1vw&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF_9C2tOyeNnzCdlc1W4DC0bemev-7VY7Rkg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEAvlVCzGKcS149robv9cY49kzRMoJqyIu7w&usqp=CAU"
]

const TagSet = ({name, tagContract, users, account}) => {

    const random = Math.floor(Math.random()*5)

    const addBTN = React.useRef();
    const [tags, setTags] = React.useState([])
    const [drop, setDrop] = React.useState([])
    const [number, setNumber] = React.useState([])
    const classes = useStyles();

    async function tagList () {
        let temp = []
        const tagCount = await tagContract.methods.getCollectionTagArrayLength(name).call();
        for (let i = 1; i <= tagCount; i++){
            let taginfo = await tagContract.methods.getCollectionTagInfo(name, i).call();
            temp.push(taginfo)
        }
        setTags(temp);
    }
    
    React.useEffect(()=>{
        tagList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(()=>{
        for (let i = 0; i < tags.length; i++){
            if (tags[i][1] === account){
                addBTN.current.style.visibility = "hidden"
            }
            else{
                addBTN.current.style.visibility = "visible"
            }
        }
    }, [tags, account])

    async function addTag () {
        console.log("clicked")
        let temp = [...tags];
        let length = temp.length
        tagContract.methods.AddTag(name,account).send({from: account})
        let taginfo = await tagContract.methods.getCollectionTagInfo(name, length+1).call();
        temp.push(taginfo);
        setTags(temp)
        window.location.reload()
    }

    async function approveTag () {
        tagContract.methods.ApproveAddress(name,number,drop).send({from: account})
        .once('receipt', (receipt) => {
            window.location.reload()
          })
    }

    async function TransferTag () {
        tagContract.methods.TransferTag(name,number,drop).send({from: account})
        .once('receipt', (receipt) => {
            window.location.reload()
          })
    }

    const handleDropChange = (event) => {
        setDrop(event.target.value)
    }
    const handleDropNumberChange = (event) => {
        setNumber(event.target.value)
    }

    return (
        <Grid container item xs={10} className={classes.root}>
            <Grid container item xs={12} alignContent="center" justify="center" direction="column">
                <Typography variant ="h2" textAlign="center" className={classes.title}>
                    {name}
                </Typography>
                <Grid container item xs={12} alignContent="center" justify="center" direction="column">
                <Button variant="outlined" onClick ={addTag} ref={addBTN}>Create Tag for {name}</Button>

                    <Grid>
                    <FormControl className={classes.formControl}>
                            <InputLabel >Golfer to Transfer</InputLabel>
                            <Select
                                placeholder="Select Golfer"
                                onChange={handleDropChange}
                                displayEmpty
                                value={drop}
                                className={classes.selectEmpty}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="Golfer Name" disabled>
                                    Golfer Name
                                </MenuItem>
                                {users.sort((a, b) => a.username.localeCompare(b.username)).map((ele, index)=>{
                                    return (
                                    <MenuItem 
                                        key ={index}
                                        value={ele.account}
                                    >
                                        {ele.username}
                                    </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    <FormControl className={classes.formControl}>
                            <InputLabel >Tag Number</InputLabel>
                            <Select
                                placeholder="Select Tag Number"
                                onChange={handleDropNumberChange}
                                displayEmpty
                                value={number}
                                className={classes.selectEmpty}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="Tag Number" disabled>
                                    Tag Number
                                </MenuItem>
                                {tags.map((ele, index)=>{
                                    return (
                                    <MenuItem 
                                        key ={index}
                                        value={index+1}
                                    >
                                        {index+1}
                                    </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>                    
                    </Grid>
                    <ButtonGroup className={classes.buttonGroup} size="large">
                        <Button variant="outlined" onClick ={approveTag} >Approve Golfer for Transfer</Button>
                        <Button variant="outlined" onClick ={TransferTag} > Transfer Tag</Button>
                    </ButtonGroup>
                   
                </Grid>
            </Grid>
            <Grid direction={'row'} container item xs={12} alignContent="center" justify="center">
            {tags.map(tag=>{
                return (
                    <Tag className={classes.card} key={tag.id} tag={tag} users={users} url={images[random]}/>
                )
            })}
            </Grid>
        </Grid>
    )
}

export default TagSet