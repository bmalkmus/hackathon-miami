import React from 'react';
import { Button, Grid, ListItem, Typography, makeStyles, ListSubheader, List } from "@material-ui/core";

function MainView({collection, collectionsCount}) {
    console.log("collection", collection, collectionsCount)
  return (
      <Grid container item xs={12} direction="column" justify="center">
          <Typography alignSelf = "center" variant="h1">Welcome to Digital Golf Tags</Typography>
          <Grid>
              <List
              subheader={
                  <ListSubheader component="div">
                      Collection List
                  </ListSubheader>
              }
              >
                {collection.map((ele,index)=>{
                    return (
                        <ListItem key={index} >
                            {ele.name}
                        </ListItem>
                    )
                })}
              </List>
          </Grid>
      </Grid>
  )
}

export default MainView