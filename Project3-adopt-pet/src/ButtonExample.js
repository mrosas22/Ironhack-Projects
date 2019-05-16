import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

const ButtonExample = () => (
    
  <Grid>
    <Grid.Column>
      <p>Location</p>
      <p>Animal</p>
      <p>Breeds</p>
      {/* <Button onClick={() => console.log('Clicked')}>Click Here</Button> */}
    </Grid.Column>
  </Grid>
  
);

export default ButtonExample;