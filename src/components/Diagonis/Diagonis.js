// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { TableVirtuoso } from 'react-virtuoso';
// import { Button } from '@mui/material';

// const sample = [
//     ['Test-1', 159, 6.0, 24, 4.0],
//     ['Test-2', 237, 9.0, 37, 4.3],
//     ['Test-3', 262, 16.0, 24, 6.0],
//     ['Test-4', 305, 3.7, 67, 4.3],
//     ['Test-5', 356, 16.0, 49, 3.9],
// ];

// function createData(id, dessert, calories, fat, carbs, protein) {
//     return { id, dessert, calories, fat, carbs, protein };
// }

// const columns = [
//     {
//         width: 200,
//         label: 'Tests',
//         dataKey: 'dessert',
//     },
//     {
//         width: 120,
//         label: 'Price',
//         dataKey: 'calories',
//         numeric: true,
//     },
//     {
//         width: 100,
//         label: 'Button 1',
//         dataKey: 'button1',
//         buttonColumn: true, // Add a buttonColumn property
//     },
//     {
//         width: 100,
//         label: 'Button 2',
//         dataKey: 'button2',
//         buttonColumn: true, // Add a buttonColumn property
//     }
// ];

// const rows = Array.from({ length: 10 }, (_, index) => {
//     const randomSelection = sample[Math.floor(Math.random() * sample.length)];
//     return createData(
//         index,
//         ...randomSelection,
//         <Button variant="contained" color="primary" onClick={() => handleButtonClick('Button 1')}>
//             Button 1
//         </Button>,
//         <Button variant="contained" color="secondary" onClick={() => handleButtonClick('Button 2')}>
//             Button 2
//         </Button>
//     );
// });


// const VirtuosoTableComponents = {
//     Scroller: React.forwardRef((props, ref) => (
//         <TableContainer component={Paper} {...props} ref={ref} />
//     )),
//     Table: (props) => (
//         <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
//     ),
//     TableHead,
//     TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
//     TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
// };

// function fixedHeaderContent() {
//     return (
//         <TableRow>
//             {columns.map((column) => (
//                 <TableCell
//                     key={column.dataKey}
//                     variant="head"
//                     align={column.numeric || false ? 'right' : 'left'}
//                     style={{ width: column.width }}
//                     sx={{
//                         backgroundColor: 'background.paper',
//                     }}
//                 >
//                     {column.label}
//                 </TableCell>
//             ))}
//         </TableRow>
//     );
// }
// function handleButtonClick(buttonLabel) {
//     // Implement your button click logic here
//     alert(`Button "${buttonLabel}" clicked.`);
// }


// function rowContent(_index, row) {
//     return (
//         <React.Fragment>
//             {columns.map((column) => (
//                 <TableCell
//                     key={column.dataKey}
//                     align={column.numeric || false ? 'right' : 'left'}
//                 >
//                     {column.buttonColumn ? row[column.dataKey] : row[column.dataKey]}
//                 </TableCell>
//             ))}
//         </React.Fragment>
//     );
// }


// export default function Diagonis() {
//     return (
//         <Paper style={{ height: "91vh", width: '70%' }}>
//             <h1 color='black'>Tests Available @ Dia_Name</h1>
//             <TableVirtuoso
//                 data={rows}
//                 components={VirtuosoTableComponents}
//                 fixedHeaderContent={fixedHeaderContent}
//                 itemContent={rowContent}
//             />
//         </Paper>
//     );
// }

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import './Diagnosis.css';
import { useEffect } from 'react';
import axios from 'axios'

function createData(name, calories) {
    return { name, calories };
}

export default function Diagonis() {
    const [rows, setRows] = React.useState([]);
    const [editRow, setEditRow] = React.useState(null);
    const [editedCalories, setEditedCalories] = React.useState(null);


    useEffect(() => {
        axios.post('https://mediscan-3qze.onrender.com/api/test/show', {
            centerId: localStorage.getItem('testCenterId')
        }).then(async (response) => {
            setRows(response.data.tests.map((test) => { return { name: test.name, price: test.price } }))
            console.log(rows)
        }).catch((err) => console.log(err))

    }, [rows])




    const handleDelete = (name) => {
        const updatedRows = rows.filter((row) => row.name !== name);
        setRows(updatedRows);
    };

    const handleEdit = (name) => {
        // Set the row to edit mode
        setEditRow(name);
        // Find the selected row
        const selectedRow = rows.find((row) => row.name === name);
        // Set the edited calories to the current value
        setEditedCalories(selectedRow.calories);
    };

    const handleSave = (name) => {
        // Find the selected row
        const selectedRow = rows.find((row) => row.name === name);
        // Update the calories with the edited value
        selectedRow.calories = editedCalories;
        // Exit edit mode
        setEditRow(null);
    };

    return (
        <>
            <div className='dummy'>
                <h1>Available Tests</h1>
                <TableContainer component={Paper} sx={{ width: 6 / 10 }} >
                    <Table sx={{ width: 1 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Test Name</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {editRow === row.name ? (
                                            <Input
                                                type="number"
                                                value={editedCalories}
                                                onChange={(e) => setEditedCalories(e.target.value)}
                                            />
                                        ) : (
                                            row.price
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        {editRow === row.name ? (
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleSave(row.name)}
                                            >
                                                Save
                                            </Button>
                                        ) : (
                                            <div>
                                                <Button sx={{ margin: 1 }}
                                                    variant="outlined"
                                                    onClick={() => handleEdit(row.name)}
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleDelete(row.name)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
