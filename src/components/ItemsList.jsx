import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const boxStyle = {
  width: '100%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  margin: '50px auto',
  border: '1px solid #999',
  borderRadius: 3,
};

const listStyle = {
  padding: '10px',
};

const listItemStyle = {
  border: '1px solid #999',
  borderRadius: 3,
  marginBottom: 1,
  backgroundColor: 'floralwhite',
};

function ItemsList({ listItems }) {
  return (
    <Box sx={boxStyle}>
      <List sx={listStyle}>
        {
          listItems.map(lItem => <ListItem sx={listItemStyle} key={lItem.index}><ListItemText primary={lItem.value || lItem.index} /></ListItem>)
        }
      </List>
    </Box>
  );
}

ItemsList.propTypes = {
  listItems: PropTypes.array.isRequired,
};

export default ItemsList;
