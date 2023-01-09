import { Avatar, Box, ButtonBase, InputAdornment, OutlinedInput, Popper } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons';
import PopupState, { bindToggle } from 'material-ui-popup-state';
import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
// third-party
// project imports
// assets
// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
    zIndex: 1100,
    width: '99%',
    top: '-55px !important',
    padding: '0 12px',
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px'
    }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.light
    }
}));

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, setValue, popupState }) => {
    const theme = useTheme();

    return (
        <OutlineInputStyle
            id="input-search-header"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            startAdornment={
                <InputAdornment position="start">
                    <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment position="end">
                    <ButtonBase sx={{ borderRadius: '12px' }}>
                        <HeaderAvatarStyle variant="rounded">
                            <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                        </HeaderAvatarStyle>
                    </ButtonBase>
                    <Box sx={{ ml: 2 }}>
                        <ButtonBase sx={{ borderRadius: '12px' }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    background: theme.palette.orange.light,
                                    color: theme.palette.orange.dark,
                                    '&:hover': {
                                        background: theme.palette.orange.dark,
                                        color: theme.palette.orange.light
                                    }
                                }}
                                {...bindToggle(popupState)}
                            >
                                <IconX stroke={1.5} size="1.3rem" />
                            </Avatar>
                        </ButtonBase>
                    </Box>
                </InputAdornment>
            }
            aria-describedby="search-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
        />
    );
};

MobileSearch.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func,
    popupState: PopupState
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
    const theme = useTheme();
    const [value, setValue] = useState('');

    return (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <>
                            <Box sx={{ ml: 2 }}>
                                <ButtonBase sx={{ borderRadius: '12px' }}>
                                    <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                                        <IconSearch stroke={1.5} size="1.2rem" />
                                    </HeaderAvatarStyle>
                                </ButtonBase>
                            </Box>
                        </>
                    )}
                </PopupState>
            </Box>
        </>
    );
};

export default SearchSection;
