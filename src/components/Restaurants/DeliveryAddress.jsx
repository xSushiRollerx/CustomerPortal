import React from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    tags: {
        marginTop: 8,
        marginBottom: 8,
    },
    paper: {
        position: 'absolute',
        width: 400,
        top: '33%',
        left: '33%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 15
    },
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
    submit: {
        marginTop: 20
    },
    header: {
        marginBottom: 20
    }
}));

function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = { current: null };

export default function DeliveryAddress(props) {
    const classes = useStyles();
    const style = useStyles();
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const loaded = React.useRef(false);

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyDQSjoD26HTbr9hHxKD13HsBb8BE4yAQD8&libraries=places',
                document.querySelector('head'),
                'google-maps',
            );
        }

        loaded.current = true;
    }

    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    const close = () => {
        props.close(false);
    }

    const addressChange = () => {
        close();
        props.addressChange();
    }
    

    return (
        <Modal open={props.open} onClose={close} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            <Card variant="outlined">
                <CardContent className={style.paper}>
                    <Grid container justify="center" alignItems="center" direction="column" spacing={0}>
                        <h6 className={style.header}>Enter New Drop Off Location</h6>
                    <Autocomplete
                            id="dropOffSelect"
                            data-testid="googleLocation"
                        style={{ width: 300 }}
                        getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
                        filterOptions={(x) => x}
                        options={options}
                        autoComplete
                        includeInputInList
                            filterSelectedOptions
                            variant="filled"
                        value={value}
                        onChange={(event, newValue) => {
                            setOptions(newValue ? [newValue, ...options] : options);
                            setValue(newValue);
                        }}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Add a location" variant="outlined" fullWidth />
                        )}
                        renderOption={(option) => {
                            const matches = option.structured_formatting.main_text_matched_substrings;
                            const parts = parse(
                                option.structured_formatting.main_text,
                                matches.map((match) => [match.offset, match.offset + match.length]),
                            );

                            return (
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <LocationOnIcon className={classes.icon} />
                                    </Grid>
                                    <Grid item xs>
                                        {parts.map((part, index) => (
                                            <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                                {part.text}
                                            </span>
                                        ))}

                                        <Typography variant="body2" color="textSecondary">
                                            {option.structured_formatting.secondary_text}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            );
                        }}
                        />
                        <Button data-testid="DropOffFormSubmit" className={style.submit} variant="outlined" onClick= { addressChange }>Update Address</Button>
                    </Grid>
                </CardContent>
            </Card>
        </Modal>
    );
}