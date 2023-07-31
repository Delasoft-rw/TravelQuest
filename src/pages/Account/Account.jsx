import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux';
import { camelToNormal } from 'utils/index';


function Account() {
  const avatar1 =
    'https://png.pngtree.com/png-clipart/20210520/ourmid/pngtree-small-eye-handsome-boys-colorless-character-avatar-png-image_3286527.jpg';

  const { userInfo } = useSelector((state) => state.menu);

  useEffect(() => {
    console.log(userInfo)
  }, [])
  return (
    <>
      <h3 className="font-bold text-xl">Account</h3>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <img src={`${avatar1}`} alt='avatar' className='w-40 h-40 object-cover rounded-full m-auto' />
            </Grid>
            <Grid item xs={12}><p className='text-center font-bold'><span className='font-bold'>{camelToNormal('username')}: </span>{userInfo.username}</p></Grid>
            <Grid item xs={12}><p className='text-center font-bold '><span className='font-bold'>{camelToNormal('email')}: </span>{userInfo.email}</p></Grid>
            <Grid item xs={12}><p className='text-center font-bold uppercase'><span className='font-bold'>{camelToNormal('roles')}: </span>{userInfo.roles.map(el => el.name).join(', ')}</p></Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sm={8}>
          <Grid container spacing={0}>
            <Grid item xs={12}><p className=''><span className='font-bold'>{camelToNormal('firstName')}:</span>{userInfo.firstName}</p></Grid>
            <Grid item xs={12}><p className=''><span className='font-bold'>{camelToNormal('lastName')}:</span>{userInfo.lastName}</p></Grid>
            <Grid item xs={12}><p className=''><span className='font-bold'>{camelToNormal('address')}:</span>{userInfo.address}</p></Grid>
            <Grid item xs={12}><p className=''><span className='font-bold'>{camelToNormal('mobileTelephone')}:</span>{userInfo.mobileTelephone}</p></Grid>
            <Grid item xs={12}><p className=''><span className='font-bold'>{camelToNormal('workTelephone')}:</span>{userInfo.workTelephone}</p></Grid>
            <Grid item xs={12}><p className=''><span className='font-bold'>{camelToNormal('dob')}:</span>{userInfo.dob}</p></Grid>
            <Grid item xs={12}><p className=''><span className='font-bold'>{camelToNormal('gender')}:</span>{userInfo.gender}</p></Grid>
            <Grid item xs={12}><p className=''><span className='font-bold'>{camelToNormal('nationality')}:</span>{userInfo.nationality}</p></Grid>
            <Grid item xs={12}><p className=''><span className='font-bold'>{camelToNormal('passport')}:</span>{userInfo.passport}</p></Grid>
            <Grid item xs={12}><p className=''><span className='font-bold'>{camelToNormal('language')}:</span>{userInfo.language}</p></Grid>
            <Grid item xs={12}><p className=''><span className='font-bold'>{camelToNormal('placeOfIssue')}:</span>{userInfo.placeOfIssue}</p></Grid>
            <Grid item xs={12}><p className=''><span className='font-bold'>{camelToNormal('workEmail')}:</span>{userInfo.workEmail}</p></Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </>
  )
}

export default Account