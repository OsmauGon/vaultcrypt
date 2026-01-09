import {Box, FormControl, InputLabel, MenuItem, Select} from '@mui/material'

interface FilterBarProps {
    selectedType: string;
    setSelectedType: (value: string)=>void
    selectedEmail: string;
    setSelectedEmail: (value: string)=>void
    accountTypes: string[];
    accountEmails: string[];
}


const tiposDEcuentas = [
  ["RedSocial","Red Social"],
  ["CorreoElectronico","Correo Electronico"],
  ["BusquedaLaboral","Busqueda Laboral"],
  ["NubeDEdescargas","Nube de Descarga"],
  ["ProgramacionDesarrollo","Programacion y desarrollo"],
  ["AplicacionDEdispositivo","Aplicacion de Dispositivo"],
  ["BilleteraInversiones","Billeteras e inversiones"],
  ["Otros", "Otros"]
]

export const FilterBar = ({
  selectedType,
  setSelectedType,
  selectedEmail,
  setSelectedEmail,
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
                    {/* {accountTypes.map((type)=>(
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))} */}
                    {tiposDEcuentas.map((type)=>(
                        <MenuItem key={type[0]} value={type[0]}>{type[1]}</MenuItem>
                    ))}
                    </Select>
            </FormControl>


            {accountEmails.length != 0 ? <FormControl sx={{minWidth: 180}}>
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
