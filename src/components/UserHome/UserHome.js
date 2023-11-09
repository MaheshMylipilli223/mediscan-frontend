import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { Popper } from '@mui/base/Popper';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import Navbar from "../NavBar1/NavBar1";
import { Button, buttonClasses } from '@mui/base/Button';
import Stack from '@mui/material/Stack';
import './UserHome.css';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90vw",
    height: "75vh",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledNoOptions = styled('li')`
list-style: none;
padding: 8px;
cursor: default;
`;


const StyledOption = styled('li')(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    cursor: pointer;
  }

  &[aria-selected=true] {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.Mui-focused,
  &.Mui-focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.Mui-focusVisible {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &[aria-selected=true].Mui-focused,
  &[aria-selected=true].Mui-focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  `,
);


const StyledListbox = styled('ul')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  max-height: 300px;
  z-index: 1;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
        };
  `,
);



const StyledPopupIndicator = styled(Button)(
    ({ theme }) => `
    outline: 0;
    box-shadow: none;
    border: 0;
    border-radius: 4px;
    background-color: transparent;
    align-self: center;
    padding: 0 2px;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[700] : blue[100]};
      cursor: pointer;
    }

    & > svg {
      transform: translateY(2px);
    }

    &.popupOpen > svg {
      transform: translateY(2px) rotate(180deg);
    }
  `,
);




const StyledPopper = styled('div')`
    position: relative;
    z-index: 1001;
    width: 320px;
  `;


const StyledClearIndicator = styled(Button)(
    ({ theme }) => `
    outline: 0;
    box-shadow: none;
    border: 0;
    border-radius: 4px;
    background-color: transparent;
    align-self: center;
    padding: 0 2px;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[700] : blue[100]};
      cursor: pointer;
    }

    & > svg {
      transform: translateY(2px) scale(0.9);
    }
  `,
);


const StyledInput = styled('input')(
    ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  flex: 1 0 auto;
`,
);

const StyledAutocompleteRoot = styled('div')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
        };
  display: flex;
  gap: 5px;
  padding-right: 5px;
  overflow: hidden;
  width: 320px;

  &.focused {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const Autocomplete = React.forwardRef(function Autocomplete(props, ref) {
    const {
        disableClearable = false,
        disabled = false,
        readOnly = false,
        ...other
    } = props;

    const {
        getRootProps,
        getInputProps,
        getPopupIndicatorProps,
        getClearProps,
        getListboxProps,
        getOptionProps,
        dirty,
        id,
        popupOpen,
        focused,
        anchorEl,
        setAnchorEl,
        groupedOptions,
    } = useAutocomplete({
        ...props,
        componentName: 'BaseAutocompleteIntroduction',
    });

    const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;

    const rootRef = useForkRef(ref, setAnchorEl);
    return (
        <React.Fragment>
            <StyledAutocompleteRoot
                {...getRootProps(other)}
                ref={rootRef}
                className={focused ? 'focused' : undefined}
            >
                <StyledInput
                    id={id}
                    ref={setAnchorEl}
                    disabled={disabled}
                    readOnly={readOnly}
                    {...getInputProps()}
                />
                {hasClearIcon && (
                    <StyledClearIndicator {...getClearProps()}>
                    </StyledClearIndicator>
                )}

                <StyledPopupIndicator
                    {...getPopupIndicatorProps()}
                    className={popupOpen ? 'popupOpen' : undefined}
                >
                </StyledPopupIndicator>
            </StyledAutocompleteRoot>
            {anchorEl ? (
                <Popper
                    open={popupOpen}
                    anchorEl={anchorEl}
                    slots={{
                        root: StyledPopper,
                    }}
                    modifiers={[
                        { name: 'flip', enabled: false },
                        { name: 'preventOverflow', enabled: false },
                    ]}
                >
                    <StyledListbox {...getListboxProps()}>
                        {groupedOptions.map((option, index) => {
                            const optionProps = getOptionProps({ option, index });

                            return <StyledOption {...optionProps}>{option.label}</StyledOption>;
                        })}

                        {groupedOptions.length === 0 && (
                            <StyledNoOptions>No results</StyledNoOptions>
                        )}
                    </StyledListbox>
                </Popper>
            ) : null}
        </React.Fragment>
    );
});
Autocomplete.propTypes = {
    /**
     * If `true`, the input can't be cleared.
     * @default false
     */
    disableClearable: PropTypes.oneOf([false]),
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled: PropTypes.bool,
    /**
     * If `true`, the component becomes readonly. It is also supported for multiple tags where the tag cannot be deleted.
     * @default false
     */
    readOnly: PropTypes.bool,
};


export default function UserHome() {
    const [expanded, setExpanded] = React.useState(false);
    const [testCenters, setTestCenters] = useState([]);
    const [tests, setTests] = useState([])
    const [open, setOpen] = React.useState("");


    const handleBooking = async (to, testName) => {
        const from = localStorage.getItem('userId')
        const status = "Pending"
        await axios.post('https://mediscan-3qze.onrender.com/api/booking/create', {
            from: from,
            to: to,
            status: status,
            testName: testName
        }).then((response) => {
            if (response.status == 200) {
                alert('Requested successfully')
            }
            else alert('Retry')
        }).catch((err) => console.log(err))
    }
    // const handleOpen = async (id) => {
    //     console.log(id)
    //     setTests([])
    //     await axios.post('https://mediscan-3qze.onrender.com/api/test/show', { centerId: id })
    //         .then((response) => {
    //             setTests(response.data.tests)
    //             console.log(tests)
    //         })
    //     setOpen(true);

    // }
    // const handleClose = () => setOpen(false);

    useEffect(() => {
        axios.get('https://mediscan-3qze.onrender.com/api/test/show-all').then((response) => {
            setTestCenters(response.data.tests)
        }).catch((err) => console.log(err))
    }, [testCenters])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const value = 3.5;

    const blue = {
        500: '#007FFF',
        600: '#0072E5',
        700: '#0059B2',
    };

    const grey = {
        100: '#eaeef2',
        300: '#afb8c1',
        900: '#24292f',
    };

    const CustomButton = styled(Button)(
        ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    background-color: ${blue[500]};
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: none;
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};
  
    &:hover {
      background-color: ${blue[600]};
    }
  
    &.${buttonClasses.active} {
      background-color: ${blue[700]};
    }
  
    &.${buttonClasses.focusVisible} {
      box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
      outline: none;
    }
  
    &.${buttonClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
    `,
    );


    const randomNames = [
        "Vinay Labs",
        "Harsha Labs + Diagnostics"
    ]



    return (
        <>
            <Navbar />
            {/* <div classname="searchboxes">
                <Stack style={{ textAlign: "center" }} spacing={2} direction="row">
                    <Autocomplete options={topCentres} sx={{ width: 5 / 11 }} />
                    <Autocomplete options={prices} sx={{ width: 5 / 11 }} />
                    <CustomButton sx={{ width: 1 / 11 }}>GO</CustomButton>
                </Stack>
            </div> */}
            <div className="card-container">


                {/* Content for Card 2 */}
                {testCenters &&
                    testCenters.map((testCenter, index) => {
                        return (
                            <div className="card">
                                <div className="full-size-image-container">
                                    <img
                                        src="your-image-url.jpg"
                                        alt={testCenter.name}
                                        className="full-size-image"
                                    />
                                </div>
                                <h2>{testCenter.name} @ Vinay Labs</h2>
                                <l>
                                    <b>Price</b>
                                </l>
                                <ol>INR {testCenter.price} </ol>
                                <l>
                                    <b>Description</b>
                                </l>
                                <ol>{testCenter.description}</ol>
                                <br />
                                <Button onClick={() => handleBooking(testCenter.centerId, testCenter.name)}>BOOK SLOT</Button>
                            </div>
                        )
                    })
                }


            </div>
        </>
    );
}