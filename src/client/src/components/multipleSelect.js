import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

function getStyles(number, seatNumber, theme) {
    return {
      fontWeight:
        seatNumber.indexOf(number) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const seatsArray = window.localStorage.getItem('SEATSARRAY')
console.log(seatsArray);

export default function MultipleSelect() {
    const theme = useTheme();
    const [seatNumber, setSeatNumber] = React.useState([]);
    const seatsArray = window.localStorage.getItem('SEATSARRAY')
    console.log(seatsArray);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSeatNumber(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return(
        <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={seatNumber}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
        >
            {[seatsArray].map((number) => (
                <MenuItem
                    key={number}
                    value={number}
                    style={getStyles(number, seatNumber, theme)}
                >
                    {number}
                </MenuItem>
            ))}
        </Select>
    )
}