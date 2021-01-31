import React from 'react';
import {Grid, Typography, Button } from "@material-ui/core";
import Card from "./Card"

const TagSet = ({name, tagContract, users}) => {

    console.log(users[0][1])

    const [tags, setTags] = React.useState([])
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
    }, [])
    return (
        <Grid container item xs={10}>
            <Grid container item xs={12} alignContent="center" justify="center" direction="column">
                <Typography variant ="h2" textAlign="center">
                    {name}
                </Typography>
                <Grid>
                    <Button variant="outlined">Create Tag for {name}</Button>
                </Grid>
            </Grid>
            {tags.map(tag=>{
                console.log(tag)
                console.log(tag[1])
                return (
                    <Card key={tag.id} tag={tag} />
                )
            })}
        </Grid>
    )
}

export default TagSet