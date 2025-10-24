import {Box, FormControl, InputLabel, MenuItem, Select} from '@mui/material'

interface FilterBarProps {
    selectedType: string;
    setSelectedType: (value: string)=>void
    selectedEmail: string;
    setSelectedEmail: (value: string)=>void
    accountTypes: string[];
    accountEmails: string[];
}

export const FilterBar = ({
  selectedType,
  setSelectedType,
  selectedEmail,
  setSelectedEmail,
  accountTypes,
  accountEmails,
}: FilterBarProps) => {


    return (
        <Box display='flex' gap={2} flexWrap='wrap' mt={2}>
            <FormControl sx={{minWidth: 180}}>
                <InputLabel>Tipo de cuenta</InputLabel>
                <Select
                    value={selectedType}
                    label='Tipo de cuenta'
                    onChange={(e)=> setSelectedType(e.target.value)}
                    >
                    {/* <MenuItem value=''>Todos</MenuItem> */}
                    {accountTypes.map((type)=>(
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                    </Select>
            </FormControl>


            {accountEmails.length > 1 ? <FormControl sx={{minWidth: 180}}>
                                            <InputLabel>Email de registro</InputLabel>
                                            <Select
                                                value={selectedEmail}
                                                label='Email de registro'
                                                onChange={(e)=> setSelectedEmail(e.target.value)}
                                                >
                                                {/* <MenuItem value="" >Todos</MenuItem> */}
                                                {accountEmails.map((email) => (
                                                    <MenuItem key={email} value={email}>{email}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        :""
            }
            
        </Box>
    )
}
