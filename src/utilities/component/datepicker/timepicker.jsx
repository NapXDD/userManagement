import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

export default function BasicTimePicker({
  description,
  onChange,
  defaultValue,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        sx={{
          width: "100%",
        }}
        components={["TimePicker"]}
      >
        <TimePicker
          label={description}
          value={dayjs(`${defaultValue}`)}
          //   onChange={onChange}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          onChange={onChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
