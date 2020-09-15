import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';

export const Search = ({ onSearch, handleClick }) => (
  <div
    className="radio-item"
    style={{ display: 'flex', justifyContent: 'space-between' }}
  >
    <div>
      <span>搜索：</span>
      <Input.Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 300, marginLeft: 14 }}
      />
    </div>
    {handleClick && <Button onClick={handleClick}>添 加</Button>}
  </div>
);

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  handleClick: PropTypes.func
};

Search.defaultProps = {
  handleClick: null
};
