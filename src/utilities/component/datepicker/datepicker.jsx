import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function BasicDatePicker({
  description,
  onChange,
  defaultValue,
  disableFuture,
  disablePast,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        sx={{
          width: "100%",
        }}
        components={["DatePicker"]}
      >
        <DatePicker
          label={description}
          format="DD-MM-YYYY"
          onChange={onChange}
          margin="normal"
          disableFuture={false || disableFuture}
          disablePast={false || disablePast}
          value={dayjs(`${defaultValue}`)}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
