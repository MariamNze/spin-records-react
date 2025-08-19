import {IconButton, Stack, TextField} from "@mui/material";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";

export default function CartProductQuantity({ value, onChange, min=1, max=100 }: { value: number, onChange: (value:number)=>void, min?: number, max?: number }) {
    const set = (value:number) => onChange(Math.min(max, Math.max(min, value)))

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <IconButton onClick={()=>set(value-1)} aria-label="decrease" size="small"><RemoveIcon /></IconButton>
            <TextField size="small" type="number" inputProps={{ min, max }} value={value} onChange={e=>set(parseInt(e.target.value||'0',10))} sx={{ width: 80 }} />
            <IconButton onClick={()=>set(value+1)} aria-label="increase" size="small"><AddIcon /></IconButton>
        </Stack>
    )
}