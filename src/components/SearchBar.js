import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleSearchBar = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            {expanded && <input type="text" placeholder="Search" style={{border: "1px solid #ccc", borderRadius: "5px", padding: "8px", width: "300px"}}/>}
            <Button variant="dark" onClick={toggleSearchBar}>
                <FontAwesomeIcon icon={expanded ? faXmark : faSearch} />
            </Button>
        </div>
    );
};

export default SearchBar;
