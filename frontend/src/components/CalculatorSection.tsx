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
        py: 1.5,
        px: 1,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Section name and weight */}
      <Box sx={{ flexBasis: "60%", textAlign: "left" }}>
        <Typography fontWeight={600} fontFamily="initial" color="text.primary">
          {section.name}
        </Typography>
        <Typography
          variant="body2"
          fontFamily="initial"
          color="text.secondary"
          sx={{ mt: 0.3 }}
        >
          ({displayWeight}%)
        </Typography>
      </Box>

      {/* Grade input or notice + selection checkbox */}
      <Box
        sx={{
          flexBasis: "35%",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {!isSelected ? (
          <TextField
            placeholder={`Grade for ${section.name}`}
            size="small"
            autoComplete="off"
            fullWidth
            onChange={(e) => changeGrade(section.id, e.target.value)}
          />
        ) : (
          <Typography
            fontSize={14}
            fontWeight={600}
            color="error.main"
            sx={{ userSelect: "none" }}
          >
            This section will be calculated
          </Typography>
        )}

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
          }}
          inputProps={{ "aria-label": `Select section ${section.name}` }}
        />
      </Box>
    </Box>
  );
};

export default CalculatorSection;