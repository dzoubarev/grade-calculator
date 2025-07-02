import { Box, Checkbox, TextField, Typography } from "@mui/material";
import { SectionType } from "./SectionCreator";
import { FC } from "react";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";

type CalculatorSectionProps = {
  section: SectionType;
  changeGrade: (id: string, grade: string) => void;
  isSelected: boolean;
  setSelected: (id: string) => void;
};

const CalculatorSection: FC<CalculatorSectionProps> = ({
  section,
  changeGrade,
  isSelected,
  setSelected,
}) => {
  const weightValue = parseFloat(section.weight);
  const displayWeight =
    weightValue < 1 ? (weightValue * 100).toFixed(0) : weightValue.toString();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        py: 2,
        px: { xs: 0.5, sm: 1 },
        borderBottom: "1px solid",
        borderColor: "divider",
        gap: { xs: 1, sm: 1.5 },
        flexWrap: { xs: "wrap", sm: "nowrap" },
      }}
    >
      {/* Section name and weight */}
      <Box sx={{ flexBasis: { xs: "calc(60% - 10px)", sm: "60%" } }}>
        <Typography
          fontWeight={600}
          fontFamily="initial"
          color="text.primary"
          sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}
        >
          {section.name}
        </Typography>
        <Typography
          variant="body2"
          fontFamily="initial"
          color="text.secondary"
          sx={{
            mt: 0.3,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
          }}
        >
          ({displayWeight}%)
        </Typography>
      </Box>

      {/* Grade input or notice */}
      <Box
        sx={{
          flexBasis: { xs: "calc(30% - 10px)", sm: "30%" },
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "flex-end", sm: "center" },
        }}
      >
        {!isSelected ? (
          <TextField
            placeholder="Grade"
            size="small"
            autoComplete="off"
            sx={{
              width: { xs: "80px", sm: "auto" },
              "& .MuiInputBase-input": {
                fontSize: { xs: "1rem", sm: "1rem" },
                padding: { xs: "6px 8px", sm: "8.5px 14px" },
              },
            }}
            onChange={(e) => changeGrade(section.id, e.target.value)}
          />
        ) : (
          <Typography
            fontSize={{ xs: "0.7rem", sm: 14 }}
            fontWeight={600}
            color="error.main"
            sx={{
              userSelect: "none",
              textAlign: "right",
              width: { xs: "80px", sm: "auto" },
            }}
          >
            Section to Calculate
          </Typography>
        )}
      </Box>

      {/* Checkbox */}
      <Box
        sx={{
          width: { xs: "auto", sm: "auto" },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Checkbox
          icon={<RadioButtonUnchecked />}
          checkedIcon={<RadioButtonChecked />}
          onChange={() => setSelected(section.id)}
          checked={isSelected}
          sx={{
            color: "text.secondary",
            "&.Mui-checked": {
              color: "error.main",
            },
            padding: { xs: "4px", sm: "9px" },
          }}
          inputProps={{ "aria-label": `Select section ${section.name}` }}
        />
      </Box>
    </Box>
  );
};

export default CalculatorSection;