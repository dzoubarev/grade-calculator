import { Delete } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { FC } from "react";

type SectionProps = {
  name: string;
  weight: string;
  id: string;
  handleDelete: (id: string) => void;
  handleSectionChange: (id: string, newName: string) => void;
  handleWeightChange: (id: string, newWeight: string) => void;
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
        display: "flex",
        flexDirection: "row",
        gap: { xs: 1, sm: 1 },
        mb: { xs: 1, sm: 1.5 },
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        placeholder="Enter Section Name"
        value={name}
        autoComplete="off"
        onChange={(e) => handleSectionChange(id, e.target.value)}
        sx={{
          flex: 1,
          minWidth: 0,
          "& .MuiInputBase-input": {
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            padding: { xs: "6px 8px", sm: "8.5px 14px" },
          },
        }}
      />
      <TextField
        variant="outlined"
        size="small"
        placeholder="Weight"
        value={weight}
        autoComplete="off"
        onChange={(e) => handleWeightChange(id, e.target.value)}
        sx={{
          width: { xs: "65px", sm: "100px" },
          flexShrink: 0,
          "& .MuiInputBase-input": {
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            padding: { xs: "6px 4px", sm: "8.5px 14px" },
          },
        }}
      />
      <IconButton
        onClick={() => handleDelete(id)}
        aria-label="delete section"
        sx={{
          padding: { xs: "4px", sm: "8px" },
          width: { xs: "32px", sm: "40px" },
          height: { xs: "32px", sm: "40px" },
          flexShrink: 0,
          "& .MuiSvgIcon-root": {
            fontSize: { xs: "1rem", sm: "1.25rem" },
          },
        }}
      >
        <Delete />
      </IconButton>
    </Box>
  );
};