import React from 'react'
import { Paper, Grid, Avatar, Typography, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import SideProfile from '../profile/SideProfile'
import { setProfile } from '../../Redux/actions/profile'

const PeopleItem = ({ user }) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const { _id, name, handle, followers, following } = user

	const handleClick = () => {
		dispatch(setProfile(user))
		history.push(`/people/${_id}`)
	}

	return (
		<Paper elevation={11}>
			<Button onClick={handleClick}>
				<Grid container item direction='column' spacing={2}>
					<Grid item>
						<Grid container item spacing={1}>
							<Grid item>
								<Avatar />
							</Grid>
							<Grid item>
								<Grid container item direction='column'>
									<Grid item>{name}</Grid>
									<Grid item>{handle}</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container item spacing={4}>
							<Grid item>
								<Typography>Followers {followers.length}</Typography>
							</Grid>
							<Grid item>
								<Typography>Following {following.length}</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Button>
		</Paper>
	)
}

export default PeopleItem
