import {TextField, InputAdornment} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

type Props  = {
    selectedName: string;
    setSelectedName: (value: string)=>void;
}

export const SearchBar =({selectedName, setSelectedName}: Props)=>{
    return (
        <TextField
            fullWidth
            variant='outlined'
            placeholder='Buscar cuentas...'
            value={selectedName}
            onChange={e=> setSelectedName(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                        <SearchIcon color='action'/>
                    </InputAdornment>
                )
            }}
            sx={{mb: 2}}
        />

    )
}