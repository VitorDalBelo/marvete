import React from 'react';
import Typography from '@mui/material/Typography';
import { OverridableStringUnion } from '@mui/types';
import { Variant } from '@mui/material/styles/createTypography';
import { TypographyPropsVariantOverrides } from '@mui/material/Typography';
interface LogoProps{
    variant : OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>,
    style ?: React.CSSProperties,
    id ?: string
}

export default function Logo(props : LogoProps){
    return(
        <Typography id={props.id?props.id:''}
        style={props.style?props.style:{}}
        className='logo'
        variant={props.variant}
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 15,
          display:{xs:'none',md: 'flex'},
          textDecoration: 'none',
        }}
      >
        MARVETE
      </Typography>
    );
}