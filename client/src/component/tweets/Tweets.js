import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'

import TweetItem from './TweetItem'

const useStyles = makeStyles((theme) => ({
	display: {
		display: 'flex',
		flexWrap: 'nowrap',
	},
}))

const Tweets = ({ tweets }) => {
	const classes = useStyles()
	return (
		<Grid container item>
			{tweets.length === 0
				? // <Grid container item direction='column'>
				  // 	<h3 className={classes.display}>No Tweets Found.</h3>
				  // </Grid>
				  null
				: tweets.map((tweet) => <TweetItem key={tweet._id} tweet={tweet} />)}
		</Grid>
	)
}

export default Tweets
