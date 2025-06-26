
import { Delete } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { FC } from "react";

type SectionProps = {
  name: string;
  weight: string;
  id: string;
  handleDelete: (arg0: string) => void;
  handleSectionChange: (arg0: string, arg1: string) => void;
  handleWeightChange: (arg0: string, arg1: string) => void;
};

export const Section: FC<SectionProps> = ({
  name,
  weight,
  id,
  handleDelete,
  handleSectionChange,
  handleWeightChange,
}) => {
  return (
    <Box
      sx={{
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        mb: 1,
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        placeholder="Enter Section Name"
        value={name}
        autoComplete="off"
        onChange={(e) => handleSectionChange(id, e.target.value)}
        sx={{ flexBasis: "65%" }}
      />
      <TextField
        variant="outlined"
        size="small"
        placeholder="Enter Section Weight"
        value={weight}
        autoComplete="off"
        onChange={(e) => handleWeightChange(id, e.target.value)}
        sx={{ flexBasis: "25%" }}
      />
      <IconButton onClick={() => handleDelete(id)} aria-label="delete section">
        <Delete />
      </IconButton>
    </Box>
  );
};