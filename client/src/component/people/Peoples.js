import React, { useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import PeopleItem from './PeopleItem'
import { getUsers } from '../../Redux/actions/profile'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: 5,
	},
}))

const People = () => {
	const dispatch = useDispatch()
	// Gets all user profile
	useEffect(() => {
		dispatch(getUsers())
	}, [])

	const classes = useStyles()
	const users = useSelector((state) => state.profile.people)

	return (
		<Grid container direction='column' justify='flex-start' alignItems='center'>
			{users.map((user) => (
				<Grid item className={classes.margin}>
					<PeopleItem user={user} />
				</Grid>
			))}

			{/* <Grid item className={classes.margin}>
				<PeopleItem />
			</Grid>
			<Grid item className={classes.margin}>
				<PeopleItem />
			</Grid>
			<Grid item className={classes.margin}>
				<PeopleItem />
			</Grid>
			<Grid item className={classes.margin}>
				<PeopleItem />
			</Grid>
			<Grid item className={classes.margin}>
				<PeopleItem />
			</Grid>
			<Grid item className={classes.margin}>
				<PeopleItem />
			</Grid>
			<Grid item className={classes.margin}>
				<PeopleItem />
			</Grid>
			<Grid item className={classes.margin}>
				<PeopleItem />
			</Grid>
			<Grid item className={classes.margin}>
				<PeopleItem />
			</Grid> */}
		</Grid>
	)
}

export default People
