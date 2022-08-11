import { Grid } from '@mui/material';
import React from 'react';
import LeftSection from '../components/LeftSection';
import RightSection from '../components/RightSection';

export default function(){
  return <Grid container spacing={2}>
    <Grid item xs={2}>
      <LeftSection />
    </Grid>
    <Grid item xs={10}>
      <RightSection />
    </Grid>
  </Grid>
}