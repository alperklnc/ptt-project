import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Props {
  url: string;
}

function createData(
  type: string,
  prevAngle: number,
  currentAngle: number,
  progression: number,
  optimalAngle: number,
  totalReocary: number
) {
  return {
    type,
    prevAngle,
    currentAngle,
    progression,
    optimalAngle,
    totalReocary,
  };
}

const rows = [
  createData("Egzersiz 1: Sarkaç", 110, 120, 9.09, 150, 80),
  createData("Egzersiz 2: Makara", 110, 100, -9.09, 170, 58.8),
  createData("Egzersiz 3: Tırmanma", 50, 55, 10, 110, 50),
  createData("Egzersiz 4: Germe", 70, 90, 28.5, 120, 75),
];

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#4ec6c7",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const ExerciseTable: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const onClick = () => navigate(props.url);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableHeaderCell>Egzersizler</StyledTableHeaderCell>
            <StyledTableHeaderCell align="center">
              2. Seans
            </StyledTableHeaderCell>
            <StyledTableHeaderCell align="center">
              3. Seans
            </StyledTableHeaderCell>
            <StyledTableHeaderCell align="center">
              İlerleme (%)
            </StyledTableHeaderCell>
            <StyledTableHeaderCell align="center">
              Optimum Açı
            </StyledTableHeaderCell>
            <StyledTableHeaderCell align="center">
              Toplam İyileşme (%)
            </StyledTableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.type}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                onClick={onClick}
                style={{ cursor: "pointer" }}
              >
                {row.type}
              </TableCell>
              <TableCell align="center">{row.prevAngle}</TableCell>
              <TableCell align="center">{row.currentAngle}</TableCell>
              <TableCell align="center">{row.progression}</TableCell>
              <TableCell align="center">{row.optimalAngle}</TableCell>
              <TableCell align="center">{row.totalReocary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExerciseTable;
